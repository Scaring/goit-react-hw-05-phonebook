import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactsList from "./ContactsList/ContactsList";

import "../index.css";
import slideTransition from "../transitions/slide.module.css";
import popTransition from "../transitions/pop.module.css";
import s from "./App.module.css";

const filterContacts = (contacts, filter) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export default class App extends Component {
  state = {
    contacts: [
      {
        id: "611a6308-e6f2-4506-b4cc-266e5951ab27",
        name: "Annie Copeland",
        number: "5555555",
      },
      {
        id: "cbc75291-de64-44c1-a0f9-36e7f0e450de",
        name: "Jim Black",
        number: "5555555",
      },
      {
        id: "a39e6b5b-91c3-4a14-b16f-a63cb88c90cb",
        name: "Rod Tos",
        number: "5555555",
      },
    ],
    filter: "",
    show: false,
  };

  componentDidMount() {
    this.setState({ show: true });
  }

  addContact = (contact) => {
    const contactToAdd = {
      ...contact,
      id: uuidv4(),
    };

    this.setState((state) => ({
      contacts: [...state.contacts, contactToAdd],
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDeleteContact = (id) => {
    const { contacts, filter } = this.state;

    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));

    const filteredContacts = filterContacts(contacts, filter);

    if (filteredContacts.length === 1) {
      this.setState({ filter: "" });
    }
  };

  render() {
    const { contacts, filter, show } = this.state;

    const filteredContacts = filterContacts(contacts, filter);

    return (
      <Fragment>
        <CSSTransition in={show} timeout={500} classNames={slideTransition}>
          <h2 className={s.heading}>Phonebook</h2>
        </CSSTransition>

        <ContactForm contacts={contacts} onSubmit={this.addContact} />
        {contacts.length >= 1 && (
          <ContactsList
            contacts={filteredContacts}
            onDelete={this.handleDeleteContact}
          >
            <CSSTransition
              in={contacts.length >= 2}
              timeout={250}
              classNames={popTransition}
              unmountOnExit
            >
              <Filter filter={filter} onChange={this.handleChange} />
            </CSSTransition>
          </ContactsList>
        )}
      </Fragment>
    );
  }
}
