import './NotFound.css';
import notFoundImage from '../../images/not-found.svg';

const NotFound = () => {
  return (
    <section className='nothingfound'>
      <img
        className='nothingfound__image'
        src={notFoundImage}
        alt='nothing found icon'
      />
      <h2 className='nothingfound__title'>Nothing Found</h2>
      <p className='nothingfound__text'>
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
};

export default NotFound;
