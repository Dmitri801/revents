import React, { Component } from "react";
import { connect } from 'react-redux';
import cuid from 'cuid';
import { Segment, Form, Button } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";



class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event) 
   }

   componentDidMount() {
     if(this.props.selectedEvent !== null) {
       
     }
   } 

   componentWillReceiveProps(nextProps) {
    if(nextProps.selectedEvent !== this.props.selectedEvent) {
      
    }
   }

   onInputChange = (e) => {
     const newEvent = this.state.event;
     newEvent[e.target.name] = e.target.value
    this.setState({ event: newEvent })
   }

   onFormSubmit = (e) => {
    e.preventDefault()
    if(this.state.event.id) {
      this.props.updateEvent(this.state.event)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
   }


  render() {
    const {event} = this.state;
    return (
      <div>
        <Segment>
          <Form onSubmit={this.onFormSubmit}>
            <Form.Field>
              <label>Event Title</label>
              <input value={event.title} 
              name="title"
              onChange={this.onInputChange}
              placeholder="First Title" />
            </Form.Field>
            <Form.Field>
              <label>Event Date</label>
              <input 
              value={event.date}
              type="date" 
              name="date" 
              onChange={this.onInputChange}
              placeholder="Event Date" />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input 
              value={event.city}
              name="city"
              onChange={this.onInputChange}
              placeholder="City event is taking place" />
            </Form.Field>
            <Form.Field>
              <label>Venue</label>
              <input 
                value={event.venue}
                name="venue"
                onChange={this.onInputChange}
              placeholder="Enter the Venue of the event" />
            </Form.Field>
            <Form.Field>
              <label>Hosted By</label>
              <input 
                value={event.hostedBy}
                name="hostedBy"
                onChange={this.onInputChange}
              placeholder="Enter the name of person hosting" />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }
  if(ownProps.match) {
    const eventId = ownProps.match.params.id;
    if (eventId && state.events.length > 0) {
      event = state.events.filter(event => event.id === eventId)[0]
    }
  }
  return {
    event
  }
}

export default connect(mapStateToProps, { createEvent, updateEvent })(EventForm);
