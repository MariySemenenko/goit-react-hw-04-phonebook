
import PropTypes from 'prop-types';
import { Label } from '../StyledApp.styled';
//поле введення яке фільтрує контакти за іменем
//value поточне значення при введені
//onChange спрацьовує на зміни і передає нове значення
export const Filter = ({ value, onChange }) => { //пропси
 

  return (
    <Label>
      <label>
        Find contacts by name
        <input type="name" value={value} onChange={onChange} />
      </label>
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};