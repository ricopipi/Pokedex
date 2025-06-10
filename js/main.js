console.log("Funcionou! ")
 const url = "https://pokeapi.co/api/v2/pokemon?limit=600&offset=0"  // link do poké API
const pokemonList = document.getElementById("lista-pokemon")

//Função para pegar as informações do pokemon
function convertPokemonToLi(pokemon){
    return `
        <li class="pokemon ${pokemon.types[0].type.name}">
            <p class="nome">${pokemon.name}</p>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="bulbasaur">
        </li>
    `
    ;
  
}
// transformas as informações em json
function getPokemonDetails(pokemon){
    return fetch(pokemon.url)
        .then((response) => response.json())
}
fetch(url)
    .then((response) => response.json())
    .then((jsonresponse) => jsonresponse.results)
    .then((list) =>list.map(getPokemonDetails))
    .then((details)=>Promise.all(details))
    .then((newList) => pokemonList.innerHTML = newList.map(convertPokemonToLi).join(""))
    .catch((error) => console.log(error))
