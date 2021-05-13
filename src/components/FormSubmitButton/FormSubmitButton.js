import './FormSubmitButton.css';

const FormSubmitButton = (props) => {
  return (
    <button className='form__button-submit' aria-label='submit button'>
      {props.submitButtonText}
    </button>
  );
};

export default FormSubmitButton;
