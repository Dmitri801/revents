import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/testarea/testReducer";
import modalReducer from "../../features/modals/modalReducer";
import { eventReducer } from "../../features/events/eventReducer";
import { authReducer } from "../../features/auth/authReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  test: testReducer
});

export default rootReducer;
