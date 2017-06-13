import {
  SHOW_MORE_ENTRIES,
} from '../constants/ActionTypes';

const initialState = 5;

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MORE_ENTRIES:
            return state + 5;

        default:
            return state;
    }
}
