import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { searchLogs, getLogs } from '../../redux/actions/logAction';

const SearchBar = ({ searchLogs, getLogs }) => {
  const text = useRef('');

  const onSearchLogs = e => {
    e.preventDefault();

    searchLogs(text.current.value);
  };

  const clearSearch = () => {
    text.current.value = '';
    getLogs();
  };

  return (
    <nav>
      <div className='nav-wrapper'>
        <form onSubmit={onSearchLogs}>
          <div className='input-field'>
            <input id='search' type='search' ref={text} />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i onClick={clearSearch} className='material-icons'>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
  getLogs: PropTypes.func.isRequired
};

export default connect(null, { searchLogs, getLogs })(SearchBar);
