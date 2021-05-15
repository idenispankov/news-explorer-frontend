import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Navbar from '../Navbar/Navbar';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  return (
    <div className='app'>
      <Navbar loggedin={loggedin} setLoggedin={setLoggedin} />
      <Switch>
        {/* Signup Route */}
        <Route path='/signup'>
          <Header />
          <Register
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
            isSuccessOpen={isSuccessOpen}
            setIsSuccessOpen={setIsSuccessOpen}
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
          {!loggedin && <Redirect to='/' />}
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
