import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useContext } from 'react';

const SavedNewsHeader = () => {
  const userContext = useContext(CurrentUserContext);

  return (
    <>
      <section className='saved-news'>
        <p className='saved-news__text'>Saved articles</p>
        <h2 className='saved-news__heading'>
          {userContext.name}, you have 5 saved articles
        </h2>
        <p className='saved-news__footer'>
          By keywords: Nature, Yellowstone, and 2 other
        </p>
      </section>
    </>
  );
};

export default SavedNewsHeader;
