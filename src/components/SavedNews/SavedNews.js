// import SavedCard from '../SavedCard/SavedCard';
import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import SavedCard from '../SavedCard/SavedCard';

const SavedNews = ({ savedArticles, loggedin }) => {
  const userContext = useContext(CurrentUserContext);
  return (
    <>
      <section className='saved-news'>
        <p className='saved-news__text'>Saved articles</p>
        <h2 className='saved-news__heading'>
          {userContext.name}, you have 0 saved articles
        </h2>
        <p className='saved-news__footer'>By keywords: some and 2 other</p>
      </section>

      <section className='main'>
        <div className='main__container main__container_type-saved-news'>
          <ul className='cards__list'>
            {savedArticles.map((item) => {
              return (
                <li className='card' key={item._id}>
                  <SavedCard item={item} />;
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default SavedNews;
