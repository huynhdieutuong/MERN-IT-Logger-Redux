import React, { Fragment, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import SearchBar from './components/layout/SearchBar';
import AddBtn from './components/layout/AddBtn';

import Logs from './components/logs/Logs';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import TechListModal from './components/techs/TechListModal';
import AddTechModal from './components/techs/AddTechModal';
import EditTechModal from './components/techs/EditTechModal';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <Fragment>
      <SearchBar />
      <div className='container' style={{ marginTop: '50px' }}>
        <Logs />
        <AddBtn />
      </div>

      {/* Modal */}
      <AddLogModal />
      <EditLogModal />
      <TechListModal />
      <AddTechModal />
      <EditTechModal />
    </Fragment>
  );
};

export default App;
