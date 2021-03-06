import { LOGIN_USER, SIGNOUT_USER } from "./authConstants";
import { closeModal } from "../modals/modalActions";

export const login = creds => {
  return dispatch => {
    dispatch({ type: LOGIN_USER, payload: { creds } });
    dispatch(closeModal());
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT_USER
  };
};
