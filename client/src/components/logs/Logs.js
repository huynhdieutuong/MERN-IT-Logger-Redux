import React, { useEffect, useContext } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

import logContext from '../../contexts/log/logContext';

const Logs = () => {
  const { logs, loading, error, message, getLogs, setLoading } = useContext(
    logContext
  );

  useEffect(() => {
    setLoading();
    getLogs();
    // eslint-disable-next-line
  }, []);

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

export default Logs;
