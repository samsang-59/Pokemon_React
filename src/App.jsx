import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import PokemonList from './components/PokemonList/PokemonList'
import Search from './components/Search/Search'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom'

function App() {

  return (
    <div className='outer-pokedex-wrapper'>
    <h1 id='pokedex-heading'>
      <Link to='/'>pokedex</Link>
    </h1>
    <CustomRoutes/>
    </div>
  )
}

export default App
