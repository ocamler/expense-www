import {
  AMOUNT_CHANGED,
  TAXD_SELECTED,
  AMOUNT_ITEM_REMOVE,
  AMOUNT_ITEM_ADD,
} from '../constants/ActionTypes';

let partialAmountIndex = 0; // id generator

const initialState = {
                       currentAmount: '',
                       isTaxd: false,
                       partialAmounts: [],
                       multipleAmounts: false,
                     };

export default (state = initialState, action) => {
    switch (action.type) {
        case AMOUNT_CHANGED:
            return {
                     ...state,
                     currentAmount: action.amount
                   };

        case TAXD_SELECTED:
            return {
                     ...state,
                     isTaxd: action.taxd
                   };

        case AMOUNT_ITEM_REMOVE:
            const newArray = state.partialAmounts.filter(
                               i => i.id !== action.id
                             );
            return {
                     ...state,
                     partialAmounts: newArray,
                     multipleAmounts: newArray.length !== 0
                   };

        case AMOUNT_ITEM_ADD:
            return {
                     currentAmount: '',
                     isTaxd: false,
                     partialAmounts: [
                       ...state.partialAmounts,
                       {
                         id: partialAmountIndex++,
                         amount: action.amount,
                         cat_desc: action.cat_desc,
                         cat_number: action.cat_number,
                         isTaxd: action.isTaxd,
                       }
                     ],
                     multipleAmounts: action.multiple_amounts_flag
                   };

        default:
            return state;
    }
}

