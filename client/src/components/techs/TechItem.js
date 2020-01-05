import React from 'react';
import PropTypes from 'prop-types';

const TechItem = ({ tech }) => {
  return (
    <li className='collection-item'>
      <div>
        {tech.fullName}
        <a href='#!' className='secondary-content grey-text'>
          <a href='#edit-tech-modal' className='modal-trigger'>
            <i className='material-icons'>edit</i>{' '}
          </a>
          <i className='material-icons'>delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired
};

export default TechItem;
