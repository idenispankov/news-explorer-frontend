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
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

function App(props) {
  const [loggedin, setLoggedin] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const history = useHistory();

  return (
    <CurrentUserContext.Provider>
      <div className='app'>
        <nav className='navbar'></nav>
        <Switch>
          {/* Signup Route */}
          <Route path='/signup'>
            <Header />
            <Register
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
            />
          </Route>

          {/* Signin Route */}
          <Route path='/signin'>
            <Header />
            <Login
              loggedin={loggedin}
              setLoggedin={setLoggedin}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
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
        <Main setIsPopupOpen={setIsPopupOpen} />
        <About />
        <Preloader />
        <NotFound />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
