import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;

    setSearchQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() !== '') {
      onSubmit(searchQuery);
      e.target.reset();
      return;
    }

    Notiflix.Notify.warning('Please enter something');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButton__label}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
