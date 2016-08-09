import {
  RECENT_ENTRIES_LOAD,
} from '../constants/ActionTypes';

const initialState = { recent_entries: [] };

export default (state = initialState, action) => {
    switch (action.type) {
        case RECENT_ENTRIES_LOAD:
            return {
                     ...state,
                     recent_entries: action.entries,
                   };

        default:
            return state;
    }
}

