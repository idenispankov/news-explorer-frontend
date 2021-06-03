import CloseFormButton from '../CloseFormButton/CloseFormButton';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Tooltip = ({
  handleSigninClick,
  onClose,
  setIsLoginPopupOpen,
  isPopupOpen,
  setIsTooltipOpen,
}) => {
  const onFormClose = () => {
    onClose();
  };

  const onSigninLinkClick = () => {
    handleSigninClick();
    setIsLoginPopupOpen(true);
    setIsTooltipOpen(false);
  };

  return (
    <PopupWithForm
      formHeadingText='Registration successfully completed!'
      isPopupOpen={isPopupOpen}
    >
      <p className='form__link' onClick={onSigninLinkClick}>
        Sign in
      </p>
      <CloseFormButton onClose={onFormClose} />
    </PopupWithForm>
  );
};

export default Tooltip;
