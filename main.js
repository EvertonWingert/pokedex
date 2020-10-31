//Variaveis
var pokemonsUl = document.getElementById('pokemons');
const form = document.querySelector('form');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

var pokemonList = [];
var firstCard = 1;
var perPage = 12;
var lastCard = perPage;

//Inicialização
init();

//Eventos
form.addEventListener('submit', event =>{
  event.preventDefault();
  const inputValue = event.target.search.value;
  console.log(inputValue);
  search(inputValue);
});

nextButton.addEventListener('click',next);
previousButton.addEventListener('click',previous);


//Metodos
async function getPokemons() {
  for (let i = firstCard; i <= lastCard; i++) {
    pokemonList.push(await fetchPokemon(i));
  }
  render();
}

async function fetchPokemon(id) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(URL);
  const pokemon = await response.json();
  return pokemon;
  
}

function getTypes(pokemon) {
  const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
  let spanHtml = ``;
  types.forEach((element) => {
    spanHtml += `<span class="badge badge-primary text-capitalize m-1 p-2 ${element}">${element}</span>`;
  });

  return spanHtml;
}

function isPokemon(pokemon){
  return pokemon == pokemonList;
}

async function search(value){
  pokemonsUl.innerHTML = '';

  if(value == '') {
    pokemonList = [];
    getPokemons();
    render();
    return
  }

  try{
    const pokemon = await fetchPokemon(value.toLowerCase());
    pokemonList = [];
    pokemonList.push(pokemon);
    render();
  }catch(e){
    pokemonsUl.innerHTML = `
    <div class="alert alert-danger" role="alert">
      Alguma coisa deu errado!
    </div>
    `
  }
}


function render(){
    pokemonList.forEach((pokemon) =>{
      let typesHTML = getTypes(pokemon);
      pokemonsUl.innerHTML += 
      `
        <li class="p-2 m-2 col-md-auto">
          <div class="card  border-0 shadow-sm" style="width: 18rem;">
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
function init(){
  pokemonsUl.innerHTML = '';
  pokemonList = [];
  getPokemons();   
}


//Controle da paginação
function next(){
  firstCard = lastCard + 1;
  lastCard = lastCard + perPage;

  if(firstCard > 250){
    return
  }

  init();
}
function previous(){
  firstCard = firstCard - perPage;
  lastCard = lastCard - perPage;

  if(firstCard < 1){
    return
  }
  init()
}







