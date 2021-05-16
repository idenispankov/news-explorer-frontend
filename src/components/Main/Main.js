import './Main.css';
import Card from '../Card/Card.js';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { useHistory } from 'react-router-dom';

const Main = ({ loggedin, setIsPopupOpen, isSearchHappened, isLoading }) => {
  const history = useHistory();
  const savedNewsRoute = history.location.pathname.includes('saved-news');

  return (
    <>
      {isLoading && <Preloader />}

      {isSearchHappened || savedNewsRoute ? (
        <section className='main'>
          <div className='main__container'>
            <h2 className='main__title'>Search Results</h2>
            <ul className='cards__list'>
              <li className='card'>
                <Card
                  loggedin={loggedin}
                  setIsPopupOpen={setIsPopupOpen}
                  savedNewsRoute={savedNewsRoute}
                />
              </li>
              <li className='card'>
                <Card
                  loggedin={loggedin}
                  setIsPopupOpen={setIsPopupOpen}
                  savedNewsRoute={savedNewsRoute}
                />
              </li>
              <li className='card'>
                <Card
                  loggedin={loggedin}
                  setIsPopupOpen={setIsPopupOpen}
                  savedNewsRoute={savedNewsRoute}
                />
              </li>
              <li className='card'>
                <Card
                  loggedin={loggedin}
                  setIsPopupOpen={setIsPopupOpen}
                  savedNewsRoute={savedNewsRoute}
                />
              </li>
              <li className='card'>
                <Card
                  loggedin={loggedin}
                  setIsPopupOpen={setIsPopupOpen}
                  savedNewsRoute={savedNewsRoute}
                />
              </li>
            </ul>
            {savedNewsRoute ? null : (
              <button className='main__button'>Show more</button>
            )}
            {isSearchHappened && <NotFound />}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Main;
