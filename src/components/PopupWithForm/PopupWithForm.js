import './PopupWithForm.css';
import { NavLink } from 'react-router-dom';

const PopupWithForm = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    props.setLoggedin(true);
    props.setIsPopupOpen(false);
  };

  const onClose = () => {
    props.setIsPopupOpen(false);
  };
  return (
    <div className={`modal ${props.isPopupOpen && 'modal-open'}`}>
      <form className='form'>
        {/* For Heading props.text later */}
        <h2 className='form__heading'>Sign in</h2>
        {props.children}
        {/* Input separate component with placeholder, type */}
        {/* <label className='form__label' htmlFor='email'>
          Email
        </label>
        <input
          className='form__input'
          type='text'
          placeholder='Email'
          name='email`'
        /> */}
        {/* <p className='form__input-error'>Invalid email address</p> */}
        {/* <label className='form__label' htmlFor='password'>
          Password
        </label>
        <input
          className='form__input'
          type='text'
          placeholder='Password'
          name='password'
        /> */}
        {/* <p className='form__text-error'>This email is not available</p> */}
        {/* For Button props.buttonText */}
        <button
          className='form__button'
          aria-label='submit button'
          onClick={onSubmit}
        >
          Sign in
        </button>
        {/* props.linkText */}
        <p className='form__text'>
          or{' '}
          <NavLink to='signup' className='form__link'>
            Sign up
          </NavLink>
        </p>
        <button
          onClick={onClose}
          className='form__button-close'
          aria-label='close button'
          type='reset'
        ></button>
      </form>
    </div>
  );
};

export default PopupWithForm;
