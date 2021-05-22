import './Login.css';
import { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';
// import validateLogin from '../validateLogin';

const Login = ({ setIsPopupOpen, isPopupOpen, handleLogin }) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // CLOSE MODAL
  const onFormClose = () => {
    history.push('/');
    setIsPopupOpen(false);
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
    handleLogin();
  };

  // Use Effect
  useEffect(() => {
    setIsPopupOpen(true);
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, setIsPopupOpen, isPopupOpen]);

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
        handleChange={handleEmailChange}
        value={email}
        // isValid={isValid}
      />
      {/* {email && <span className='form__span-error'>{email}</span>} */}

      <Input
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
        handleChange={handlePasswordChange}
        value={password}
        // isValid={isValid}
      />
      {/* {password && <span className='form__span-error'>{password}</span>} */}

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
