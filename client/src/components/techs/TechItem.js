import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteTech, setCurrentTech } from '../../redux/actions/techAction';

const TechItem = ({ tech, deleteTech, setCurrentTech }) => {
  return (
    <li className='collection-item'>
      <div>
        {tech.fullName}
        <a href='#!' className='secondary-content grey-text'>
          <a href='#edit-tech-modal' className='modal-trigger'>
            <i onClick={() => setCurrentTech(tech)} className='material-icons'>
              edit
            </i>{' '}
          </a>
          <i onClick={() => deleteTech(tech)} className='material-icons'>
            delete
          </i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
  setCurrentTech: PropTypes.func.isRequired
};

export default connect(null, { deleteTech, setCurrentTech })(TechItem);
