import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Form } from '../StyledApp.styled';

export const ContactForm = ({ onSubmitData }) => {
  const [data, setData] = useState({ name: '', number: '' });
  //тут зберігається імя та номер

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget; //отримую доступ до значення поля за допомогою currentTarget
    setData(prevData => ({ ...prevData, [name]: value })); //оновлюю ключ у стейті за допомогою динамічного ключа
  };

  const handleSubmit = e => {
    e.preventDefault();

    //тут створюється новий об'єкт newContact
    const newContact = {
      id: nanoid(),
      ...data,
    };
    onSubmitData(newContact); //передаю колбекom (App addContact) для нового контакту та
    //скидання значень до початкових.

    setData({ name: '', number: '' });
  };

  const { name, number } = data;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>

        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>

        <button>Add Contact</button>
      </Form>
    </>
  );
};

ContactForm.propType = {
  onSubmitData: PropTypes.func.isRequired,
};
