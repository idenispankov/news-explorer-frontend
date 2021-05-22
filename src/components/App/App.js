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
import Api from '../utils/api';
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

  const api = new Api({
    baseUrl: 'https://cryptic-ridge-14112.herokuapp.com',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  const [loggedin, setLoggedin] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [isSearchHappened, setIsSearchHappened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [registered, setIsregestered] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    _id: '',
    email: '',
    name: '',
  });

  const handleRegister = (email, password, name) => {
    auth
      .register(email, password, name)
      .then((res) => {
        console.log(res, 'res!');
        if (res.email) {
          setIsregestered(true);
          history.push('/signin');
        } else if (!res.email) {
          setIsregestered(false);
          history.push('/signup');
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
          history.push('/');
        } else if (!data.email) {
          setLoggedin(false);
          history.push('/signin');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setToken('');
    setLoggedin(false);
  };

  /////////////////////////////////////////////// POPUP /////////////////////////////////////////////////

  // Close Popup Outside
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
      setIsPopupOpen(false);
      history.push('/');
    }
  };

  const closeOutSide = (e) => {
    if (e.target.classList.contains('modal')) {
      setIsPopupOpen(false);
      history.push('/');
    }
  };

  // UseEffect for Popup
  useEffect(() => {
    if (isPopupOpen) {
      setEventListener(true);
    }
  }, [isPopupOpen]);
  /////////////////////////////////////////////// POPUP /////////////////////////////////////////////////

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Navbar
          loggedin={loggedin}
          setLoggedin={setLoggedin}
          isPopupOpen={isPopupOpen}
          handleLogout={handleLogout}
        />
        <Switch>
          {/* Sign In Route */}
          <Route path='/signin'>
            <Header />
            <NotFound />
            <About />
            <Login
              loggedin={loggedin}
              setLoggedin={setLoggedin}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              handleLogin={handleLogin}
            />
          </Route>

          {/* Sign Up Route */}
          <Route path='/signup'>
            <Header />
            <NotFound />
            <About />
            <Register
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              isSuccessOpen={isSuccessOpen}
              setIsSuccessOpen={setIsSuccessOpen}
              handleRegister={handleRegister}
            />
          </Route>

          {/* SavedNews Route */}
          <Route path='/saved-news'>
            {!loggedin && <Redirect to='/' />}
            <SavedNewsHeader />
            <Main setIsPopupOpen={setIsPopupOpen} loggedin={loggedin} />
          </Route>

          {/* Home Route */}
          <Route path='/'>
            <Header
              setIsSearchHappened={setIsSearchHappened}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <Main
              setIsPopupOpen={setIsPopupOpen}
              loggedin={loggedin}
              isSearchHappened={isSearchHappened}
              isLoading={isLoading}
            />
            <About />
          </Route>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
