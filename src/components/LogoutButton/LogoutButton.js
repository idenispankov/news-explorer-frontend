import './LogoutButton.css';
import whiteLogoutIcon from '../../images/logout-light.png';
import darkLogoutIcon from '../../images/logout-dark.svg';
import { NavLink } from 'react-router-dom';

const LogoutButton = ({ isSavedNewsRoute, handleLogout }) => {
  const onLogout = () => {
    handleLogout();
  };

  return (
    <button
      className={`navbar__button navbar__button-logout ${
        isSavedNewsRoute && 'navbar__button-logout-dark'
      }`}
    >
      <p
        className={`navbar__button-text ${
          isSavedNewsRoute && 'navbar__button-text-dark'
        }`}
      >
        Denis
      </p>{' '}
      <NavLink to='/' onClick={onLogout}>
        {isSavedNewsRoute ? (
          <img
            className='navbar__button-icon'
            alt='logout icon'
            src={darkLogoutIcon}
          />
        ) : (
          <img
            className='navbar__button-icon'
            alt='logout icon'
            src={whiteLogoutIcon}
          />
        )}
      </NavLink>
    </button>
  );
};

export default LogoutButton;
