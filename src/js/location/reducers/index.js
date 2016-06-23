import { combineReducers } from 'redux';

import location_name from './location_name';
import shortcut_items from './shortcut_items';
import hud from './hud';

export default combineReducers({
  location_name,
  shortcut_items,
  hud,
});

