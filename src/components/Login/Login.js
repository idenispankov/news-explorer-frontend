import './Login.css';
import { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';

const Login = ({
  values,
  errors,
  isValid,
  submitError,
  onInputChange,
  setIsLoginPopupOpen,
  setIsRegisterPopupOpen,
  onClose,
  handleLogin,
  isPopupOpen,
  onSignupLinkClick,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSignup = () => {
    onSignupLinkClick();
  };

  const onFormClose = () => {
    onClose();
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  // Use Effect
  useEffect(() => {
    if (errors.email || errors.password || !values.email || !values.password) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [errors.email, errors.password, values.email, values.password]);

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
        handleChange={onInputChange}
        value={values.email || ''}
      />
      <span className='form__span-error'>{errors.email}</span>

      <Input
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
        handleChange={onInputChange}
        value={values.password || ''}
      />
      <span className='form__span-error'>{errors.password}</span>

      <span className='submit__text-error'>{submitError}</span>
      <FormSubmitButton
        submitButtonText='Sign in'
        buttonDisabled={buttonDisabled}
      />
      <p className='form__text'>
        or{' '}
        <span className='form__link' onClick={onSignup}>
          Sign up
        </span>
      </p>
      <CloseFormButton onClose={onFormClose} />
    </PopupWithForm>
  );
};

export default Login;
