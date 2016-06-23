import $ from 'jquery';
import URI from 'urijs';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './components/app';
import reducers from './reducers';
import createStore from './store';
import { input_reset, shortcuts_retrieve } from './actions';
import { initialize as mapinit, lastCoords } from './maps';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
);

mapinit(store);

$("#geotag").click((e) => {
    const val = $.trim(store.getState().location_name);
    if (val && lastCoords) {
        store.dispatch(input_reset()); // clear input
        $.getJSON('./data/geotag',
                  {
                    location: val,
                    lat: lastCoords.lat,
                    lng: lastCoords.lng,
                   },
                  () => {
                          store.dispatch(
                            shortcuts_retrieve(lastCoords)
                          );
                        }
                 );
    }
});

$("#next").click((e) => {
    const key = URI(document.URL).query(true).key;
    const val = $.trim(store.getState().location_name);
    const noGPS = $("#noGPS").prop("checked");
    if (val && (lastCoords || noGPS)) {
        const json = JSON.stringify({
          location: val,
          lat: noGPS ? '' : lastCoords.lat,
          lng: noGPS ? '' : lastCoords.lng,
        });
        localStorage.exp_www_location = json;
        window.location.href = './details?' + $.param({key});
    }
});

