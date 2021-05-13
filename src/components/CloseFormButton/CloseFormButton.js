import './CloseFormButton.css';

const CloseFormButton = (props) => {
  return (
    <button
      onClick={props.onClose}
      className='form__button-close'
      aria-label='close button'
      type='reset'
    ></button>
  );
};

export default CloseFormButton;
