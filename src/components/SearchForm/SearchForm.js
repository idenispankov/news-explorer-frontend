import './SearchForm.css';
import { useState } from 'react';

const SearchForm = (props) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = () => {
    setSearchInput('');
  };

  return (
    <div className='search'>
      <input
        className='search__input'
        type='text'
        name='search'
        placeholder='Enter topic'
        value={searchInput}
        onChange={handleChange}
      />
      <button className='search__button' onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;
