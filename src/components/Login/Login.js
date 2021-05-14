import './Login.css';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';

const Login = (props) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setLoggedin(true);
    props.setIsPopupOpen(false);
    history.push('/');
  };

  const onFormClose = () => {
    history.push('/');
    props.setIsPopupOpen(false);
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
      />
      {/* <p className='form__input-error'>Invalid email address</p> */}

      <Input
        label='Password'
        type='password'
        placeholder='Password'
        name='password'
      />

      {/* <p className='submit__text-error'>This email is not available</p> */}

      <FormSubmitButton submitButtonText='Sign in' />
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
