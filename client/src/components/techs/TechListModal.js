import React, { useState, useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';

import TechItem from './TechItem';

const Techs = () => {
  const [techs, setTechs] = useState([]);
  const [error, setError] = useState(null);

  const getTechs = async () => {
    try {
      const res = await axios.get('/api/v1/techs');
      const techs = res.data;
      if (techs.error) {
        setError(techs.error);
      } else {
        setTechs(techs.data);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    getTechs();
  }, []);

  if (error) M.toast({ html: error });

  return (
    <div className='modal' id='tech-list-modal'>
      <div className='modal-content'>
        <h4>Technicians</h4>

        <ul className='collection'>
          {techs.length > 0 &&
            techs.map(tech => <TechItem key={tech._id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

export default Techs;
