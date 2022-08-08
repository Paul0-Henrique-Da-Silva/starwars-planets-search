import React, { useEffect, useState, useContext } from 'react';

import ContextPlanets from '../context/ContextPlanets';

function FilterColumn() {
  const { filterByNumericValues, setfilterByNumericValues } = useContext(ContextPlanets);
  const columnArray = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [neWcolumnArray, setNewColumnArray] = useState(columnArray);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

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
    </div>
  );
}

export default FilterColumn;
