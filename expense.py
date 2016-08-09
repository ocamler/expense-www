import os
import time
from flask import Flask, request, abort, render_template
from flask_restful import Resource, Api, reqparse
from config import Config
from db import Connection, Circle, Point

conf = Config()
app = Flask(__name__)
app.config.from_object('config.Config')
api = Api(app)
cn = Connection(conf.DB_CONNECT)

@app.route('/', methods=['GET'])
def index():
    ### check the key value first and deny if incorrect value supplied
    key = request.args.get('key', '')
    if conf.ACCESS_KEY and key != conf.ACCESS_KEY:
        return abort(404)
    ##return app.send_static_file('location.html')
    return render_template('location.html',
                           key=conf.APIKEY)

@app.route('/details', methods=['GET'])
def details():
    ### check the key value first and deny if incorrect value supplied
    key = request.args.get('key', '')
    if conf.ACCESS_KEY and key != conf.ACCESS_KEY:
        return abort(404)
    return render_template('details.html')

@app.route('/date', methods=['GET'])
def date():
    ### check the key value first and deny if incorrect value supplied
    key = request.args.get('key', '')
    if conf.ACCESS_KEY and key != conf.ACCESS_KEY:
        return abort(404)
    return render_template('date.html')

@app.route('/completed', methods=['GET'])
def completed():
    ### check the key value first and deny if incorrect value supplied
    key = request.args.get('key', '')
    if conf.ACCESS_KEY and key != conf.ACCESS_KEY:
        return abort(404)
    return render_template('completed.html')

class CategoryList(Resource):
    def get(self):
        return cn.hash_query("select * from category order by cat_desc;")

class MethodPaymentList(Resource):
    def get(self):
        return cn.hash_query("select * from method_payment order by sort_order;")

class Today(Resource):
    def get(self):
        return [int(i) for i in time.strftime('%Y-%m-%d').split('-')]

ll_parser = reqparse.RequestParser()
ll_parser.add_argument('lat', type=float)
ll_parser.add_argument('lng', type=float)

class GeoLocate(Resource):
    def get(self):
        # return unique list of exp_desc within radius of the lat/lng
        #   values passed in, closest first
        args = ll_parser.parse_args(strict=True)
        circle = Circle(float(args['lat']), float(args['lng']), float(conf.RADIUS))
        coords = Point(float(args['lat']), float(args['lng']))
        # TODO: why doesn't 'select DISTINCT' work?
        results = cn.query("""
select exp_desc,
       lat_long[0] as lat,
       lat_long[1] as lng,
       point %s <-> lat_long
from expense
where circle %s @> lat_long
UNION
select location,
       lat_long[0] as lat,
       lat_long[1] as lng,
       point %s <-> lat_long
from geotagged
where circle %s @> lat_long
order by 4;""", [coords, circle, coords, circle])
        tmp = {}
        final = []
        index = 65 # letter 'A' in ASCII
        for (desc, lat, lng, _) in results:
            if desc in tmp:
                continue
            final.append({'id': index,
                          'label': desc,
                          'letter': chr(index),
                          'lat': lat,
                          'lng': lng})
            tmp[desc] = 1
            index += 1
            if index >= 65 + 12:
                break # don't show more than a dozen options
        return final

tag_parser = reqparse.RequestParser()
tag_parser.add_argument('lat', type=float)
tag_parser.add_argument('lng', type=float)
tag_parser.add_argument('location', type=str)

class GeoTag(Resource):
    def get(self):
        # when supplied a lat/lng and location, add to geotagged table
        args = tag_parser.parse_args(strict=True)
        coords = Point(float(args['lat']), float(args['lng']))
        oid = cn.execute("""
insert into geotagged
(location, lat_long)
values
(%s, %s);""", [args['location'], coords])
        return oid

loc_parser = reqparse.RequestParser()
loc_parser.add_argument('location', type=str)

class GetPresets(Resource):
    def get(self):
        # look up payment type and category for the location passed in
        args = loc_parser.parse_args(strict=True)
        loc = request.args.get('location', '')
        return cn.hash_query("""
select e.exp_method_payment AS method_payment,
       max(c.cat_desc) AS cat_desc,
       max(c.cat_number) AS cat_number,
       CASE WHEN e.taxd_amount > 0 THEN 1 ELSE 0 END AS isTaxd
from (expense e inner join exp_detail d
  on e.exp_number = d.exp_number) inner join category c
  on d.cat_number = c.cat_number
where e.exp_desc = %s
group by e.exp_method_payment,
         e.exp_date,
         CASE WHEN e.taxd_amount > 0 THEN 1 ELSE 0 END
order by e.exp_date desc
limit 1;""", [loc])

class ExpenseIn(Resource):
    def post(self):
        d = request.get_json(cache=False)
        # make sure key is valid before proceeding
        if conf.ACCESS_KEY and d[u'key'] != conf.ACCESS_KEY:
            abort(404)
        # determine taxable/non-taxable totals
        exp = {'exp_amount': 0.00, 'taxd_amount': 0.00}
        # figure out lat/long coordinate, if supplied
        coords = None
        if d[u'location_info'][u'lat'] and d[u'location_info'][u'lng']:
            coords = Point(float(d[u'location_info'][u'lat']),
                           float(d[u'location_info'][u'lng']))
        for det in d[u'details'][u'amounts']:
            exp['exp_amount'] += float(det['amount'])
            if det['isTaxd']:
                exp['taxd_amount'] += float(det['amount'])
        oid = cn.execute("""
insert into expense
(exp_date,
 exp_desc,
 exp_method_payment,
 exp_confirmed,
 exp_amount,
 taxd_amount,
 lat_long)
values
(%s, %s, %s, 0, %s, %s, %s);""", \
[d[u'date_info'][u'date'],
 d[u'location_info'][u'location'],
 d[u'details'][u'method_payment'],
 exp['exp_amount'],
 exp['taxd_amount'],
 coords])
        # get the exp_number generated from the insert
        exp_number = cn.query("""
select exp_number
from expense
where oid = %s;""", [oid])[0][0]
        exp['exp_number'] = exp_number
        for det in d[u'details'][u'amounts']:
            cn.execute("""
insert into exp_detail
(exp_number,
 cat_number,
 exp_portion,
 istaxd)
values
(%s, %s, %s, %s);""", \
[exp_number,
 det[u'cat_number'],
 det[u'amount'],
 det[u'isTaxd'] and 1 or 0])
        return exp_number

class RecentEntries(Resource):
    def get(self):
        # look up last 5 entries
        return cn.hash_query("""
select e.exp_number,
       e.exp_desc,
       TRIM(TO_CHAR(e.exp_amount, 'MI999,999,999D99')) AS exp_amount,
       TO_CHAR(e.exp_date, 'MM/DD/YYYY') AS exp_date,
       e.exp_method_payment AS method_payment,
       MAX(c.cat_desc) AS category,
       CASE WHEN e.taxd_amount > 0 THEN 1 ELSE 0 END AS istaxd
from (expense e inner join exp_detail d
  on e.exp_number = d.exp_number) inner join category c
  on d.cat_number = c.cat_number
group by e.exp_number,
         e.exp_desc,
         e.exp_amount,
         e.exp_date,
         e.exp_method_payment,
         CASE WHEN e.taxd_amount > 0 THEN 1 ELSE 0 END
order by e.exp_number desc
limit 5;""")

api.add_resource(CategoryList,      '/data/categories')
api.add_resource(MethodPaymentList, '/data/method_payments')
api.add_resource(Today,             '/data/today')
api.add_resource(GeoLocate,         '/data/geolocate')
api.add_resource(GeoTag,            '/data/geotag')
api.add_resource(GetPresets,        '/data/getpresets')
api.add_resource(ExpenseIn,         '/data/expense_in')
api.add_resource(RecentEntries,     '/data/recents')

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=os.getenv('PORT', 8080),
        debug=True
    )

# vim:expandtab ts=4 sw=4
