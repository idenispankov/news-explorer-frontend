import './FormSubmitButton.css';

const FormSubmitButton = ({ submitButtonText, buttonDisabled }) => {
  return (
    <button
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
