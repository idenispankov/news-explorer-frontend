import './SearchForm.css';

const SearchForm = ({ searchForArticles, searchInput, setSearchInput }) => {
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchForArticles(searchInput);
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
        autoComplete='off'
      />

      <button className='search__button'>Search</button>
    </form>
  );
};

export default SearchForm;
