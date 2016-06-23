import {
  METHOD_PAYMENTS_LOAD,
  METHOD_PAYMENT_SELECTED,
} from '../constants/ActionTypes';

const initialState = {methods: [], active: ''};

export default (state = initialState, action) => {
    switch (action.type) {
        case METHOD_PAYMENTS_LOAD:
            return {
                     ...state,
                     methods: action.methods
                   };

        case METHOD_PAYMENT_SELECTED:
            return {
                     ...state,
                     active: action.label
                   };

        default:
            return state;
    }
}

