import './LoginButton.css';
import { NavLink } from 'react-router-dom';

const LoginButton = () => {
  return (
    <button className={`navbar__button`}>
      <NavLink to='/signin' className='navbar__button-signin'>
        Sign in
      </NavLink>
    </button>
  );
};

export default LoginButton;
