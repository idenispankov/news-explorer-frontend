import './Main.css';
import Card from '../Card/Card.js';

const Main = ({ loggedin, setIsPopupOpen }) => {
  return (
    <section className='main'>
      <h2 className='main__title'>Search Results</h2>
      <div className='cards__list'>
        <Card loggedin={loggedin} setIsPopupOpen={setIsPopupOpen} />
        <Card loggedin={loggedin} setIsPopupOpen={setIsPopupOpen} />
        <Card loggedin={loggedin} setIsPopupOpen={setIsPopupOpen} />
        <Card loggedin={loggedin} setIsPopupOpen={setIsPopupOpen} />
        <Card loggedin={loggedin} setIsPopupOpen={setIsPopupOpen} />
      </div>
      <button className='main__button'>Show more</button>
    </section>
  );
};

export default Main;
