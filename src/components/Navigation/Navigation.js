import './Navigation.css';
import logoutDark from '../../images/logout-dark.svg';
import logoutLight from '../../images/logout-light.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ loggedin, setLoggedin }) => {
  const [active, setActive] = useState(false);
  return (
    <nav className={`navbar ${active && 'navbar__light'}`}>
      <NavLink
        onClick={() => setActive(false)}
        to='/'
        className={`navbar__logo ${active && `navbar__logo_type_light`} `}
      >
        NewsExplorer
      </NavLink>
      <div className='navbar__links'>
        <NavLink
          onClick={() => setActive(false)}
          to='/'
          className={`navbar__link navbar__link-active ${
            active && 'navbar__link_type_light'
          }`}
        >
          Home
        </NavLink>
        {loggedin ? (
          <>
            <NavLink
              onClick={() => setActive(true)}
              to='/saved-news'
              className={`navbar__link ${
                active &&
                'navbar__link_type_light navbar__link-active_type_light'
              }`}
            >
              Saved Artciles
            </NavLink>
            <NavLink
              onClick={() => setLoggedin(false)}
              to='signin'
              className={`navbar__link navbar__link-signin ${
                active && 'navbar__link-signin_type_light'
              }`}
            >
              Elise
              <img
                className='logout__icon logout__icon_type_light'
                src={!active ? logoutLight : logoutDark}
                alt='logout icon'
              ></img>
            </NavLink>
          </>
        ) : (
          <NavLink
            onClick={() => setLoggedin(true)}
            to='signin'
            className={`navbar__link navbar__link-signin ${
              active && 'navbar__link-signin_type_light'
            }`}
          >
            Sign in
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
