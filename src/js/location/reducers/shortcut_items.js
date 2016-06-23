import {
  SHORTCUTS_RENDER,
  SHORTCUTS_CLEAR,
} from '../constants/ActionTypes';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case SHORTCUTS_RENDER:
            return action.shortcuts;

        case SHORTCUTS_CLEAR:
            return [];

        default:
            return state;
    }
}

