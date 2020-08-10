import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order === "asc"
        ? (sortColumn.order = "desc")
        : (sortColumn.order = "asc");
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon(column) {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
  }

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
