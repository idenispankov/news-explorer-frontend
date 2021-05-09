import './Main.css';
import Card from '../Card/Card.js';

const Main = () => {
  return (
    <section className='main'>
      <h2 className='main__title'>Search Results</h2>
      <div className='cards__list'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <button className='main__button'>Show more</button>
    </section>
  );
};

export default Main;
