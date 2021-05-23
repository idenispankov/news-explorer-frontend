import './Card.css';
import card from '../../images/card.png';
import { useState } from 'react';

const Card = ({ loggedin, savedNewsRoute, handleSigninClick }) => {
  const [isCardSaved, setIsCardSaved] = useState(false);

  const onCardSave = () => {
    setIsCardSaved(!isCardSaved);
  };

  return (
    <div className='card'>
      <img className='card__image' src={card} alt='dog' />
      <div className='card__description'>
        <p className='card__date'>November 4, 2020</p>
        <p className='card__title'>
          Everyone Needs a Special 'Sit Spot' in Nature
        </p>
        <p className='card__text'>
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me.
          This advice, which Louv attributes to nature educator Jon Young, is
          for both adults and children to find...
        </p>
        <p className='card__footer'>treehugger</p>
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
        {savedNewsRoute && <p className='card__keyword'>Nature</p>}
      </div>
    </div>
  );
};

export default Card;
