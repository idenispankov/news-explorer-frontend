import './Header.css';
import SearchForm from '../SearchForm/SearchForm';

const Header = ({ searchForArticles, searchInput, setSearchInput }) => {
  return (
    <>
      <header className='header'>
        <div className='header__container'>
          <h1 className='header__title'>What's going on in the world?</h1>
          <p className='header__subtitle'>
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm
            searchForArticles={searchForArticles}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
