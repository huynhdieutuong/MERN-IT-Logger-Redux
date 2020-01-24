import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { setCurrentLog, deleteLog } from '../../redux/actions/logAction';

const LogItem = ({ log, setCurrentLog, deleteLog }) => {
  return (
    <li className='collection-item'>
      <div>
        <a
          onClick={() => setCurrentLog(log)}
          href='#edit-log-modal'
          className={`modal-trigger ${
            log.attention ? 'red-text' : 'blue-text'
          }`}
        >
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{log._id}</span> last updated by{' '}
          <span className='black-text'>{log.tech.fullName}</span> on{' '}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.createAt}</Moment>
        </span>
        <a href='#!' className='secondary-content'>
          <i
            onClick={() => deleteLog(log)}
            className='material-icons grey-text'
          >
            delete
          </i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  setCurrentLog: PropTypes.func.isRequired,
  deleteLog: PropTypes.func.isRequired
};

export default connect(null, { setCurrentLog, deleteLog })(LogItem);
