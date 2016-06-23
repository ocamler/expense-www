import $ from 'jquery';
import URI from 'urijs';
import {
  CATEGORIES_LOAD,
  CATEGORY_SELECTED,
  METHOD_PAYMENTS_LOAD,
  METHOD_PAYMENT_SELECTED,
  AMOUNT_CHANGED,
  TAXD_SELECTED,
  AMOUNT_ITEM_REMOVE,
  AMOUNT_ITEM_ADD,
} from '../constants/ActionTypes';

/**
 * When the categories are initially loaded
 *
 */
export function categories_load() {
  return function(dispatch) {
    // make Ajax call to get list of categories
    $.getJSON('./data/categories',
              (json) => {
                          dispatch({
                            type: CATEGORIES_LOAD,
                            categories: json
                          });
                        });
  }
}

/**
 * When the category is selected
 *
 * @param {string} label
 * @param {number} id
 */
export function category_selected(label, id) {
  return {
    type: CATEGORY_SELECTED,
    label,
    id,
  }
}

/**
 * When the method payments are initially loaded
 *
 */
export function method_payments_load() {
  return function(dispatch) {
    // make Ajax call to get list of method payments
    $.getJSON('./data/method_payments',
              (json) => {
                          dispatch({
                            type: METHOD_PAYMENTS_LOAD,
                            methods: json
                          });
                        });
  }
}

/**
 * When the method payment is selected
 *
 * @param {string} label
 */
export function method_payment_selected(label) {
  return {
    type: METHOD_PAYMENT_SELECTED,
    label,
  }
}

/**
 * When the amount is changed
 *
 * @param {string} amount
 */
export function amount_changed(amount) {
  return {
    type: AMOUNT_CHANGED,
    amount,
  }
}

/**
 * When the taxd flag is set
 *
 * @param {boolean} taxd
 */
export function taxd_selected(taxd) {
  return {
    type: TAXD_SELECTED,
    taxd,
  }
}

/**
 * When the X for a partial amount item is clicked
 *
 * @param {number} id
 */
export function amount_item_remove(id) {
  return {
    type: AMOUNT_ITEM_REMOVE,
    id,
  }
}

/**
 * When a partial amount item is submitted
 *
 * @param {string} amount
 * @param {string} cat_desc
 * @param {number} cat_number
 * @param {boolean} isTaxd
 * @param {boolean} multiple_amounts_flag
 */
export function amount_item_add(amount,
                                cat_desc,
                                cat_number,
                                isTaxd,
                                multiple_amounts_flag) {
  return function(dispatch) {
    dispatch({
      type: AMOUNT_ITEM_ADD,
      amount,
      cat_desc,
      cat_number,
      isTaxd,
      multiple_amounts_flag,
    });
    // reset category
    dispatch({
      type: CATEGORY_SELECTED,
      label: '',
      id: -1,
    });
  }
}

/**
 * Package up state and advance to next screen
 *
 */
export function go_to_next_screen() {
  return function(dispatch, getState) {
    // serialize current state and navigate to next screen
    const state = getState();
    const { location_info, amounts, method_payments } = state;
    const json = JSON.stringify({
      location_info,
      amounts: amounts.partialAmounts,
      method_payment: method_payments.active,
    });
    localStorage.exp_www_details = json;
    const key = URI(document.URL).query(true).key;
    window.location.href = './date?' + $.param({key});
  }
}

/**
 * When the presets are initially loaded, based on querystring
 *
 * @param {string} loc
 */
export function presets_load(loc) {
  return function(dispatch) {
    // make Ajax call to get list of categories
    $.getJSON('./data/getpresets',
              {'location': loc},
              (json) => {
                          if (!json.length) { return; }
                          const record = json[0];
                          const taxd = !!record.istaxd;
                          dispatch({
                            type: TAXD_SELECTED,
                            taxd,
                          });
                          dispatch({
                            type: CATEGORY_SELECTED,
                            label: record.cat_desc,
                            id: record.cat_number,
                          });
                          dispatch({
                            type: METHOD_PAYMENT_SELECTED,
                            label: record.method_payment,
                          });
                        });
  }
}

