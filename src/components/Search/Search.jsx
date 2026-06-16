import { useState } from 'react';
import './Search.css'
import useDebounce from '../../routes/hooks/useDebounce';

function Search({updateSearchTerm}) {
    const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value));
    return (
        <div className='search-wrapper'>
            <input
                id='pokemon-name-search'
                type="text"
                placeholder="pokemon_name"
                onChange={debouncedCallback}
            />
        </div>
    );
}

export default Search;