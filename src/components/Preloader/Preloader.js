import './Preloader.css';

function PreLoader() {
  return (
    <section className='preloader'>
      <i className='preloader__spinner' />
      <p className='preloader__text'>Searching for news...</p>
    </section>
  );
}

export default PreLoader;
