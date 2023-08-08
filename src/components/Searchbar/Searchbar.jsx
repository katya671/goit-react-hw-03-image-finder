import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleSubmit}>
          <button type="submit" className={css['searchform-button']}>
            <FontAwesomeIcon
              icon={faSearch}
              className={css['searchform-button-icon']}
            />
          </button>

          <input
            className={css['searchform-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
