import './App.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';
import Preloader from '../Preloader/Preloader.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';

function App() {
  return (
    <div className='app'>
      <Header />
      <SavedNewsHeader />
      <NotFound />
      <About />
      <Preloader />
      <Footer />
    </div>
  );
}

export default App;
