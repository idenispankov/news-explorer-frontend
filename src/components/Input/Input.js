import './Input.css';

const Input = (props) => {
  return (
    <>
      <label className='form__label' htmlFor={props.label}>
        {props.label}
      </label>
      <input
        className='form__input'
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value}
        onChange={props.handleChange}
        autoComplete='off'
        required
      />
    </>
  );
};

export default Input;
