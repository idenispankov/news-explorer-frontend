import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
// import NotFound from '../NotFound/NotFound';
// import Preloader from '../Preloader/Preloader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Navbar from '../Navbar/Navbar';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSearchHappened, setIsSearchHappened] = useState(false);

  return (
    <div className='app'>
      <Navbar loggedin={loggedin} setLoggedin={setLoggedin} />
      <Switch>
        {/* Sign Up Route */}
        <Route path='/signup'>
          <Header />
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
            isSearchHappened={isSearchHappened}
            setIsSearchHappened={setIsSearchHappened}
          />
          <Main
            setIsPopupOpen={setIsPopupOpen}
            loggedin={loggedin}
            isSearchHappened={isSearchHappened}
          />
          <About />
        </Route>
      </Switch>

      {/* All Routes Components */}

      {/* <Preloader />
      <NotFound /> */}
      <Footer />
    </div>
  );
}

export default App;
