import './Login.css';
import { NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';

const Login = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setLoggedin(true);
    props.setIsPopupOpen(false);
  };

  const onClose = () => {
    props.setIsPopupOpen(false);
  };

  return (
    <PopupWithForm
      formHeadingText='Sign in'
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isPopupOpen={props.isPopupOpen}
    >
      <Input
        label='Email'
        type='email'
        placeholder='Email'
        name='email'
        minLength='2'
        maxLength='50'
      />
      <Input
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
      />
      <p className='submit__text-error'>Email or Password invalid</p>
      <FormSubmitButton submitButtonText='Sign in' />
      <p className='form__text'>
        or{' '}
        <NavLink to='/signup' className='form__link'>
          Sign up
        </NavLink>
      </p>
      {/* <button
        onClick={onClose}
        className='form__button-close'
        aria-label='close button'
        type='reset'
      ></button> */}
    </PopupWithForm>
  );
};

export default Login;
