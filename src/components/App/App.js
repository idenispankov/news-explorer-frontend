import { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';
import Preloader from '../Preloader/Preloader.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import Main from '../Main/Main.js';
import Navigation from '../Navigation/Navigation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [isArticles, setIsArticles] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div className='app'>
      <Navigation
        loggedin={loggedin}
        setLoggedin={setLoggedin}
        isArticles={isArticles}
        setIsArticles={setIsArticles}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
      <Route exact path='/' component={Header} />
      <Route path='/saved-news' component={SavedNewsHeader} />
      <Main loggedin={loggedin} isArticles={isArticles} />
      <NotFound />
      <About />
      <Preloader />
      <Footer />
      <PopupWithForm
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        setLoggedin={setLoggedin}
      />
    </div>
  );
}

export default App;
