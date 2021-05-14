import './Register.css';
import { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';

const Register = (props) => {
  const history = useHistory();

  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRegisterSuccessful(true);
    props.setIsPopupOpen(false);
    props.setIsSuccessOpen(true);
    // history.push('/signin');
  };

  const onFormClose = () => {
    history.push('/');
    props.setIsPopupOpen(false);
  };

  return (
    <>
      <PopupWithForm
        formHeadingText='Sign up'
        onSubmit={handleSubmit}
        onClose={props.onClose}
        isPopupOpen={props.isPopupOpen}
      >
        <Input
          label='Email'
          type='email'
          placeholder='Enter email'
          name='email'
          minLength='2'
          maxLength='50'
        />

        <Input
          label='Password'
          type='password'
          placeholder='Enter password'
          name='password'
        />

        <Input
          label='Username'
          type='text'
          placeholder='Enter your username'
          name='username'
        />
        <p className='submit__text-error'>This email is not available</p>
        <FormSubmitButton submitButtonText='Sign up' />
        <p className='form__text'>
          or{' '}
          <NavLink to='/signin' className='form__link'>
            Sign in
          </NavLink>
        </p>
        <CloseFormButton onClose={onFormClose} />
      </PopupWithForm>

      {isRegisterSuccessful && (
        <div className={`modal ${props.isSuccessOpen && 'modal-open'}`}>
          <form className='form'>
            <h2 className='form__heading'>
              Registration successfully completed!
            </h2>
            <NavLink to='/signin' className='form__link'>
              Sign in
            </NavLink>
            <CloseFormButton onClose={onFormClose} />
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
