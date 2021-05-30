/* eslint-disable react-hooks/exhaustive-deps */
// import SavedCard from '../SavedCard/SavedCard';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import SavedCard from '../SavedCard/SavedCard';

const SavedNews = ({
  savedArticles,
  deleteArticleFromSavedNews,
  getSavedArticles,
}) => {
  const userContext = useContext(CurrentUserContext);

  useEffect(() => {
    getSavedArticles();
  }, []);
  return (
    <>
      <section className='saved-news'>
        <p className='saved-news__text'>Saved articles</p>
        <h2 className='saved-news__heading'>
          {userContext.name}, you have {savedArticles.length} saved articles
        </h2>
        <p className='saved-news__footer'>
          By keywords: {savedArticles.map((item) => item.keyword + ', ')} and 2
          other
        </p>
      </section>

      {savedArticles.length > 0 && (
        <section className='main'>
          <div className='main__container main__container_type-saved-news'>
            <ul className='cards__list'>
              {savedArticles.map((item) => {
                return (
                  <li className='card' key={item._id}>
                    <SavedCard
                      item={item}
                      deleteArticleFromSavedNews={deleteArticleFromSavedNews}
                    />
                    ;
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default SavedNews;

// Temporary solution for keywords implemented
