import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import { getLogs, setLoading, setPage } from '../../redux/actions/logAction';

import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

const Logs = ({
  getLogs,
  setLoading,
  setPage,
  log: { logs, loading, message, error, page }
}) => {
  useEffect(() => {
    if (!page) {
      setLoading();
      setPage(1);
    }
    getLogs(page);
    // eslint-disable-next-line
  }, [page]);

  if (loading) return <Preloader />;
  if (error) M.toast({ html: error });
  if (message) M.toast({ html: message });

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>System Logs</h4>
        </li>
        {logs.length > 0 ? (
          logs.map(log => <LogItem key={log._id} log={log} />)
        ) : (
          <p className='center'>No logs to show...</p>
        )}
      </ul>
    </div>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, {
  getLogs,
  setLoading,
  setPage
})(Logs);
