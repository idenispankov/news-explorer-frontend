import './Card.css';
import card from '../../images/card.png';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const Card = ({ loggedin, setIsPopupOpen }) => {
  const history = useHistory();
  const savedNewsRoute = history.location.pathname.includes('saved-news');

  const [isCardSaved, setIsCardSaved] = useState(false);

  const onCardSave = () => {
    if (loggedin) {
      setIsCardSaved(!isCardSaved);
    }
  };

  const onTrySave = () => {
    history.push('/signin');
    setIsPopupOpen(true);
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
          className={`card__save ${isCardSaved && 'card__saved'} ${
            savedNewsRoute && 'card__delete'
          }`}
          onClick={onCardSave}
        ></button>
        {/* {isArticles && <p className='card__keyword'>Nature</p>} */}
        {!loggedin ? (
          <p className='card__signin' onClick={onTrySave}>
            Sign in to save articles
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Card;
