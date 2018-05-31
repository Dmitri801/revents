import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const {event, deleteEvent } = this.props;
    return <div>
        <Segment.Group style={{marginBottom: '10px'}}> 
          <Segment>
            <Item.Group> 
              <Item>
                <Item.Image size="tiny" circular src={event.hostPhotoURL} />
                <Item.Content>
                  <Item.Header as="a">{event.title}</Item.Header>
                  <Item.Description>
                    Hosted by <a>{event.hostedBy}</a>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group> 
          </Segment> 
          <Segment> 
            <span>
              <Icon name="clock" /> {event.date}
              <Icon name="marker" /> {event.venue}
            </span>
          </Segment>
          <Segment secondary>
            <List horizontal>
              {event.attendees && event.attendees.map(attendee => (
                <EventListAttendee attendee={attendee} key={attendee.id}/>
              ))}
            </List>
          </Segment>
          <Segment clearing>
          <span>{event.descirption}</span>
            <Button as={Link} to={`/event/${event.id}`}color="teal" floated="right" 
            content="View" />
          <Button as="a" color="red" floated="right"
            onClick={deleteEvent(event.id)}
            content="Delete" />
          </Segment>
        </Segment.Group>
      </div>;
  }
}

export default EventListItem;
