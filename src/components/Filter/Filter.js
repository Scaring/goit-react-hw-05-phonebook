import React from "react";
import PropTypes from "prop-types";
import s from "./Filter.module.css";

const Filter = ({ filter, onChange }) => {
  return (
    <label className={s.filter}>
      Find contact by name
      <input type="text" name="filter" value={filter} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
