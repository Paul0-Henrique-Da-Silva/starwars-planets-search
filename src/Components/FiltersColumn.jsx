import React, { useEffect, useState, useContext } from 'react';

import ContextPlanets from '../context/ContextPlanets';

function FilterColumn() {
  const { filterByNumericValues,
    setfilterByNumericValues, planetsTab, setPlanetsTab } = useContext(ContextPlanets);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const columnArray = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [neWcolumnArray, setNewColumnArray] = useState(columnArray);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const sortArray = () => {
    let planetsOrder = [];

    if (order.sort === 'ASC') {
      const pNumber = planetsTab.filter(
        (planet) => planet[order.column] !== 'unknown',
      ).sort(
        (a, b) => a[order.column] - b[order.column],
      );
      const pUnknown = planetsTab.filter(
        (planet) => planet[order.column] === 'unknown',
      );
      planetsOrder = [...pNumber, ...pUnknown];
    }

    if (order.sort === 'DESC') {
      const pNumber = planetsTab.filter(
        (planet) => planet[order.column] !== 'unknown',
      ).sort(
        (a, b) => b[order.column] - a[order.column],
      );
      const pUnknown = planetsTab.filter(
        (planet) => planet[order.column] === 'unknown',
      );
      planetsOrder = [...pNumber, ...pUnknown];
    }

    setPlanetsTab(planetsOrder);
  };

  const rmAll = () => {
    setfilterByNumericValues([]);
    setNewColumnArray(columnArray);
  };

  const removefiltro = (column) => {
    const novoA = filterByNumericValues.filter((value) => value.column !== column);
    setfilterByNumericValues(novoA);
    setNewColumnArray([...neWcolumnArray, column]);
  };

  const handlyChange = () => {
    setfilterByNumericValues([...filterByNumericValues, state]);
    const targeting = state.column;
    const filtering = neWcolumnArray.filter((value) => value !== targeting);
    console.log(filtering);
    setNewColumnArray(filtering);
  };

  useEffect(() => {
    setState({ ...state, column: neWcolumnArray[0] });
  }, [neWcolumnArray]);

  return (
    <div>
      <label htmlFor="column-filter">
        <select
          id="column-filter"
          value={ state.column }
          data-testid="column-filter"
          onChange={ (event) => setState({ ...state, column: event.target.value }) }
        >
          { neWcolumnArray.map((value) => (
            <option key={ value } value={ value }>{value}</option>))}
        </select>
      </label>
      <select
        data-testid="comparison-filter"
        id="comparison"
        value={ state.comparison }
        onChange={ (event) => setState({ ...state, comparison: event.target.value }) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <label htmlFor="value-filter">
        <input
          type="number"
          value={ state.value }
          id="value-filter"
          data-testid="value-filter"
          onChange={ (event) => setState({ ...state, value: event.target.value }) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handlyChange }
      >
        filter
      </button>
      <button data-testid="button-remove-filters" type="button" onClick={ rmAll }>
        Remover todos filtros.
      </button>
      {/* seletor de filtro asc e des */}
      <section>
        <select
          data-testid="column-sort"
          onChange={ (e) => setOrder({ ...order, column: e.target.value }) }
        >
          {columnArray.map((value) => <option key={ value }>{value}</option>)}
        </select>
        <label htmlFor="Sort">
          Asc
          <input
            data-testid="column-sort-input-asc"
            name="Sort"
            value="ASC"
            type="radio"
            onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
          />
        </label>
        <label htmlFor="Sort">
          Desc
          <input
            data-testid="column-sort-input-desc"
            name="Sort"
            value="DESC"
            type="radio"
            onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
          />
        </label>
        <input
          value="Ordernar"
          type="button"
          data-testid="column-sort-button"
          onClick={ sortArray }
        />
      </section>
      { /* fitro já selecionado */}
      {filterByNumericValues.map((value, index) => (
        <div data-testid="filter" key={ index }>
          <span>{`${value.column} | ${value.comparison} | ${value.value}`}</span>
          <button type="button" onClick={ () => removefiltro(value.column) }>X</button>
        </div>
      ))}
    </div>
  );
}

export default FilterColumn;
