import { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';
import Preloader from '../Preloader/Preloader.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import Main from '../Main/Main.js';
import Navigation from '../Navigation/Navigation.js';

function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <div className='app'>
      <Navigation loggedin={loggedin} setLoggedin={setLoggedin} />
      <Header />
      <Main loggedin={loggedin} />
      <SavedNewsHeader />
      <NotFound />
      <About />
      <Preloader />
      <Footer />
    </div>
  );
}

export default App;
