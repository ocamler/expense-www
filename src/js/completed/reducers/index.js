import { combineReducers } from 'redux';

import args from './args';
import recent_entries from './recent_entries';
import show_count from './show_count';

export default combineReducers({
  args,
  recent_entries,
  show_count,
});


