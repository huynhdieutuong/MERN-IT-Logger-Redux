import React, { useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';

import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/logs');
      const logs = res.data;
      if (logs.error) {
        setError(logs.error);
      } else {
        setLogs(logs.data);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Preloader />;
  if (error) M.toast({ html: error });

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
