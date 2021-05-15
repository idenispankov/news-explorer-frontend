import './Login.css';
import { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';
import validateLogin from '../validateLogin';

const Login = ({ setIsPopupOpen, isPopupOpen, setLoggedin }) => {
  const history = useHistory();

  const [value, setValue] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setIsPopupOpen(true);
    if (value.email && value.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [value, setIsPopupOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateLogin(value));
    setIsValid(e.target.closest('form').checkValidity());
    if (isValid) {
      setIsPopupOpen(false);
      setLoggedin(true);
      history.push('/');
    }
  };

  const onFormClose = () => {
    history.push('/');
    setIsPopupOpen(false);
  };

  return (
    <PopupWithForm
      formHeadingText='Sign in'
      onSubmit={handleSubmit}
      isPopupOpen={isPopupOpen}
    >
      <Input
        label='Email'
        type='email'
        placeholder='Email'
        name='email'
        maxLength='50'
        handleChange={handleChange}
        value={value.email}
        isValid={isValid}
      />
      {errors.email && <span className='form__span-error'>{errors.email}</span>}

      <Input
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
        handleChange={handleChange}
        value={value.password}
        isValid={isValid}
      />
      {errors.password && (
        <span className='form__span-error'>{errors.password}</span>
      )}

      <FormSubmitButton
        submitButtonText='Sign in'
        buttonDisabled={buttonDisabled}
      />
      <p className='form__text'>
        or{' '}
        <NavLink to='/signup' className='form__link'>
          Sign up
        </NavLink>
      </p>
      <CloseFormButton onClose={onFormClose} />
    </PopupWithForm>
  );
};

export default Login;
