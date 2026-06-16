import PokemonDetails from '../PokemonDetails/PokemonDetails';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css'
import { useEffect, useState } from 'react';

function Pokedex(){

    const [searchTerm, setSearchterm] = useState('');

    return (
        <div className='pokedex-wrapper'>
            <Search updateSearchTerm={setSearchterm} />
            { (!searchTerm) ? <PokemonList/> : <PokemonDetails key={searchTerm} pokemonName={searchTerm}/> }
        </div>
    )
}

export default Pokedex;