import './Login.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';
// import validateLogin from '../validateLogin';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // CLOSE MODAL
  const onFormClose = () => {
    props.onClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(email, password);
    setEmail('');
    setPassword('');
  };

  // Use Effect
  useEffect(() => {
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

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
        maxLength='50'
        handleChange={handleEmailChange}
        value={email}
      />

      <Input
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
        handleChange={handlePasswordChange}
        value={password}
      />

      <FormSubmitButton
        submitButtonText='Sign in'
        buttonDisabled={buttonDisabled}
      />
      <p className='form__text'>
        or{' '}
        <NavLink to='/' className='form__link'>
          Sign up
        </NavLink>
      </p>
      <CloseFormButton onClose={onFormClose} />
    </PopupWithForm>
  );
};

export default Login;
