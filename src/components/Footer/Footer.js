import './Footer.css';
import { NavLink } from 'react-router-dom';
import gitHubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__text'>© 2021 Supersite, Powered by News API</p>
      <div className='footer__group'>
        <div className='footer__links'>
          <NavLink className='footer__link' to='/'>
            Home
          </NavLink>
          <a
            href='https://practicum.yandex.com'
            alt='link to Practicum by Yandex'
            rel='noreferrer'
            target='_blank'
            className='footer__link'
          >
            Practicum by Yandex
          </a>
        </div>
        <div className='footer__icons'>
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
          <a
            href='https://www.linkedin.com/in/denis-pankov-46a4a91b9'
            alt='link to LinkedIn'
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
