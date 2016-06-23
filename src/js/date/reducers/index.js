import { combineReducers } from 'redux';

import key from './key';
import location_info from './location_info';
import details from './details';
import date_info from './date_info';

export default combineReducers({
  key,
  location_info,
  details,
  date_info,
});


