import './Card.css';
import { useState } from 'react';

const Card = ({
  loggedin,
  savedNewsRoute,
  handleSigninClick,
  article,
  saveArticle,
  keyword,
  // isCardSaved,
}) => {
  const [isCardSaved, setIsCardSaved] = useState(false);

  const onCardSave = () => {
    saveArticle(article);
    setIsCardSaved(!isCardSaved);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='card'>
      <img className='card__image' src={article.urlToImage} alt='dog' />
      <div className='card__description'>
        <p className='card__date'>{formatDate(article.publishedAt)}</p>
        <p className='card__title'>{article.title}</p>
        <p className='card__text'>{article.description}</p>
        <p className='card__footer'>{article.source.name}</p>
        <button
          className={`card__save-icon ${isCardSaved && 'card__saved-icon'}`}
          onClick={onCardSave}
        ></button>
        {!loggedin && (
          <>
            <button
              className='card__save-icon'
              onClick={handleSigninClick}
            ></button>
            <p className='card__tooltip'>Sign in to save articles</p>
          </>
        )}
        {loggedin && savedNewsRoute && (
          <>
            <button className='card__delete-icon'></button>
            <p className='card__tooltip'>Remove from saved</p>
          </>
        )}
        {/* {savedNewsRoute && <p className='card__keyword'>{keyword}</p>} */}
      </div>
    </div>
  );
};

export default Card;
