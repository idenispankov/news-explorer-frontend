import './Navbar.css';
import { useState } from 'react';
import { useHistory, NavLink, withRouter } from 'react-router-dom';

const Navbar = ({ loggedin }) => {
  const history = useHistory();
  const isSavedNewsRoute = history.location.pathname.includes('saved-news');

  return (
    <nav className={`navbar ${isSavedNewsRoute && 'navbar_type_white'}`}>
      <NavLink
        to='/'
        className={`navbar__logo ${
          isSavedNewsRoute && 'navbar__logo_text-dark'
        }`}
      >
        NewsExplorer
      </NavLink>
      <div className='navbar__links'>
        <NavLink
          to='/'
          className={`navbar__link navbar__link-active-home ${
            isSavedNewsRoute && 'navbar__link_text-dark'
          }`}
        >
          Home
        </NavLink>
        <NavLink
          to='/saved-news'
          className={`navbar__link ${
            isSavedNewsRoute &&
            'navbar__link_text-dark navbar__link-active-news '
          }`}
        >
          SavedArticles
        </NavLink>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
