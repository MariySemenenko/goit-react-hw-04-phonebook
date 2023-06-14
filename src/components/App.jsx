import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Div, H2 } from './StyledApp.styled';

const init = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? init
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = e => {
    //цей метод викликається при зміні значення фільтру і оновлюється коли користувач вводе значення
    setFilter(e.target.value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    //повертаємо відфільтрований масив
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addContact = newContact => {
    const existingContact = contacts.find(
      //шукаю існуючий контакт до першого збігу
      contact =>
        contact.name.toLowerCase() === newContact.name.toLowerCase() ||
        contact.number === newContact.number
    );

    if (existingContact) {
      alert(`${newContact.name} ${newContact.number} is already in contacts`);
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const deleteContacts = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    // функція onSubmitData передається як властивість для додавання нового контакту
    <Div>
      <ContactForm onSubmitData={addContact} />

      <H2>Contacts {contacts.length}</H2>
      <Filter value={filter} onChange={filterChange} />
      {contacts.length ? (
        <ContactList
          contacts={visibleContacts()}
          onDeletContacts={deleteContacts}
        />
      ) : (
        <p>No contacts in phonebook</p>
      )}
    </Div>
  );
};
