import { combineReducers } from 'redux';

import location_info from './location_info';
import method_payments from './method_payments';
import categories from './categories';
import amounts from './amounts';

export default combineReducers({
  location_info,
  method_payments,
  categories,
  amounts,
});

