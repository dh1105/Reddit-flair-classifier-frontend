import { combineReducers } from 'redux';

import { classify } from './classify.reducer';
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
  classify,
  alert
});

export default rootReducer;