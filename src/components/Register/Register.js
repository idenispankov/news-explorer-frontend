import './Register.css';
import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';

const Register = ({
  handleSigninClick,
  onClose,
  values,
  errors,
  submitError,
  onInputChange,
  handleRegister,
  isPopupOpen,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSigninLinkClick = () => {
    handleSigninClick();
  };

  const onFormClose = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values.email, values.password, values.username);
  };

  useEffect(() => {
    if (
      errors.email ||
      errors.password ||
      errors.name ||
      values.email ||
      values.password ||
      values.name
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    errors.email,
    errors.password,
    errors.name,
    values.email,
    values.password,
    values.name,
  ]);

  return (
    <>
      <PopupWithForm
        formHeadingText='Sign up'
        onSubmit={handleSubmit}
        isPopupOpen={isPopupOpen}
      >
        <Input
          label='Email'
          type='email'
          placeholder='Enter email'
          name='email'
          minLength='2'
          maxLength='50'
          handleChange={onInputChange}
          value={values.email || ''}
        />
        <span className='form__span-error'>{errors.email}</span>

        <Input
          label='Password'
          type='password'
          placeholder='Enter password'
          name='password'
          handleChange={onInputChange}
          value={values.password || ''}
        />
        <span className='form__span-error'>{errors.password}</span>

        <Input
          label='Username'
          type='text'
          placeholder='Enter your username'
          name='username'
          handleChange={onInputChange}
          value={values.username || ''}
        />
        <span className='form__span-error'>{errors.username}</span>

        <span className='submit__text-error'>{submitError}</span>
        <FormSubmitButton
          submitButtonText='Sign up'
          buttonDisabled={buttonDisabled}
        />
        <p className='form__text'>
          or{' '}
          <span className='form__link' onClick={onSigninLinkClick}>
            Sign in
          </span>
        </p>
        <CloseFormButton onClose={onFormClose} />
      </PopupWithForm>
      )
    </>
  );
};

export default Register;
