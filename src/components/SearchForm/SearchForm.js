import './SearchForm.css';

const SearchForm = () => {
  return (
    <div className='search'>
      <input type='text' className='search__input' placeholder='Enter topic' />
      <button className='search__button'>Search</button>
    </div>
  );
};

export default SearchForm;
