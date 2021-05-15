import './FormSubmitButton.css';

const FormSubmitButton = ({ submitButtonText, buttonDisabled }) => {
  return (
    <button
      // form__button-submit-disabled - Disabled class
      className={`form__button-submit ${
        buttonDisabled && 'form__button-submit-disabled'
      }`}
      aria-label='submit button'
    >
      {submitButtonText}
    </button>
  );
};

export default FormSubmitButton;
