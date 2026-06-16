import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import './PokemonList.css';


function PokemonList() {
    // const [pokemonList , setPokemonList] = useState([]);
    // const [isLoading , setIsLoading] = useState(true);
    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [PokemonListState , SetPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon?limit=20',
        nextUrl: '',
        prevUrl: ''
    })


    async function downloadPokemons(){
        SetPokemonListState({...PokemonListState , isLoading: true})
        const response = await axios.get(PokemonListState.pokedexUrl);
        const pokemonResults = response.data.results;

        console.log(response.data);
        SetPokemonListState((State) =>({
            ...State ,
            nextUrl: response.data.next,
            prevUrl: response.data.previous 
        }));

        // setNextUrl(response.data.next);
        // setPrevUrl(response.data.previous);



        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData); 
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        });
        console.log(res)
        SetPokemonListState((State) => ({
            ...State,
            pokemonList: res, 
            isLoading: false
        }));
        // setIsLoading(false)
    }

    useEffect(() => {
        downloadPokemons();
    }, [PokemonListState.pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div>
                pokemon List
            </div>
            <div className="pokemon-wrapper">
                {
                    (PokemonListState.isLoading) ? 'Loading...' : 
                    PokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>) 
                }
            </div> 
            <div className="controls">
                <button disabled={PokemonListState.prevUrl === null} onClick={() => SetPokemonListState({...PokemonListState ,pokedexUrl: PokemonListState.prevUrl})}>Prev</button>
                <button disabled={PokemonListState.nextUrl === null} onClick={() => SetPokemonListState({...PokemonListState, pokedexUrl: PokemonListState.nextUrl})}>Next</button>
            </div>
        </div>

    )
}

export default PokemonList;