import CloseFormButton from '../CloseFormButton/CloseFormButton';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Tooltip = (props) => {
  const onFormClose = () => {
    props.onClose();
  };

  const onSigninLinkClick = () => {
    props.setIsLoginPopupOpen(true);
    props.setIsTooltipOpen(false);
  };

  return (
    <PopupWithForm
      formHeadingText='Registration successfully completed!'
      isPopupOpen={props.isPopupOpen}
    >
      <p className='form__link' onClick={onSigninLinkClick}>
        Sign in
      </p>
      <CloseFormButton onClose={onFormClose} />
    </PopupWithForm>
  );
};

export default Tooltip;
