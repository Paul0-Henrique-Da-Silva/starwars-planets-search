import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

describe('', () => {
  const planetName_ASC = 
  ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Dagobah', 'Hoth'];
  const planetName_DES = 
  ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV', 'Dagobah', 'Hoth'];
  
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData)
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('Ordenar por Ascendente', async () => {
    render(<App />);
      const btn_ORDERNAR = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
      const COLUMN = screen.getByTestId('column-sort')
      const RADIO_SELECT = screen.getByTestId('column-sort-input-asc')
      userEvent.selectOptions(COLUMN, 'population')
      userEvent.click(RADIO_SELECT)
      userEvent.click(btn_ORDERNAR)
      const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
      expect(planets).toHaveLength(10)

      planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetName_ASC[index]))
  }, 30000)
  it('Ordenar por Descendente', async () => {
    render(<App />);
      const btn_ORDERNAR = await screen.findByTestId('column-sort-button', '', {timeout: 5000})
      const COLUMN = screen.getByTestId('column-sort')
      const RADIO_SELECT = screen.getByTestId('column-sort-input-desc')
      userEvent.selectOptions(COLUMN, 'population')
      userEvent.click(RADIO_SELECT)
      userEvent.click(btn_ORDERNAR)
      const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})
      expect(planets).toHaveLength(10)

      planets.forEach((planet, index) => expect(planet).toHaveTextContent(planetName_DES[index]))
  }, 30000)
  it('Testa o botão de remover todos os Filtros', async () => {
    render(<App />)

    const COLUMN = screen.getByTestId('column-filter')
    const COMPARISON = screen.getByTestId('comparison-filter')
    const VALUE_NUM = screen.getByTestId('value-filter')
    const BTN_FILTER = await screen.findByTestId('button-filter', '', {timeout: 5000})
    const RM_ALL = screen.getByRole('button', {name: /Remover todos filtros/i})

    userEvent.selectOptions(COLUMN, 'population')
    userEvent.selectOptions(COMPARISON, 'maior que')
    userEvent.clear(VALUE_NUM)
    userEvent.type(VALUE_NUM, '2000000')
    userEvent.click(BTN_FILTER)

    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    expect(planets).toHaveLength(6)
    expect(COLUMN).toHaveLength(4)

    userEvent.click(RM_ALL)

    const planets_DUPLI = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    expect(planets_DUPLI).toHaveLength(10)
    expect(COLUMN).toHaveLength(5)
  })
  it('Remover filtro individual', async () => {
    render(<App />)

    const COLUMN = screen.getByTestId('column-filter')
    const COMPARISON = screen.getByTestId('comparison-filter')
    const VALUE_NUM = screen.getByTestId('value-filter')
    const BTN_FILTER = await screen.findByTestId('button-filter', '', {timeout: 5000})

    userEvent.selectOptions(COLUMN, 'population')
    userEvent.selectOptions(COMPARISON, 'maior que')
    userEvent.clear(VALUE_NUM)
    userEvent.type(VALUE_NUM, '2000000')
    userEvent.click(BTN_FILTER)

    const RM_ALL = screen.getByRole('button', { name: /X/i })
    expect(RM_ALL).toBeDefined()
    userEvent.click(RM_ALL)
    expect(RM_ALL).toBeTruthy()
  })
  it('Não há filtros repetidos', async () => {
    render(<App />)

    const COLUMN = screen.getByTestId('column-filter')
    const COMPARISON = screen.getByTestId('comparison-filter')
    const VALUE_NUM = screen.getByTestId('value-filter')
    const BTN_FILTER = await screen.findByTestId('button-filter', '', {timeout: 5000})

    userEvent.selectOptions(COLUMN, 'population')
    userEvent.selectOptions(COMPARISON, 'maior que')
    userEvent.clear(VALUE_NUM)
    userEvent.type(VALUE_NUM, '2000000')
    userEvent.click(BTN_FILTER)

    expect(COLUMN).toHaveLength(4)
  })
  it('Botão de filtrar com múltiplos filtros', async () => {
    render(<App />)
    const TH_TAG = document.getElementsByTagName('th')
    const BTN_FILTER = await screen.findByTestId('button-filter', '', {timeout: 5000})
    const COLUMN = screen.getByTestId('column-filter')
    const COMPARISON = screen.getByTestId('comparison-filter')
    const VALUE_NUM = screen.getByTestId('value-filter')

    userEvent.selectOptions(COLUMN, 'population')
    userEvent.selectOptions(COMPARISON, 'maior que')
    userEvent.clear(VALUE_NUM)
    userEvent.type(VALUE_NUM, '2000000')
    userEvent.click(BTN_FILTER)
    userEvent.selectOptions(COLUMN, 'orbital_period')
    userEvent.selectOptions(COMPARISON, 'menor que')
    userEvent.clear(VALUE_NUM)
    userEvent.type(VALUE_NUM, '400')
    userEvent.click(BTN_FILTER)
    userEvent.selectOptions(COLUMN, 'diameter')
    userEvent.selectOptions(COMPARISON, 'igual a')
    userEvent.clear(VALUE_NUM)
    userEvent.type(VALUE_NUM, '12500')
    userEvent.click(BTN_FILTER)

    expect(TH_TAG).toHaveLength(13)

    const planets = await screen.findAllByTestId('planet-name', '', {timeout: 5000})

    expect(planets[0]).toHaveTextContent('Alderaan')
  })
})
