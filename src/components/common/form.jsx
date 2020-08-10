import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";

class Form extends Component {
  //   state = {
  //     data: {},
  //     errors: {},
  //   };

  validateInput = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, { abortEarly: true });
    return error ? error.details[0].message : null;
  };

  validateForm = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let i of error.details) {
      errors[i.path[0]] = i.message;
    }
    // console.log(errors);
    return errors;
  };

  handleChange = ({ currentTarget }) => {
    // validation
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(currentTarget);
    if (errorMessage) {
      errors[currentTarget.name] = errorMessage;
    } else delete errors[currentTarget.name];

    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior to prevent full page reload

    // validation
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button disabled={this.validateForm()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        value={data[name]}
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        value={data[name]}
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
