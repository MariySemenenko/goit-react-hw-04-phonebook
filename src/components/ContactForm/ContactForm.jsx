
import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Form } from '../StyledApp.styled';

export class ContactForm extends Component {
  //тут зберігається імя та номер
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget; //отримую доступ до значення поля за допомогою currentTarget
    this.setState({ [name]: value }); //оновлюю ключ у стейті за допомогою динамічного ключа
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onSubmitData } = this.props;
     //тут створюється новий об'єкт newContact
    const newContact = {

      id: nanoid(),
      name,
      number,
    };
    onSubmitData(newContact); //передаю колбекom (App addContact) для нового контакту та
    //скидання значень до початкових.

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </label>

          <button>Add Contact</button>
        </Form>
      </>
    );
  }
}

ContactForm.propType = {
  onSubmitData: PropTypes.func.isRequired,
};