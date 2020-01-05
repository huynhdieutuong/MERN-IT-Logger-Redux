import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditTechModal = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (!firstName || !lastName) {
      return M.toast({ html: 'Please enter first name and last name' });
    }

    console.log({ firstName, lastName });

    // Clear state
    setFirstName('');
    setLastName('');
  };

  return (
    <div id='edit-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>Edit Tech</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-green btn red'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

export default EditTechModal;
