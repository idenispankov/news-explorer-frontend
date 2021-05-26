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
  index,
  setIndex,
  SaveArticle,
  keyword,
}) => {
  const history = useHistory();
  const savedNewsRoute = history.location.pathname.includes('saved-news');

  const showMore = () => {
    setIndex(index + 1);
  };

  return (
    <>
      {isLoading && <Preloader />}

      {articles.length > 0 && (
        <section className='main'>
          <div className='main__container'>
            <h2 className='main__title'>Search Results</h2>
            <ul className='cards__list'>
              {articles.slice(0, index * 3).map((article, i) => (
                <li className='card' key={i}>
                  <Card
                    loggedin={loggedin}
                    savedNewsRoute={savedNewsRoute}
                    handleSigninClick={handleSigninClick}
                    article={article}
                    SaveArticle={SaveArticle}
                    keyword={keyword}
                  />
                </li>
              ))}
            </ul>

            {articles.length && index * 3 <= articles.length ? (
              <button className='main__button' onClick={showMore}>
                Show more
              </button>
            ) : null}
          </div>
        </section>
      )}

      {notFound && <NotFound />}

      {savedNewsRoute && (
        <section className='main'>
          <div className='main__container'>
            <h2 className='main__title'>Search Results</h2>
            <ul className='cards__list'>
              <li className='card'>
                <Card
                  loggedin={loggedin}
                  savedNewsRoute={savedNewsRoute}
                  handleSigninClick={handleSigninClick}
                  SaveArticle={SaveArticle}
                />
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default Main;
