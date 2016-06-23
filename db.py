import psycopg2
from psycopg2.extensions import adapt, register_adapter, AsIs

class Circle(object):
    def __init__(self, x, y, radius):
        self.x = x
        self.y = y
        self.radius = radius

class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

def adapt_circle(circle):
    x = adapt(circle.x).getquoted()
    y = adapt(circle.y).getquoted()
    radius = adapt(circle.radius).getquoted()
    return AsIs("'((%s, %s), %s)'" % (x, y, radius))

def adapt_point(point):
    x = adapt(point.x).getquoted()
    y = adapt(point.y).getquoted()
    return AsIs("'(%s, %s)'" % (x, y))

register_adapter(Circle, adapt_circle)
register_adapter(Point, adapt_point)

class Connection:
    def __init__(self, dbname, host, username):
        self.connect_args = {
            'db2use': dbname,
            'host': host,
            'username': username
        }
        self.connect()

    def connect(self):
        # don't use this directly; called automatically upon creation
        self.conn = psycopg2.connect(
            "host='%(host)s' user='%(username)s' dbname='%(db2use)s'" % \
            self.connect_args
        )
        self.conn.set_isolation_level(0) # autocommit (no transactions)

    def query(self, sql, params=[]):
        return self.full_query(sql, params)[1] # just the data

    def hash_query(self, sql, params=[]):
        fields, results = self.full_query(sql, params)
        return [dict(zip(fields, i)) for i in results]

    def full_query(self, sql, params=[]):
        c = self.conn.cursor()
        c.execute(sql, params)
        results = c.fetchall()
        fields = [i[0] for i in c.description]
        c.close()
        del c
        return fields, results

    def count(self, sql, params=[]):
        return int(self.query(sql, params)[0][0])

    def execute(self, sql, params=[]):
        c = self.conn.cursor()
        c.execute(sql, params)
        oid = c.lastrowid
        self.conn.commit()
        c.close()
        del c
        return oid

    def close(self):
        # don't use this directly; used by the Queue object
        self.conn.close()

# vim:expandtab ts=4 sw=4
