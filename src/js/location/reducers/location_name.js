import {
  INPUT_CHANGED,
  INPUT_RESET,
  INPUT_SELECTED,
} from '../constants/ActionTypes';

const initialState = '';

export default (state = initialState, action) => {
    switch (action.type) {
        case INPUT_CHANGED:
        case INPUT_SELECTED:
            return action.text;

        case INPUT_RESET:
            return initialState;

        default:
            return state;
    }
}

