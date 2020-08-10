import React from "react";

const Select = ({
  name,
  label,
  options,
  error,
  valueProperty,
  textProperty,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} className="custom-select" {...rest}>
        <option value="">--</option>
        {options.map((option) => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Select;
