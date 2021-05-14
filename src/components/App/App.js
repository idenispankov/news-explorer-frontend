import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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

  return (
    <div className='app'>
      <nav className='navbar'></nav>
      <Switch>
        {/* Signup Route */}
        <Route path='/signup'>
          <Header />
          <Register isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
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
      <Main setIsPopupOpen={setIsPopupOpen} loggedin={loggedin} />
      <About />
      <Preloader />
      <NotFound />
      <Footer />
    </div>
  );
}

export default App;
