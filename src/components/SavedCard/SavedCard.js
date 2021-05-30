const SavedCard = ({ item, loggedin }) => {
  return (
    <div className='card'>
      <img className='card__image' src={item.image} alt='dog' />
      <div className='card__description'>
        <p className='card__date'>{item.date}</p>
        <p className='card__title'>{item.title}</p>
        <p className='card__text'>{item.text}</p>
        <p className='card__footer'>{item.source}</p>
        <button
          className={`card__delete-icon`}

          // onClick={onCardSave}
        ></button>
        <p className='card__tooltip'>Remove from saved</p>
        <p className='card__keyword'>{item.keyword}</p>
        {/* {!loggedin && (
      <>
        <button
          className='card__save-icon'
          onClick={handleSigninClick}
        ></button>
        <p className='card__tooltip'>Sign in to save articles</p>
      </>
    )} */}
        {/* {loggedin && savedNewsRoute && (
      <>
        <button className='card__delete-icon'></button>
        <p className='card__tooltip'>Remove from saved</p>
      </>
    )} */}
        {/* {savedNewsRoute && (
      <p className='card__keyword'>{savedArticles.keyword}</p>
    )} */}
      </div>
    </div>
  );
};

// keyword: keyword,
//       title: article.title,
//       text: article.description,
//       date: article.publishedAt,
//       source: article.source.name,
//       link: article.url,
//       image: article.urlToImage,
//       owner: currentUser._id,

export default SavedCard;
