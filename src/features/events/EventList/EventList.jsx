import React, { Component } from 'react'
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const {events, deleteEvent } = this.props;
    return <div>
      {events.map(event => <EventListItem event={event} key={event.id} 
      deleteEvent={deleteEvent}
      />)}  
      </div>;
  }
}


export default EventList;
