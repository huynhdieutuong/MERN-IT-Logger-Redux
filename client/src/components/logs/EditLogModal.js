import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import { updateLog } from '../../redux/actions/logAction';

import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({ updateLog, log: { current } }) => {
  const [message, setMessage] = useState('');
  const [tech, setTech] = useState('');
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setTech(current.tech._id);
      setAttention(current.attention);
    }
  }, [current]);

  const onSubmit = e => {
    e.preventDefault();

    if (!message || !tech) {
      return M.toast({ html: 'Please enter message and tech' });
    }

    updateLog({ _id: current._id, message, tech, attention });

    // Clear state
    setMessage('');
    setTech('');
    setAttention(false);
  };

  return (
    <div id='edit-log-modal' className='modal'>
      <div className='modal-content'>
        <h4>Edit Log</h4>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <select
            name='tech'
            value={tech}
            onChange={e => setTech(e.target.value)}
            className='browser-default'
          >
            <option value='' disabled>
              Select Technician
            </option>
            <TechSelectOptions />
          </select>
        </div>
        <div className='row'>
          <p>
            <label>
              <input
                name='attention'
                type='checkbox'
                className='filled-in'
                checked={attention}
                onChange={e => setAttention(!attention)}
              />
              <span className='black-text'>Needs Attention</span>
            </label>
          </p>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-light btn blue'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

EditLogModal.propTypes = {
  log: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
