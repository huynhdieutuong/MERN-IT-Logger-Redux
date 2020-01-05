import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TechSelectOptions = () => {
  const [techs, setTechs] = useState([]);

  const getTechs = async () => {
    const res = await axios.get('/api/v1/techs');
    const techs = res.data;
    setTechs(techs.data);
  };

  useEffect(() => {
    getTechs();
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
