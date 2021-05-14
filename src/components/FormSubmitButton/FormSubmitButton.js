import './FormSubmitButton.css';

const FormSubmitButton = (props) => {
  return (
    <button
      // form__button-submit-disabled - Disabled class
      className='form__button-submit'
      aria-label='submit button'
    >
      {props.submitButtonText}
    </button>
  );
};

export default FormSubmitButton;
