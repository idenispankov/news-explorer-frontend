import './Navigation.css';
import { useState } from 'react';
import logoutDark from '../../images/logout-dark.svg';
import logoutLight from '../../images/logout-light.png';
import { NavLink } from 'react-router-dom';

const Navigation = ({ loggedin, setLoggedin, isArticles, setIsArticles }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onLogout = () => {
    setIsArticles(false);
    setLoggedin(false);
  };

  const onSavedArticles = () => {
    setIsArticles(true);
    setIsMobileMenuOpen(false);
  };

  const onHamburger = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsArticles(false);
  };

  return (
    <nav
      className={`navbar ${isArticles && 'navbar_type_light'} ${
        isMobileMenuOpen && 'navbar-open'
      }`}
    >
      <NavLink
        onClick={() => setIsArticles(false)}
        to='/'
        className={`navbar__logo ${isArticles && `navbar__logo_type_light`} `}
      >
        NewsExplorer
      </NavLink>
      <div
        className={`navbar__links ${isMobileMenuOpen && 'navbar__links-open'}`}
      >
        <NavLink
          onClick={() => setIsArticles(false)}
          to='/'
          className={`navbar__link navbar__link-active ${
            isArticles && 'navbar__link_type_light navbar__link-inactive'
          }`}
        >
          Home
        </NavLink>
        {loggedin ? (
          <>
            <NavLink
              to='/saved-news'
              onClick={onSavedArticles}
              className={`navbar__link ${
                isArticles &&
                'navbar__link_type_light navbar__link-active_type_light'
              }`}
            >
              Saved Articles
            </NavLink>
            <NavLink
              to='/'
              onClick={onLogout}
              className={`navbar__link navbar__link-signin ${
                isArticles && 'navbar__link-signin_type_light'
              }`}
            >
              Elise
              <img
                className='logout__icon logout__icon_type_light'
                src={!isArticles ? logoutLight : logoutDark}
                alt='logout icon'
              ></img>
            </NavLink>
          </>
        ) : (
          <NavLink
            to='/'
            onClick={() => setLoggedin(true)}
            className={`navbar__link navbar__link-signin ${
              isArticles && 'navbar__link-signin_type_light'
            }`}
          >
            Sign in
          </NavLink>
        )}
      </div>
      <div className='hamburger' onClick={onHamburger}>
        <div
          className={`hamburger__line-first ${
            isMobileMenuOpen && 'open-first'
          } ${isArticles && 'hamburger__line-first_type_light'}`}
        ></div>
        <div
          className={`hamburger__line-second ${
            isMobileMenuOpen && 'open-second'
          } ${isArticles && 'hamburger__line-second_type_light'}`}
        ></div>
      </div>
    </nav>
  );
};

export default Navigation;
