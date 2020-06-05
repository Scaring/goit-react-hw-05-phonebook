import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import Notification from "../Notification/Notification";

import s from "../ContactForm/ContactForm.module.css";
import slideErrorTransition from "../../transitions/slideError.module.css";
import "react-notifications/lib/notifications.css";

export default class ContactForm extends Component {
  static propTypes = {
    contacts: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
  };

  state = { name: "", number: "", error: false };

  resetState() {
    this.setState({ name: "", number: "" });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;
    const { contacts, onSubmit } = this.props;

    if (!name) return;

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      this.setState({ error: true });
      this.resetState();
      setTimeout(() => this.setState({ error: false }), 2000);
      return;
    }

    onSubmit({ ...this.state });

    this.resetState();
  };

  render() {
    return (
      <div>
        <form className={s.contactForm} onSubmit={this.handleSubmit}>
          <label className={s.contactFormInput}>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label className={s.contactFormInput}>
            <span>Number</span>
            <input
              type="number"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button className={s.contactFormButton} type="submit">
            Add contact
          </button>
        </form>

        <CSSTransition
          in={this.state.error}
          timeout={250}
          classNames={slideErrorTransition}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>
      </div>
    );
  }
}
