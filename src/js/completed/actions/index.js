import $ from 'jquery';
import {
  RECENT_ENTRIES_LOAD,
} from '../constants/ActionTypes';

/**
 * When the recent entries are initially loaded
 *
 */
export function recent_entries_load() {
  return function(dispatch) {
    // make Ajax call to get recent entries list
    $.getJSON('./data/recents',
              (json) => {
                          dispatch({
                            type: RECENT_ENTRIES_LOAD,
                            entries: json
                          });
                        });
  }
}


