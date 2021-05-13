import './PopupWithForm.css';

const PopupWithForm = (props) => {
  return (
    <div className={`modal ${props.isPopupOpen && 'modal-open'}`}>
      <form className='form' onSubmit={props.onSubmit}>
        <h2 className='form__heading'>{props.formHeadingText}</h2>
        {props.children}
      </form>
    </div>
  );
};

export default PopupWithForm;
