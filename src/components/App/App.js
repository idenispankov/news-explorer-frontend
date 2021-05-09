import './App.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';
import Preloader from '../Preloader/Preloader.js';

function App() {
  return (
    <div className='app'>
      <Header />
      <NotFound />
      <About />
      <Preloader />
      <Footer />
    </div>
  );
}

export default App;
