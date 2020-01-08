import React, { useContext, useEffect } from 'react';
import techContext from '../../contexts/tech/techContext';

const TechSelectOptions = () => {
  const { techs, getTechs } = useContext(techContext);

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

export default TechSelectOptions;
