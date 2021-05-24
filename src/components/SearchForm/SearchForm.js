import './SearchForm.css';
import { useState } from 'react';

const SearchForm = ({
  setIsSearchHappened,
  setIsLoading,
  searchForArticles,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchInput === '') {
      console.log('empty search');
      setSearchInput('');
      return;
    }
    setSearchInput('');
    searchForArticles(searchInput);
    setIsSearchHappened(true);
    // setTimeout(() => {
    //   setIsSearchHappened(true);
    // }, 1000);
    // setTimeout(() => {
    //   setIsLoading(true);
    // }, 0);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);
  };

  return (
    <form className='search' onSubmit={onSubmit}>
      <input
        className='search__input'
        type='text'
        name='search'
        placeholder='Enter topic'
        value={searchInput}
        onChange={handleChange}
      />
      <button className='search__button'>Search</button>
    </form>
  );
};

export default SearchForm;
