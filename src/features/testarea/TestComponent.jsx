import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../modals/modalActions";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { incrementCounter, decrementCounter } from "./testActions";

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  state = {
    address: "",
    scriptLoaded: false
  };
  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  onChange = address => {
    return this.setState({ address });
  };
  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    const { incrementCounter, decrementCounter, openModal } = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {this.props.data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
        <Button
          onClick={() => openModal("TestModal", { data: 43 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete inputProps={inputProps} />
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.test.data
});

export default connect(
  mapStateToProps,
  { incrementCounter, decrementCounter, openModal }
)(TestComponent);
