import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextPlanets from './ContextPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);// array original
  const [planetsTab, setPlanetsTab] = useState([]); // array clone para tabela

  useEffect(() => {
    const starWarsAPI = async () => {
      const chaticeDoLinte = -1;
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await request.json();
      const { results } = data;
      console.log(results);
      const newData = results.filter((value) => delete value.residents);
      console.log(newData);
      const sortData = newData.sort((a, b) => (a.name > b.name ? 1 : chaticeDoLinte));
      setPlanets(sortData);
      setPlanetsTab(sortData);
    };
    starWarsAPI();
  }, []);
  console.log(planets);

  const stateOfContext = {
    planetsTab,
  };
  return (
    <ContextPlanets.Provider value={ stateOfContext }>
      { children }
    </ContextPlanets.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
