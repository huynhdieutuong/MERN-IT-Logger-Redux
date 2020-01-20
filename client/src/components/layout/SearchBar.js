import React, { useContext, useRef } from 'react';

import logContext from '../../contexts/log/logContext';

const SearchBar = () => {
  const { searchLogs, getLogs } = useContext(logContext);

  const text = useRef('');

  const onSearch = e => {
    e.preventDefault();
    searchLogs(text.current.value);
  };

  const onClearSearch = () => {
    getLogs();
    text.current.value = '';
  };

  return (
    <nav>
      <div className='nav-wrapper'>
        <form onSubmit={onSearch}>
          <div className='input-field'>
            <input id='search' type='search' ref={text} />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons' onClick={onClearSearch}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
