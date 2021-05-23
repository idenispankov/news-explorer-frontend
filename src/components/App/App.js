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
import Navbar from '../Navbar/Navbar';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../context/CurrentUserContext';
// import Api from '../utils/api';
import * as auth from '../utils/auth';

// handleRegister

// handleLogin

// handleLogOut

// handleRegisterPopup

// handleLoginPopup

// SuccessTooltip

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const [isSearchHappened, setIsSearchHappened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [registered, setIsregestered] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    _id: '',
    email: '',
    name: '',
  });

  // Close Popups
  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
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

  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////

  const handleSigninClick = () => {
    setIsLoginPopupOpen(true);
    setEventListener(true);
  };

  const handleRegister = (email, password, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res.email) {
          setIsregestered(true);
          // setIsPopupOpen(false);
          // setIsSuccessOpen(true);
          history.push('/signin');
        } else if (!res.email) {
          setIsregestered(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (email, password) => {
    auth
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
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedin(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////
  //////////////////////////// AUTHENTICATION ////////////////////////////////////////////////////////

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
        handleLogin={handleLogin}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
