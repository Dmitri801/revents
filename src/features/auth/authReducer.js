import { LOGIN_USER, SIGNOUT_USER } from "./authConstants";

const initialState = {
  currentUser: {}
};

export const authReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...newState,
        authenticated: true,
        currentUser: action.payload.creds.email
      };
    case SIGNOUT_USER:
      return {
        ...newState,
        authenticated: false,
        currentUser: {}
      };
    default:
      return state;
  }
};
