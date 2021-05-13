import './PopupWithForm.css';

const PopupWithForm = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='modal'>
      <form className='form'>
        {/* For Heading props.text later */}
        <h2 className='form__heading'>Sign in</h2>
        {/* Input separate component with placeholder, type */}
        <label className='form__label' htmlFor='email'>
          Email
        </label>
        <input className='form__input' type='text' placeholder='Email' />
        <label className='form__label' htmlFor='password'>
          Password
        </label>
        <input className='form__input' type='text' placeholder='Password' />
        {/* For Button props.buttonText */}
        <button className='form__button' onClick={onSubmit}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default PopupWithForm;
