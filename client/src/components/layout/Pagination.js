import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPage } from '../../redux/actions/logAction';

const Pagination = ({ setPage, log: { page, pagination } }) => {
  return (
    pagination && (
      <div className='row'>
        <ul className='pagination right'>
          <li className={pagination.pre ? 'waves-effect' : 'disabled'}>
            <a
              href='#!'
              onClick={pagination.pre ? () => setPage(pagination.pre.page) : ''}
            >
              <i className='material-icons'>chevron_left</i>
            </a>
          </li>
          {pagination.pageNumbers.map(num => (
            <li className={num === page ? 'active' : 'waves-effect'}>
              <a href='#!' onClick={() => setPage(num)}>
                {num}
              </a>
            </li>
          ))}
          <li className={pagination.next ? 'waves-effect' : 'disabled'}>
            <a
              href='#!'
              onClick={
                pagination.next ? () => setPage(pagination.next.page) : ''
              }
            >
              <i className='material-icons'>chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    )
  );
};

Pagination.propTypes = {
  log: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { setPage })(Pagination);
