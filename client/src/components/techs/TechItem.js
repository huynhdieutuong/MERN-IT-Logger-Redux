import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import techContext from '../../contexts/tech/techContext';

const TechItem = ({ tech }) => {
  const { deleteTech, setCurrentTech } = useContext(techContext);

  return (
    <li className='collection-item'>
      <div>
        {tech.fullName}
        <span className='secondary-content grey-text'>
          <a href='#edit-tech-modal' className='modal-trigger'>
            <i className='material-icons' onClick={() => setCurrentTech(tech)}>
              edit
            </i>{' '}
          </a>
          <i className='material-icons' onClick={() => deleteTech(tech)}>
            delete
          </i>
        </span>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired
};

export default TechItem;
