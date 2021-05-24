import './Card.css';
import card from '../../images/card.png';
import { useState } from 'react';

const Card = ({ loggedin, savedNewsRoute, handleSigninClick, article }) => {
  const [isCardSaved, setIsCardSaved] = useState(false);

  const onCardSave = () => {
    setIsCardSaved(!isCardSaved);
  };

  return (
    <div className='card'>
      <img className='card__image' src={card} alt='dog' />
      <div className='card__description'>
        <p className='card__date'>date</p>
        <p className='card__title'>title</p>
        <p className='card__text'>description</p>
        <p className='card__footer'>source</p>
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
            <button className='card__delete-icon' onClick={onCardSave}></button>
            <p className='card__tooltip'>Remove from saved</p>
          </>
        )}
        {savedNewsRoute && <p className='card__keyword'>Any</p>}
      </div>
    </div>
  );
};

export default Card;
