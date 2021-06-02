import './Main.css';
import Card from '../Card/Card.js';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

const Main = ({
  loggedin,
  isLoading,
  handleSigninClick,
  searchedArticles,
  notFound,
  index,
  setIndex,
  toggleArticle,
  keyword,
  found,
}) => {
  const showMore = () => {
    setIndex(index + 1);
  };

  return (
    <>
      {isLoading && <Preloader />}

      {searchedArticles.length > 0 && (
        <section className='main'>
          <div className='main__container'>
            <h2 className='main__title'>Search Results</h2>
            <ul className='cards__list'>
              {found &&
                searchedArticles.slice(0, index * 3).map((article, i) => (
                  <li className='card' key={i}>
                    <Card
                      loggedin={loggedin}
                      handleSigninClick={handleSigninClick}
                      article={article}
                      toggleArticle={toggleArticle}
                      keyword={keyword}
                      isCardSaved={article.isCardSaved}
                    />
                  </li>
                ))}
            </ul>

            {searchedArticles.length > 0 &&
            index * 3 <= searchedArticles.length ? (
              <button className='main__button' onClick={showMore}>
                Show more
              </button>
            ) : null}
          </div>
        </section>
      )}

      {notFound && <NotFound />}
    </>
  );
};

export default Main;
