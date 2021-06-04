const SavedCard = ({ item, deleteArticleFromSavedNews }) => {
  const onDelete = () => {
    deleteArticleFromSavedNews(item._id);
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
        <img className='card__image' src={item.image} alt='dog' />
        <div className='card__description'>
          <a
            className='card_redirect'
            href={item.link}
            target='_blank'
            rel='noreferrer'
          >
            <p className='card__date'>{formatDate(item.date)}</p>
            <p className='card__title'>{item.title}</p>
            <p className='card__text'>{item.text}</p>
            <p className='card__footer'>{item.source}</p>
          </a>
          <button className={`card__delete-icon`} onClick={onDelete}></button>
          <p className='card__tooltip'>Remove from saved</p>
          <p className='card__keyword'>{item.keyword}</p>
        </div>
      </div>
    </>
  );
};

export default SavedCard;
