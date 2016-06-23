import $ from 'jquery';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './components/app';
import reducers from './reducers';
import createStore from './store';
import { categories_load,
         method_payments_load,
         presets_load } from './actions';

const initialState = JSON.parse(localStorage.exp_www_location);
const store = createStore(reducers,
                          {location_info: initialState});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);

$(function () {
    const loc = store.getState().location_info['location'];

    // kick off retrieval of lists and default values
    store.dispatch(categories_load());
    store.dispatch(method_payments_load());
    store.dispatch(presets_load(loc));
    $("#amount").focus();
});
