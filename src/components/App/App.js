import { useState } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import './App.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';
import Preloader from '../Preloader/Preloader.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import Main from '../Main/Main.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Login from '../Login/Login.js';

function App(props) {
  const [loggedin, setLoggedin] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider>
      <div className='app'>
        <nav className='navbar'></nav>
        <Switch>
          {/* Signup Route */}
          <Route path='/signup'>
            <Header />
            {/* Register Component with handleRegister and HandleToolTip */}
          </Route>

          {/* Signin Route */}
          <Route path='/signin'>
            {loggedin && <Redirect to='/' />}
            <Header />
            <Login
              setLoggedin={setLoggedin}
              setIsPopupOpen={setIsPopupOpen}
              onClose={closePopup}
              isPopupOpen={isPopupOpen}
            />
          </Route>

          {/* SavedNews Route */}
          <Route path='/saved-news'>
            <SavedNewsHeader />
          </Route>

          {/* Home Route */}
          <Route path='/'>
            <Header />
          </Route>
        </Switch>

        {/* All Routes Components */}
        <Main />
        <About />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
