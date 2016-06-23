import $ from 'jquery';
import URI from 'urijs';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import moment from 'moment';

import App from './components/app';
import reducers from './reducers';
import createStore from './store';

// figure out which date to use as default
const format = "YYYY-MM-DD";
const now = moment();
const date_info = localStorage.exp_www_date
                  ? JSON.parse(localStorage.exp_www_date)
                  : undefined;
const date = (date_info &&
              moment(date_info.expires).diff(now) >= 0
                ? moment(date_info.savedDate)
                : now)
             .format(format);
// build up initial state with localStorage values
const state = JSON.parse(localStorage.exp_www_details);
const { location_info, amounts, method_payment } = state;
const key = URI(document.URL).query(true).key;

const store = createStore(
                reducers,
                {
                  key,
                  location_info,
                  details: {
                             amounts,
                             method_payment
                           },
                  date_info: {
                               date,
                               format
                             },
                }
              );

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);

