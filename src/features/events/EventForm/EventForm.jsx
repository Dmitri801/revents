/*global google*/
import React, { Component } from "react";
import moment from "moment";
import { reduxForm, Field } from "redux-form";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Script from "react-load-script";
import { connect } from "react-redux";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import cuid from "cuid";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({ message: "Event Title IS required" }),
  category: isRequired({ message: "Please Provide A Category" }),
  description: composeValidators(
    isRequired({ message: "Please Enter A Description" }),
    hasLengthGreaterThan(4)({
      message: "Description Needs To Be At Least 5 Characters"
    })
  )(),
  city: isRequired({ message: "City is Required" }),
  venue: isRequired({ message: "Venue is Required" }),
  date: isRequired("Date")
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  };

  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  };

  handleCitySelect = city => {
    geocodeByAddress(city)
      .then(res => getLatLng(res[0]))
      .then(latlng => {
        this.setState({ cityLatLng: latlng });
      })
      .then(() => this.props.change("city", city));
  };
  handleVenueSelect = venue => {
    geocodeByAddress(venue)
      .then(res => getLatLng(res[0]))
      .then(latlng => {
        this.setState({ venueLatLng: latlng });
      })
      .then(() => this.props.change("venue", venue));
  };
  componentDidMount() {
    if (this.props.selectedEvent !== null) {
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedEvent !== this.props.selectedEvent) {
    }
  }

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDckZvcQVHJy2-OvMAFys2UBdiABixjfWA&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give Your Event A Name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                placeholder="What is Your Event About"
                options={category}
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                placeholder="Tell Us About Your Event"
              />
              <Header sub color="teal" content="Event Location" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                onSelect={this.handleCitySelect}
                placeholder="City"
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    types: ["establishment"],
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000
                  }}
                  placeholder="Venue"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                placeholder="Date And Time of Event"
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
              />
              <Button
                positive
                disabled={invalid || submitting || pristine}
                type="submit"
              >
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let event = {};
  if (ownProps.match) {
    const eventId = ownProps.match.params.id;
    if (eventId && state.events.length > 0) {
      event = state.events.filter(event => event.id === eventId)[0];
    }
  }
  return {
    initialValues: event
  };
};

export default connect(
  mapStateToProps,
  { createEvent, updateEvent }
)(
  reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
    EventForm
  )
);
