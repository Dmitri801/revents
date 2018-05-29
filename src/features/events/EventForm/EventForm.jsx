import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class EventForm extends Component {
  state = {
    event: {
      title: '',
      date: '',
      city: '',
      venue: '',
      hostedBy: ''
    }
   }

   onInputChange = (e) => {
     const newEvent = this.state.event;
     newEvent[e.target.name] = e.target.value
    this.setState({ event: newEvent })
   }

   onFormSubmit = (e) => {
    e.preventDefault()
    this.props.createEvent(this.state.event)

   }


  render() {
    const {handleCancel} = this.props;
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
              <input type="date" 
              name="date" 
              onChange={this.onInputChange}
              placeholder="Event Date" />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input 
              name="city"
              onChange={this.onInputChange}
              placeholder="City event is taking place" />
            </Form.Field>
            <Form.Field>
              <label>Venue</label>
              <input 
                name="venue"
                onChange={this.onInputChange}
              placeholder="Enter the Venue of the event" />
            </Form.Field>
            <Form.Field>
              <label>Hosted By</label>
              <input 
                name="hostedBy"
                onChange={this.onInputChange}
              placeholder="Enter the name of person hosting" />
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
            <Button type="button" onClick={handleCancel}>Cancel</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default EventForm;
