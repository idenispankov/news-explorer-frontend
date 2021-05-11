import './Main.css';
import Card from '../Card/Card.js';

const Main = ({ loggedin }) => {
  return (
    <section className='main'>
      <h2 className='main__title'>Search Results</h2>
      <div className='cards__list'>
        <Card loggedin={loggedin} />
        <Card loggedin={loggedin} />
        <Card loggedin={loggedin} />
        <Card loggedin={loggedin} />
        <Card loggedin={loggedin} />
      </div>
      <button className='main__button'>Show more</button>
    </section>
  );
};

export default Main;
