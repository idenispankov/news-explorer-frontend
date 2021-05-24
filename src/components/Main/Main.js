import './Main.css';
import Card from '../Card/Card.js';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { useHistory } from 'react-router-dom';

const Main = ({
  loggedin,
  isSearchHappened,
  isLoading,
  handleSigninClick,
  articles,
}) => {
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
              {articles.map((article, i) => (
                <li className='card' key={i}>
                  <Card
                    loggedin={loggedin}
                    savedNewsRoute={savedNewsRoute}
                    handleSigninClick={handleSigninClick}
                    article={article}
                  />
                </li>
              ))}

              {/* <li className='card'>
                <Card loggedin={loggedin} savedNewsRoute={savedNewsRoute} />
              </li>
              <li className='card'>
                <Card loggedin={loggedin} savedNewsRoute={savedNewsRoute} />
              </li>
              <li className='card'>
                <Card loggedin={loggedin} savedNewsRoute={savedNewsRoute} />
              </li>
              <li className='card'>
                <Card loggedin={loggedin} savedNewsRoute={savedNewsRoute} />
              </li> */}
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
