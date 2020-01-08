import React, { useContext, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import TechItem from './TechItem';

import techContext from '../../contexts/tech/techContext';

const Techs = () => {
  const { techs, error, message, getTechs } = useContext(techContext);

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  if (error) M.toast({ html: error });
  if (message) M.toast({ html: message });

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
