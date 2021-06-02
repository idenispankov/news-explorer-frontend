/* eslint-disable react-hooks/exhaustive-deps */
// import SavedCard from '../SavedCard/SavedCard';
import { useEffect } from 'react';
// import { CurrentUserContext } from '../../context/CurrentUserContext';
import SavedCard from '../SavedCard/SavedCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import Navbar from '../Navbar/Navbar';

const SavedNews = ({
  savedArticles,
  deleteArticleFromSavedNews,
  getSavedArticles,
  handleLogout,
  loggedin,
}) => {
  // const userContext = useContext(CurrentUserContext);

  useEffect(() => {
    getSavedArticles();
  }, []);
  return (
    <>
      <Navbar handleLogout={handleLogout} loggedin={loggedin} />
      <SavedNewsHeader savedArticles={savedArticles} />

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
