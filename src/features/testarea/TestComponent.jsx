import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter } from './testActions'

class TestComponent extends Component {
  render() {
    const { incrementCounter, decrementCounter } = this.props;
    return <div>
        <h1>Test Area</h1>
        <h3>The answer is: {this.props.data}</h3>
        <Button onClick={incrementCounter} color="green" content="Increment" />
        <Button onClick={decrementCounter} color="red" content="Decrement" />
      </div>;
  }
}


const mapStateToProps = (state) => ({
  data: state.test.data
})

export default connect(mapStateToProps, {incrementCounter, decrementCounter})(TestComponent)