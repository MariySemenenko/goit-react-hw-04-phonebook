import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Div, H2 } from './StyledApp.styled';

export const App = () => {
  state = {
    //визначаю два поля масив і рядок
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '', //пошук контактів за іменем
  };

  //зчитую контакти у локальному сховищу
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

componentDidUpdate(_, prevState) {
  const { contacts } = this.state;
  if ( prevState.contacts !== contacts ) {
    localStorage.setItem('contacts', JSON.stringify(contacts)); 
  }
}

  filterChange = e => {
    //цей метод викликається при зміні значення фільтру і оновлюється коли користувач вводе значення
    this.setState({ filter: e.target.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    //повертаємо відфільтрований масив
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  addContact = newContact => {
    const existingContact = this.state.contacts.find(
      //шукаю існуючий контакт до першого збігу
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase() ||
      contact.number === newContact.number 
  
    );

    if (existingContact) {
      alert(`${newContact.name} ${newContact.number} is already in contacts`);
      return;
    }

    this.setState(
      //оновлюю контакти та додаю новий
      prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }),
      
    );
  };

  deleteContacts = id => {
    this.setState(
      prevState => ({
        //оновлюю та видаляю по id
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      
    );
  };

  // render() {
  //   const { contacts, filter } = this.state;
  //   const visibleFilter = this.visibleContacts();

    return (
      // функція onSubmitData передається як властивість для додавання нового контакту
      <Div>
        <ContactForm onSubmitData={this.addContact} />

        <H2>Contacts {contacts.length}</H2>
        <Filter value={filter} onChange={this.filterChange} />
        {contacts.length ? (
          <ContactList
            contacts={visibleFilter}
            onDeletContacts={this.deleteContacts}
          />
        ) : (
          <p>No contacts in phonebook</p>
        )}
      </Div>
    );
  }


