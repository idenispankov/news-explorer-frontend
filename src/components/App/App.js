/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Tooltip from '../Tooltip/Tooltip';
import Navbar from '../Navbar/Navbar';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import * as auth from '../utils/auth';
import NewsApi from '../utils/NewsApi';
// import MainApi from '../utils/MainApi';

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  // const mainApi = new MainApi({
  //   baseUrl:
  //     'https://newsapi.org/v2/everything?q=tesla&from=2021-05-24&sortBy=popularity&apiKey=eab01bb5989c40c7bd3efb7728a944be',
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

  // const [notFound, setNotFound] = useState(false);
  const [articles, setArticles] = useState([]);
  // const [savedArticles, setSavedArticles] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  // const [savedKeyWord, setSavedKeyWord] = '';

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
    auth
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
            setCurrentUser(res);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  // ARTICLES SEARCHING
  const searchForArticles = (keyWord) => {
    setIsLoading(true);
    NewsApi.getArticles(keyWord)
      .then((res) => {
        if (res) {
          console.log('RES', res);
          setIsLoading(false);
          setArticles(res.articles);
        }
      })
      .catch((err) => console.log(err));
  };

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
              searchForArticles={searchForArticles}
            />
            <Main
              loggedin={loggedin}
              isSearchHappened={isSearchHappened}
              isLoading={isLoading}
              handleSigninClick={handleSigninClick}
              articles={articles}
            />
            <About />
          </Route>

          <ProtectedRoute exact path='/saved-news' loggedin={loggedin}>
            <Navbar loggedin={loggedin} handleLogout={handleLogout} />
            <SavedNewsHeader />
            <Main loggedin={loggedin} />
          </ProtectedRoute>

          <Route>
            <Redirect to='/' />
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
// Protected Route - ? - need help
// Keywords - ?
// Search - ?
// Cards - ?
// Save Cards to saved-news - ?
// Remove Cards from saved-news - ?
