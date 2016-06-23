import $ from 'jquery';
import moment from 'moment';
import {
  DATE_CHANGED,
} from '../constants/ActionTypes';

/**
 * When the date is changed, in YYYY-MM-DD format
 *
 * @param {string} date
 */
export function date_changed(date) {
  return {
    type: DATE_CHANGED,
    date,
  }
}

/**
 * When the form is submitted
 *
 */
export function submit_form() {
  return function(dispatch, getState) {
    // now serialize current state and navigate to next screen
    const state = getState();
    const key = state.key;
    const json = JSON.stringify(state);
    $.ajax({
             type: "POST",
             url: "./data/expense_in",
             data: json,
             success: (exp_number) => {
               // cache the last date used for an hour
               const { date, format } = state.date_info;
               const json = JSON.stringify({
                                             expires: moment().add(1, 'hours'),
                                             savedDate: moment(date,
                                                               format,
                                                               true),
                                           });
               localStorage.exp_www_date = json;
               window.location.href = './completed?' +
                                      $.param({
                                                 key,
                                                 exp_number
                                              });
             },
             contentType: 'application/json',
           });
  }
}

