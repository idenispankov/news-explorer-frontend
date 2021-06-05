import './Card.css';

const Card = ({
  loggedin,
  handleSigninClick,
  article,
  toggleArticle,
  isCardSaved,
}) => {
  const onCardToggle = () => {
    toggleArticle(article);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <div className='card'>
        <img className='card__image' src={article.urlToImage} alt='dog' />
        <div className='card__description'>
          <a
            className='card_redirect'
            href={article.url}
            target='_blank'
            rel='noreferrer'
          >
            <p className='card__date'>{formatDate(article.publishedAt)}</p>
            <p className='card__title'>{article.title}</p>
            <p className='card__text'>{article.description}</p>
            <p className='card__footer'>{article.source.name}</p>
          </a>
          <button
            className={`card__save-icon ${isCardSaved && 'card__saved-icon'}`}
            onClick={onCardToggle}
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
        </div>
      </div>
    </>
  );
};

export default Card;
