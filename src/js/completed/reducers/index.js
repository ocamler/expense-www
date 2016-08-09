import { combineReducers } from 'redux';

import args from './args';
import recent_entries from './recent_entries';

export default combineReducers({
  args,
  recent_entries,
});


