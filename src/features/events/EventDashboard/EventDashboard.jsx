import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList  from '../EventList/EventList';
import {  deleteEvent } from '../eventActions';

class EventDashboard extends Component {
    
// onCreateEventClick = () => {
//   // If your new state update depends on the previous state, always use the functional form of setState which accepts as argument a function that returns a new state.
//   this.setState(prevState => ({
//     isOpen: !prevState.isOpen 
//   }))
// }

  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId)
  }

  
  render() { 
    const {events} = this.props;
    return <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList 
            deleteEvent={this.handleDeleteEvent}
            events={events}/>
          </Grid.Column>
          <Grid.Column width={6}>
            
          </Grid.Column>
        </Grid>
      </div>;
  }
}

const mapStateToProps = (state) => ({
  events: state.events
})

export default connect(mapStateToProps, { deleteEvent })(EventDashboard);
