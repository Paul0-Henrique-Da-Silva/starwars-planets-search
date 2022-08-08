import React, { useContext, useEffect, useState } from 'react';
import ContextPlanets from '../context/ContextPlanets';

function FilterName() {
  const [searchName, setSearchName] = useState('');
  const { planets, setPlanetsTab } = useContext(ContextPlanets);
  useEffect(() => {
    const filteringName = planets.filter((value) => value.name.includes(searchName));
    setPlanetsTab(filteringName);
  }, [searchName]);

  return (
    <label htmlFor="searchName">
      <input
        name="searchName"
        id="searchName"
        type="search"
        data-testid="name-filter"
        value={ searchName }
        onChange={ (e) => setSearchName(e.target.value) }
      />
    </label>
  );
}

export default FilterName;
