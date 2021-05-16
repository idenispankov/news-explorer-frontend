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

function App() {
  const history = useHistory();

  const [loggedin, setLoggedin] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSearchHappened, setIsSearchHappened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className='app'>
      <Navbar
        loggedin={loggedin}
        setLoggedin={setLoggedin}
        isPopupOpen={isPopupOpen}
      />
      <Switch>
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
          />
        </Route>

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
    </div>
  );
}

export default App;
