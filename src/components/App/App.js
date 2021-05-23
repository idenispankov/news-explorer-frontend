/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Tooltip from '../Tooltip/Tooltip';
import Navbar from '../Navbar/Navbar';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../context/CurrentUserContext';
// import Api from '../utils/api';
import * as mainApi from '../utils/MainApi';

function App() {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  // const api = new Api({
  //   baseUrl: 'https://cryptic-ridge-14112.herokuapp.com',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     authorization: `Bearer ${token}`,
  //   },
  // });

  const [loggedin, setLoggedin] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSearchHappened, setIsSearchHappened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    _id: '',
    email: '',
    name: '',
  });

  //////////////////////////////// POPUPS
  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsTooltipOpen(false);
    setEventListener(false);
  };

  const setEventListener = (listen) => {
    listen
      ? document.addEventListener('keyup', closeOnEsc)
      : document.removeEventListener('keyup', closeOnEsc);
    listen
      ? document.addEventListener('click', closeOutSide)
      : document.removeEventListener('click', closeOutSide);
  };

  const closeOnEsc = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  };

  const closeOutSide = (e) => {
    if (e.target.classList.contains('modal')) {
      closeAllPopups();
    }
  };

  //////////////////////////// AUTHENTICATION

  const handleSigninClick = () => {
    setIsLoginPopupOpen(true);
    setEventListener(true);
  };

  const handleRegister = (email, password, name) => {
    mainApi
      .register(email, password, name)
      .then((res) => {
        if (res.email) {
          setIsRegisterPopupOpen(false);
          setIsTooltipOpen(true);
        } else if (!res.email) {
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (email, password) => {
    mainApi
      .login(email, password)
      .then((data) => {
        if (data.email) {
          setLoggedin(true);
          setToken(localStorage.getItem('jwt'));
          setIsLoginPopupOpen(false);
        } else if (!data.email) {
          setLoggedin(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setToken('');
    setLoggedin(false);
  };

  useEffect(() => {
    if (token) {
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedin(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Navbar
              loggedin={loggedin}
              handleLogout={handleLogout}
              onSigninClick={handleSigninClick}
            />
            <Header
              setIsSearchHappened={setIsSearchHappened}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <Main
              loggedin={loggedin}
              isSearchHappened={isSearchHappened}
              isLoading={isLoading}
              handleSigninClick={handleSigninClick}
            />
            <About />
          </Route>
          <Route path='/saved-news'>
            <Navbar loggedin={loggedin} handleLogout={handleLogout} />
            <SavedNewsHeader />
            <Main loggedin={loggedin} />
          </Route>
        </Switch>
        <Footer />
      </div>
      <Login
        isPopupOpen={isLoginPopupOpen}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        setIsRegisterPopupOpen={setIsRegisterPopupOpen}
        handleLogin={handleLogin}
        onClose={closeAllPopups}
      />
      <Register
        isPopupOpen={isRegisterPopupOpen}
        onClose={closeAllPopups}
        setIsRegisterPopupOpen={setIsRegisterPopupOpen}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        handleRegister={handleRegister}
      />
      <Tooltip
        isPopupOpen={isTooltipOpen}
        onClose={closeAllPopups}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        setIsTooltipOpen={setIsTooltipOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

// Register - Done
// Login - Done
// Tooltip - Done
// Keywords - ?
// Search - ?
// Cards - ?
// Save Cards to saved-news - ?
// Remove Cards from saved-news
