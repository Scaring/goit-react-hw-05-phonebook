import React, { Fragment } from "react";
import PropTypes from "prop-types";
import s from "./ContactsList.module.css";

const ContactsItem = ({ name, number, onDelete }) => {
  return (
    <Fragment>
      <span className={s.name}>{name}</span>
      <span className={s.number}>{number}</span>
      <button className={s.button} type="button" onClick={onDelete}>
        <svg>
          <line x1="1" y1="1" x2="13" y2="13" stroke="white" strokeWidth="3" />
          <line x1="13" y1="1" x2="1" y2="13" stroke="white" strokeWidth="3" />
        </svg>
      </button>
    </Fragment>
  );
};

ContactsItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsItem;
