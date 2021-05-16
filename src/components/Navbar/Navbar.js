import './Navbar.css';
import { useHistory, NavLink, withRouter } from 'react-router-dom';
import { useState } from 'react';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';

const Navbar = ({ loggedin, setLoggedin }) => {
  const history = useHistory();
  const isSavedNewsRoute = history.location.pathname.includes('saved-news');

  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  const onHomeClick = () => {
    setIsHamburgerMenuOpen(false);
  };

  const onLogoClick = () => {
    setIsHamburgerMenuOpen(false);
  };

  const onSavedArticlesClick = () => {
    setIsHamburgerMenuOpen(false);
  };

  return (
    <div className='navbar__container'>
      <nav
        className={`navbar ${isSavedNewsRoute && 'navbar_type_white'} ${
          isHamburgerMenuOpen && 'navbar-dark'
        }`}
      >
        <NavLink
          onClick={onLogoClick}
          to='/'
          className={`navbar__logo ${
            isSavedNewsRoute && 'navbar__logo_text-dark'
          }`}
        >
          NewsExplorer
        </NavLink>
        <div
          className={`navbar__links ${
            isHamburgerMenuOpen && 'navbar__links-mobile'
          } ${isSavedNewsRoute && 'navbar__link-mobile-white'}`}
        >
          <NavLink
            onClick={onHomeClick}
            to='/'
            className={`navbar__link navbar__link-active-home ${
              isSavedNewsRoute && 'navbar__link_text-dark'
            } ${isHamburgerMenuOpen && 'navbar__link-disabled'}`}
          >
            Home
          </NavLink>
          {loggedin && (
            <NavLink
              onClick={onSavedArticlesClick}
              to='/saved-news'
              className={`navbar__link ${
                isSavedNewsRoute &&
                'navbar__link_text-dark navbar__link-active-news '
              } ${isHamburgerMenuOpen && 'navbar__link-disabled'}`}
            >
              Saved Articles
            </NavLink>
          )}
          {!loggedin && <LoginButton />}
          {loggedin && (
            <LogoutButton
              isSavedNewsRoute={isSavedNewsRoute}
              setLoggedin={setLoggedin}
            />
          )}
        </div>
        <div
          className='hamburger'
          onClick={() => {
            setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
          }}
        >
          <div
            className={`hamburger-first ${
              isSavedNewsRoute && 'hamburger-dark'
            } ${isHamburgerMenuOpen && 'hamburger-open-first'}`}
          ></div>
          <div
            className={`hamburger-last ${
              isSavedNewsRoute && 'hamburger-dark'
            } ${isHamburgerMenuOpen && 'hamburger-open-second'}`}
          ></div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
