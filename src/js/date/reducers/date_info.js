import {
  DATE_CHANGED,
} from '../constants/ActionTypes';

const initialState = {date: '', format: ''};

export default (state = initialState, action) => {
    switch (action.type) {
        case DATE_CHANGED:
            return {
                     ...state,
                     date: action.date
                   };

        default:
            return state;
    }
}

