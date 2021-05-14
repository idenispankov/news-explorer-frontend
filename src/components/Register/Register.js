import './Register.css';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';

const Register = (props) => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/');
  };

  const onFormClose = () => {
    history.push('/');
    props.setIsPopupOpen(false);
  };

  return (
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
      {/* <p className='submit__text-error'>This email is not available</p> */}
      <FormSubmitButton submitButtonText='Sign up' />
      <p className='form__text'>
        or{' '}
        <NavLink to='/signin' className='form__link'>
          Sign in
        </NavLink>
      </p>
      <CloseFormButton onClose={onFormClose} />
    </PopupWithForm>
  );
};

export default Register;
