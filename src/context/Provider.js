import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextPlanets from './ContextPlanets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);// array original
  const [planetsTab, setPlanetsTab] = useState([]);
  const [filterByNumericValues, setfilterByNumericValues] = useState([]);

  useEffect(() => {
    const starWarsAPI = async () => {
      const magicNumber = -1;
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await request.json();
      const { results } = data;
      console.log(results);
      const newData = results.filter((value) => delete value.residents);
      console.log(newData);
      const sortData = newData.sort((a, b) => (a.name > b.name ? 1 : magicNumber));
      setPlanets(sortData);
      setPlanetsTab(sortData);
    };
    starWarsAPI();
  }, []);
  console.log(planets);

  useEffect(() => {
    let filtrado = [...planets];
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        const maiorQ = filtrado
          .filter((item) => Number(item[column]) > Number(value));
        filtrado = [...maiorQ];
      }
      if (comparison === 'menor que') {
        const menorQ = filtrado
          .filter((item) => Number(item[column]) < Number(value));
        filtrado = [...menorQ];
      }
      if (comparison === 'igual a') {
        const igualA = filtrado
          .filter((item) => Number(item[column]) === Number(value));
        filtrado = [...igualA];
      }
    });
    console.log(filtrado);
    setPlanetsTab(filtrado);
  }, [filterByNumericValues]);

  const stateOfContext = {
    planets,
    planetsTab,
    setPlanetsTab,
    setfilterByNumericValues,
    filterByNumericValues,
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
