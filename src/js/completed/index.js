import $ from 'jquery';
import URI from 'urijs';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './components/app';
import reducers from './reducers';
import createStore from './store';

const args = URI(document.URL).query(true);

const store = createStore(reducers,
                          {
                            args,
                          });

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);

// clean up localStorage
localStorage.removeItem('exp_www_location');
localStorage.removeItem('exp_www_details');

