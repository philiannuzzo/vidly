import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  async doSubmit() {
    try {
      const { state } = this.props.location;

      await auth.login(this.state.data);
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error(error.response.data);
    }
  }

  render() {
    if (auth.getUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
