import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import logContext from '../../contexts/log/logContext';

const LogItem = ({ log }) => {
  const { deleteLog, setCurrentLog } = useContext(logContext);

  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${
            log.attention ? 'red-text' : 'blue-text'
          }`}
          onClick={() => setCurrentLog(log)}
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
            className='material-icons grey-text'
            onClick={() => deleteLog(log)}
          >
            delete
          </i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
