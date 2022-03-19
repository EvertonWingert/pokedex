import { fetchPokemon } from './api/index.js'

const pokemonsUl = document.getElementById('pokemons');
const form = document.querySelector('form');
const nextButton = document.getElementById('next');

var pokemonList = [];
var firstCard = 1;
var perPage = 12;
var lastCard = perPage;

//Inicialização
init();

//Eventos
form.addEventListener('submit', event => {
  event.preventDefault();
  search(event.target.search.value);
});
nextButton.addEventListener('click', next);


//Métodos
async function getPokemons() {
  for (let i = firstCard; i <= lastCard; i++) {
    pokemonList.push(await fetchPokemon(i));
  }
  render();
}

function getTypes(pokemon) {
  const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
  let spanHtml = ``;
  types.forEach((element) => {
    spanHtml += `<span class="badge badge-primary text-capitalize m-1 p-2 ${element}">${element}</span>`;
  });

  return spanHtml;
}


async function search(value) {
  pokemonsUl.innerHTML = '';
  const loading = document.getElementById('spinner-search');
  loading.classList.remove('d-none');

  if (!value) {
    pokemonList = [];
    getPokemons();
    render();
    return
  }

  try {
    const pokemon = await fetchPokemon(value.toLowerCase());
    pokemonList = [];
    pokemonList.push(pokemon);
    render();
  } catch (e) {
    pokemonsUl.innerHTML = `
    <div class="alert alert-danger" role="alert">
      Alguma coisa deu errado!
    </div>
    `
  } finally {
    loading.classList.add('d-none');
  }
}


function render() {
  pokemonList.forEach((pokemon) => {
    let typesHTML = getTypes(pokemon);
    pokemonsUl.innerHTML += `
        <li class="col ">
          <div class="card border-0 shadow-sm" style="width: 18rem;">
            <div class="card-header">
              <h6 class="card-subtitle mb-2 text-muted">Nº ${pokemon.id}</h6>
            </div>
            <div class="card-body">
              <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
              <div class="card-body">
                <h5 class="card-tittle text-center text-capitalize">${pokemon.name}</h5>
                ${typesHTML}
              </div>
            </div>
            
        </div> 
        </li>
      `
  });
}
async function init() {
  pokemonList = [];
  await getPokemons();
}


//Controle da paginação
async function next() {
  firstCard = lastCard + 1;
  lastCard = lastCard + perPage;

  if (firstCard > 250) {
    return
  }

  const loading = document.getElementById('spinner-next');
  loading.classList.remove('d-none');
  await init();
  loading.classList.add('d-none');
}








