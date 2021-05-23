import './Register.css';
import { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';

const Register = (props) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  const onSigninLinkClick = () => {
    props.setIsRegisterPopupOpen(false);
    props.setIsLoginPopupOpen(true);
  };

  const onFormClose = () => {
    props.onClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister(email, password, name);
    setEmail('');
    setPassword('');
    setName('');
  };

  useEffect(() => {
    if (email && password && name) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, name]);

  return (
    <>
      <PopupWithForm
        formHeadingText='Sign up'
        onSubmit={handleSubmit}
        isPopupOpen={props.isPopupOpen}
      >
        <Input
          label='Email'
          type='email'
          placeholder='Enter email'
          name='email'
          minLength='2'
          maxLength='50'
          handleChange={handleEmailChange}
          value={email}
          // isValid={isValid}
        />

        {/* {errors.email && (
          <span className='form__span-error'>{errors.email}</span>
        )} */}

        <Input
          label='Password'
          type='password'
          placeholder='Enter password'
          name='password'
          handleChange={handlePasswordChange}
          value={password}
          // isValid={isValid}
        />
        {/* {errors.password && (
          <span className='form__span-error'>{errors.password}</span>
        )} */}

        <Input
          label='Username'
          type='text'
          placeholder='Enter your username'
          name='username'
          handleChange={handleNameChange}
          value={name}
          // isValid={isValid}
        />
        {/* {errors.username && (
          <span className='form__span-error'>{errors.username}</span>
        )} */}

        {/* <p className='submit__text-error'>This email is not available</p> */}
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
      )}
    </>
  );
};

export default Register;
