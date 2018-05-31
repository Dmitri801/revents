import { DELETE_EVENT, UPDATE_EVENT, CREATE_EVENT } from './eventConstants';

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  }
}

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  }
}

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  }
}