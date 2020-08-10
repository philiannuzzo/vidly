import React, { Component } from "react";

class SearchBar extends Component {
  style = {
    marginBottom: "20px",
  };

  handleChange = ({ currentTarget }) => {
    this.props.onSearch(currentTarget.value);
  };

  render() {
    return (
      <input
        onChange={this.handleChange}
        className="form-control"
        style={this.style}
        value={this.props.searchQuery}
        placeholder="Search..."
      />
    );
  }
}

export default SearchBar;
