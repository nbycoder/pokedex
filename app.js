const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemon => pokemon.reduce((accumulator, { name , id, types}) => {
    const elemType = types.map(typeInfo => typeInfo.type.name)
    accumulator += `
            <li class="card ${elemType[0]}">
            <img class="card-image" alt="$${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"></img>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elemType.join(" | ")}</p> 
            </li>`
    return accumulator
}, "")

const insertPokemon = pokemon => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemon
}


const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemon)
