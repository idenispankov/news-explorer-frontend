import './Login.css';
import { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';

const Login = (props) => {
  const history = useHistory();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [value, setValue] = useState({});

  useEffect(() => {
    props.setIsPopupOpen(true);
  }, [props]);

  // Errors presentational, will refactor on stage-3
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.email || !value.password) {
      setButtonDisabled(true);
      return;
    }
    props.setLoggedin(true);
    props.setIsPopupOpen(false);
    history.push('/');
    props.setErrorMessage(false);
  };

  const onFormClose = () => {
    history.push('/');
    props.setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    if (value.email && value.password) {
      setButtonDisabled(false);
    }
  };

  return (
    <PopupWithForm
      formHeadingText='Sign in'
      onSubmit={handleSubmit}
      isPopupOpen={props.isPopupOpen}
    >
      <Input
        label='Email'
        type='email'
        placeholder='Email'
        name='email'
        minLength='2'
        maxLength='50'
        handleChange={handleChange}
        value={value.email}
        errorMessage={props.errorMessage}
      />
      {props.errorMessage && (
        <span className='form__input-error'>Please enter valid email</span>
      )}

      <Input
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
        handleChange={handleChange}
        value={value.password}
        errorMessage={props.errorMessage}
      />
      {props.errorMessage && (
        <span className='form__input-error'>Please enter valid password</span>
      )}

      {props.errorMessage && (
        <span className='submit__text-error'>Invalid email or password</span>
      )}

      <FormSubmitButton
        submitButtonText='Sign in'
        errorMessage={props.errorMessage}
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
