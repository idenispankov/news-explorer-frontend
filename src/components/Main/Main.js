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
          <h2 className='main__title'>Search Results</h2>
          <div className='cards__list'>
            <Card
              loggedin={loggedin}
              setIsPopupOpen={setIsPopupOpen}
              savedNewsRoute={savedNewsRoute}
            />
            <Card
              loggedin={loggedin}
              setIsPopupOpen={setIsPopupOpen}
              savedNewsRoute={savedNewsRoute}
            />
            <Card
              loggedin={loggedin}
              setIsPopupOpen={setIsPopupOpen}
              savedNewsRoute={savedNewsRoute}
            />
            <Card
              loggedin={loggedin}
              setIsPopupOpen={setIsPopupOpen}
              savedNewsRoute={savedNewsRoute}
            />
            <Card
              loggedin={loggedin}
              setIsPopupOpen={setIsPopupOpen}
              savedNewsRoute={savedNewsRoute}
            />
          </div>
          {savedNewsRoute ? null : (
            <button className='main__button'>Show more</button>
          )}
          {isSearchHappened && <NotFound />}
        </section>
      ) : null}
    </>
  );
};

export default Main;
