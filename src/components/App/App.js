import './App.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';

function App() {
  return (
    <div className='app'>
      <Header />
      <NotFound />
      <About />
      <Footer />
    </div>
  );
}

export default App;
