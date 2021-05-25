import './Main.css';
import Card from '../Card/Card.js';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import { useHistory } from 'react-router-dom';

const Main = ({
  loggedin,
  isLoading,
  handleSigninClick,
  articles,
  notFound,
}) => {
  const history = useHistory();
  const savedNewsRoute = history.location.pathname.includes('saved-news');

  return (
    <>
      {isLoading && <Preloader />}

      {articles.length > 0 && (
        <section className='main'>
          <div className='main__container'>
            <h2 className='main__title'>Search Results</h2>
            <ul className='cards__list'>
              {articles.slice(0, 3).map((article) => (
                <li className='card' key={article.url}>
                  <Card
                    loggedin={loggedin}
                    savedNewsRoute={savedNewsRoute}
                    handleSigninClick={handleSigninClick}
                    article={article}
                  />
                </li>
              ))}
            </ul>

            <button className='main__button'>Show more</button>
          </div>
        </section>
      )}
      {notFound && <NotFound />}
    </>
  );
};

export default Main;
