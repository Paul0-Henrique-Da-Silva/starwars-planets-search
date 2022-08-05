import React, { useContext, useState } from 'react';

import ContextPlanets from '../context/ContextPlanets';

function Table() {
  const [searchName, setSearchName] = useState('');
  const { planetsTab } = useContext(ContextPlanets);
  const filteringName = planetsTab.filter((value) => value.name.includes(searchName));
  const title = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
    'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL'];
  return (
    <>
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
      <table>
        <thead>
          <tr>
            {
              title.map((value, index) => (
                <th key={ index }>
                  {' '}
                  { value }
                  {' '}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            filteringName.map((item, index) => (
              <tr key={ index }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
