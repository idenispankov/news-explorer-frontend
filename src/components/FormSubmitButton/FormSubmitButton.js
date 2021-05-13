import './FormSubmitButton.css';

const FormSubmitButton = (props) => {
  return (
    <button
      className='form__button-submit'
      aria-label='submit button'
      onClick={props.onSubmit}
    >
      {props.submitButtonText}
    </button>
  );
};

export default FormSubmitButton;
