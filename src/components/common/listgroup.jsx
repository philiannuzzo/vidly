import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  groups,
  currentGroup,
  onGroupChange,
  textProperty,
  valueProperty,
  allText,
}) => {
  const allClasses =
    currentGroup === -1 ? "list-group-item active" : "list-group-item";

  return (
    <ul className="list-group">
      <li className={allClasses} onClick={() => onGroupChange(-1)}>
        All {allText}
      </li>
      {groups.map((item) => {
        const groupClasses =
          currentGroup === groups.indexOf(item)
            ? "list-group-item active"
            : "list-group-item";
        return (
          <li
            className={groupClasses}
            onClick={() => onGroupChange(groups.indexOf(item))}
            key={item[valueProperty]}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  groups: PropTypes.array.isRequired,
  currentGroup: PropTypes.number.isRequired,
  onGroupChange: PropTypes.func.isRequired,
  allText: PropTypes.string,
};

export default ListGroup;
