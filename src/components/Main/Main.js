import './Main.css';
import Card from '../Card/Card.js';

const Main = ({ loggedin, isArticles }) => {
  return (
    <section className='main'>
      {isArticles || <h2 className='main__title'>Search Results</h2>}
      <div className='cards__list'>
        <Card loggedin={loggedin} isArticles={isArticles} />
        <Card loggedin={loggedin} isArticles={isArticles} />
        <Card loggedin={loggedin} isArticles={isArticles} />
        <Card loggedin={loggedin} isArticles={isArticles} />
        <Card loggedin={loggedin} isArticles={isArticles} />
      </div>
      <button className='main__button'>Show more</button>
    </section>
  );
};

export default Main;
