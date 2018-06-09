import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { login } from "../authActions";
import TextInput from "../../../app/common/form/TextInput";

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="Password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  { login }
)(reduxForm({ form: "loginForm" })(LoginForm));
