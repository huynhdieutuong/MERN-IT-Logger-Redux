import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTechs } from '../../redux/actions/techAction';

const TechSelectOptions = ({ getTechs, tech: { techs } }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    techs.length > 0 &&
    techs.map(tech => (
      <option key={tech._id} value={tech._id}>
        {tech.fullName}
      </option>
    ))
  );
};

TechSelectOptions.propTypes = {
  getTechs: PropTypes.func.isRequired,
  tech: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  tech: state.tech
});

export default connect(mapStateToProp, { getTechs })(TechSelectOptions);
