import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import testReducer from "../../features/testarea/testReducer";
import modalReducer from "../../features/modals/modalReducer";
import { eventReducer } from "../../features/events/eventReducer";
import { authReducer } from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  test: testReducer,
  toastr: toastrReducer,
  async: asyncReducer
});

export default rootReducer;
