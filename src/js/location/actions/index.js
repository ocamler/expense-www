import $ from 'jquery';
import {
  INPUT_CHANGED,
  INPUT_RESET,
  INPUT_SELECTED,
  SHORTCUTS_RENDER,
  SHORTCUTS_CLEAR,
  HUD_UPDATE,
  HUD_ERROR,
} from '../constants/ActionTypes';

/**
 * When the user types in the field
 *
 * @param {string} text
 */
export function input_changed(text) {
  return {
    type: INPUT_CHANGED,
    text,
  }
}

/**
 * When the user clicks the clear icon
 */
export function input_reset() {
  return {
    type: INPUT_RESET
  };
}

/**
 * When the user chooses an option button
 *
 * @param {string} text
 */
export function input_selected(text) {
  return {
    type: INPUT_SELECTED,
    text,
  };
}

/**
 * Kick off retrieval of shortcuts based on current GPS coordinates
 *
 * @param {Object} coords
 */
export function shortcuts_retrieve(coords) {
  return function(dispatch) {
    // make Ajax call to get new shortcut items based on GPS coordinates
    $.getJSON('./data/geolocate',
              coords,
              (json) => {
                          dispatch({
                            type: SHORTCUTS_RENDER,
                            shortcuts: json
                          });
                        });
  }
}

/**
 * In case of Google Maps error, this will clear any visible shortcuts
 */
export function shortcuts_clear() {
  return {
    type: SHORTCUTS_CLEAR
  };
}

/**
 * The HUD needs updating
 *
 * @param {Object} info
 */
export function hud_update(info) {
  return {
    type: HUD_UPDATE,
    hud: info,
  };
}

/**
 * The HUD needs to show an error
 *
 * @param {string} errorMessage
 */
export function hud_error(errorMessage) {
  return {
    type: HUD_ERROR,
    errorMessage,
  };
}

