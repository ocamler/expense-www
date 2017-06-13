import $ from 'jquery';
import {
  RECENT_ENTRIES_LOAD,
  SHOW_MORE_ENTRIES,
} from '../constants/ActionTypes';

/**
 * When the recent entries are initially loaded
 *
 */
export function recent_entries_load() {
  return function(dispatch, getState) {
    const state = getState();
    const show_count = state.show_count;
    // make Ajax call to get recent entries list
    $.getJSON('./data/recents',
              {
                show_count,
              },
              (json) => {
                          dispatch({
                            type: RECENT_ENTRIES_LOAD,
                            entries: json
                          });
                        });
  }
}

/**
 * When the user requests to show more recent items
 *
 */
export function show_more_entries() {
  return function(dispatch) {
    dispatch({
      type: SHOW_MORE_ENTRIES
    });
    dispatch(recent_entries_load());
  }
}

