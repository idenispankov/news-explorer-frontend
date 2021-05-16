import './Footer.css';
import { NavLink, Link } from 'react-router-dom';
import gitHubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__text'>© 2021 Supersite, Powered by News API</p>
      <div className='footer__group'>
        <ul className='footer__list_type_links'>
          <li className='footer__list-item_type_link'>
            <NavLink className='footer__link' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <a
              href='https://practicum.yandex.com'
              alt='link to Practicum by Yandex'
              rel='noreferrer'
              target='_blank'
              className='footer__link'
            >
              Practicum by Yandex
            </a>
          </li>
        </ul>
        <ul className='footer__list_type_icons'>
          <li className='footer__list-item_type_icon'>
            <a
              href='https://github.com/idenispankov'
              alt='link to GitHub'
              rel='noreferrer'
              target='_blank'
              className='footer__icon'
            >
              <img
                className='footer__icon-img'
                src={gitHubIcon}
                alt='GitHub icon'
              />
            </a>
          </li>
          <li>
            <a
              href='https://www.facebook.com/progiratel'
              alt='link to Facebook'
              rel='noreferrer'
              target='_blank'
              className='footer__icon'
            >
              <img
                className='footer__icon-img'
                src={facebookIcon}
                alt='Facebook icon'
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
