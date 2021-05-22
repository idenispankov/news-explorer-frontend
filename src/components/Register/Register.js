import './Register.css';
import { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Input from '../Input/Input.js';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton.js';
import CloseFormButton from '../CloseFormButton/CloseFormButton.js';
// import validateRegister from '../validateRegister';

const Register = ({
  isPopupOpen,
  setIsPopupOpen,
  isSuccessOpen,
  setIsSuccessOpen,
  handleRegister,
}) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // const [value, setValue] = useState({ email: '', password: '', name: '' });
  // const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const [isValid, setIsValid] = useState(false);
  // const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);

  useEffect(() => {
    setIsPopupOpen(true);
    if (email && password && name) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, name, setIsPopupOpen]);

  const onFormClose = () => {
    history.push('/');
    setIsPopupOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // setValue({
    //   ...value,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // setValue({
    //   ...value,
    //   [e.target.name]: e.target.value,
    // });
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    // setValue({
    //   ...value,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password, name);
    // setErrors(validateRegister(value));
    // setIsValid(e.target.closest('form').checkValidity());
    // if (isValid) {
    //   setIsRegisterSuccessful(true);
    //   setIsPopupOpen(false);
    //   setIsSuccessOpen(true);
    // }
  };

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
          <NavLink to='/signin' className='form__link'>
            Sign in
          </NavLink>
        </p>
        <CloseFormButton onClose={onFormClose} />
      </PopupWithForm>

      {/* {isRegisterSuccessful && (
        <div className={`modal ${isSuccessOpen && 'modal-open'}`}>
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
      )} */}
    </>
  );
};

export default Register;
