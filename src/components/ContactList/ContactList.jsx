import PropTypes from 'prop-types';
import { Ul } from '../StyledApp.styled';

// відображаю список контактів і маю можливість видаляти контакт зі списку
//при кліку на кнопку виконується функція onDeletContacts
export const ContactList = ({ contacts, onDeletContacts }) => {
  return (
    <Ul>
      {contacts.map(
        (
          { name, number, id } // кожен контакт має властивість name, number, id
        ) => (
          <li key={id}>
            <p>
              {name}: {number}
            </p>

            <button type="button" onClick={() => onDeletContacts(id)}>
              Delete
            </button>
          </li>
        )
      )}
    </Ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeletContacts: PropTypes.func.isRequired,
};
