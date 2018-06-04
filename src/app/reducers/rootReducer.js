import { combineReducers } from 'redux';
import { reducer as FormReducer} from 'redux-form';
import testReducer from '../../features/testarea/testReducer';
import { eventReducer } from '../../features/events/eventReducer';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  test: testReducer
})

export default rootReducer;