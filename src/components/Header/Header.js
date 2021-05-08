import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <h1 className='header__title'>What's going on in the world?</h1>
        <p className='header__subtitle'>
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className='search'>
          <input
            type='text'
            className='search__input'
            placeholder='Enter topic'
          />
          <button className='search__button'>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
