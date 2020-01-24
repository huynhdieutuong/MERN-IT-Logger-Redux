import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';

import TechItem from './TechItem';
import { getTechs } from '../../redux/actions/techAction';

const Techs = ({ getTechs, tech: { techs, message, error } }) => {
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

Techs.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(Techs);
