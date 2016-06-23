import {
  CATEGORIES_LOAD,
  CATEGORY_SELECTED,
} from '../constants/ActionTypes';

const initialState = {
                       cats: [],
                       cat_desc: '',
                       cat_number: -1
                     };

export default (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_LOAD:
            return {
                     ...state,
                     cats: action.categories,
                   };

        case CATEGORY_SELECTED:
            return {
                     ...state,
                     cat_desc: action.label,
                     cat_number: action.id,
                   };

        default:
            return state;
    }
}

