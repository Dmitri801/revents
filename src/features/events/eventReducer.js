import {
  DELETE_EVENT,
  UPDATE_EVENT,
  CREATE_EVENT,
  FETCH_EVENTS
} from "./eventConstants";

const initialState = [];

export const eventReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case CREATE_EVENT:
      return [...newState, Object.assign({}, action.payload.event)];
    case UPDATE_EVENT:
      return [
        ...newState.filter(event => event.id !== action.payload.event.id),
        Object.assign({}, action.payload.event)
      ];
    case DELETE_EVENT:
      return [...newState.filter(event => event.id !== action.payload.eventId)];
    case FETCH_EVENTS:
      return action.payload.events;
    default:
      return state;
  }
};
