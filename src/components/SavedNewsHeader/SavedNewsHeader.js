import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useContext } from 'react';

const SavedNewsHeader = ({ savedArticles }) => {
  const userContext = useContext(CurrentUserContext);

  const countKeywords = (cards) => {
    return cards
      .map((card) => card.keyword)
      .reduce((tally, word) => {
        tally[word] = (tally[word] || 0) + 1;
        return tally;
      }, {});
  };

  const sortKeywords = (num) => {
    return Object.entries(num).sort((a, b) => b[1] - a[1]);
  };

  const createDesc = (keywords) => {
    switch (keywords.length) {
      case 0:
        return 'n/a';
      case 1:
      case 2:
      case 3:
        return keywords
          .splice(1)
          .reduce(
            (accumulator, currentValue) => accumulator + ', ' + currentValue[0],
            keywords[0][0]
          );
      default:
        return `${keywords[0][0]}, ${keywords[1][0]}, and ${
          keywords.length - 2
        } other`;
    }
  };

  const sortedKeywords = sortKeywords(countKeywords(savedArticles));

  return (
    <>
      <section className='saved-news'>
        <p className='saved-news__text'>Saved articles</p>
        <h2 className='saved-news__heading'>
          {userContext.name}, you have {savedArticles.length} saved articles
        </h2>
        <p className='saved-news__footer'>
          By keywords: {createDesc(sortedKeywords)}
        </p>
      </section>
    </>
  );
};

export default SavedNewsHeader;
