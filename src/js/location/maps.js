import $ from 'jquery';
import _ from 'lodash';
import {
  shortcuts_retrieve,
  shortcuts_clear,
  hud_update,
  hud_error,
} from './actions';

let precision = 4; // number of decimal places to observe for lat/long

const round = (value, decimal_places) => {
    return Number(Math.round(value+'e'+decimal_places)+'e-'+decimal_places);
}

const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

let map;
let youAreHereMarker;
let placeMarkers = [];
export let lastCoords;

function addMarker(info) {
    const { letter, label, lat, lng } = info;
    var marker = new google.maps.Marker({
        position: {lat, lng},
        map: map
    });
    if (typeof letter !== 'undefined') {
        marker.setLabel(letter);
    }
    if (typeof label !== 'undefined') {
        marker.setTitle(label);
    }
    if (letter || label) {
        placeMarkers.push(marker);
    } else {
        youAreHereMarker = marker;
    }
}

function centerMarker(info) {
    if (typeof youAreHereMarker === 'undefined') {
        addMarker(info);
    } else {
        const { lat, lng } = info;
        youAreHereMarker.setPosition({lat, lng});
    }
}

function updateMap(coords) {
    if (typeof map === 'undefined') {
        var mapOptions = {
            zoom: 15,
            center: coords,
            mapTypeControl: false,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.SMALL
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map($("#map")[0], mapOptions);

        centerMarker(coords);
        lastCoords = coords;
    } else {
        if (typeof lastCoords !== 'undefined' && coords != lastCoords) {
            map.setCenter(coords);
            centerMarker(coords);
            lastCoords = coords;
        } else {
            return; // no change in position, don't update anything else
        }
    }
}

function success(store) {
    return (position) => {
        const info = {
                       isError: false,
                       lat: round(position.coords.latitude, 4),
                       lng: round(position.coords.longitude, 4),
                       alt: round(position.coords.altitude, 4),
                       acc: round(position.coords.accuracy, 4),
                     };

        // update Google map
        const coords = {lat: info.lat, lng: info.lng};
        updateMap(coords);

        // kick off event to retrieve new set of shortcut_items
        store.dispatch(shortcuts_retrieve(coords));

        // update HUD
        store.dispatch(hud_update(info));
    }
}

function error(store) {
    return (error) => {
        store.dispatch(
          hud_error("Sorry, unable to retrieve your location due to " +
                      error.code + ": " + error.message)
        );
        store.dispatch(shortcuts_clear());
    }
}

let currentShortcuts;
function redrawPins(store) {
    return () => {
        let previousShortcuts = currentShortcuts;
        currentShortcuts = (store.getState()).shortcut_items;

        if (previousShortcuts !== currentShortcuts) {
            // merge/purge pins with what's already showing onscreen
            //   first, update or add...
            $.each(currentShortcuts, (index, s) => {
                let existing = $.grep(placeMarkers,
                                      (m) => {
                                          let pos = m.getPosition();
                                          return round(pos.lat(), 4) == round(s.lat, 4) &&
                                                 round(pos.lng(), 4) == round(s.lng, 4) &&
                                                 m.getTitle() == s.label;
                                      }
                               );
                $.each(existing,
                       (m) => {
                           if (m.getLabel() != s.letter) {
                               m.setLabel(s.letter);
                           }
                       }
                );
                if (existing.length == 0) {
                    addMarker(s);
                }
            });
            //   ...then purge any pins that are no longer in the shortcuts list
            $.each(placeMarkers, (index, m) => {
                let pos = m.getPosition();
                if (!_.some(currentShortcuts, (s) => {
                    return round(pos.lat(), 4) == round(s.lat, 4) &&
                           round(pos.lng(), 4) == round(s.lng, 4)
                })) {
                    m.setMap(null);
                }
            });
            placeMarkers = _.filter(placeMarkers,
                                    (m) => {
                                        return typeof m.getMap() !== 'undefined'
                                    }
                           );
        }
    }
}

export function initialize(store) {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        if(navigator.geolocation) {
            navigator.geolocation.watchPosition(
              success(store),
              error(store),
              geoOptions
            );
        } else {
            store.dispatch(
                hud_error("Geolocation services are not supported by " +
                            "your web browser.")
            );
        }
    } else {
        store.dispatch(
            hud_update("A Google Maps API key is not supplied in " +
                         "config.py on the server.")
        );
    }
    let unsubscribe = store.subscribe(redrawPins(store));
}

