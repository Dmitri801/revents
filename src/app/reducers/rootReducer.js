import { combineReducers } from 'redux';
// import testReducer from '../../features/testarea/testReducer';
import { eventReducer } from '../../features/events/eventReducer';

const rootReducer = combineReducers({
  events: eventReducer
})

export default rootReducer;