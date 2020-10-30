//Variaveis
var listaPokemons = document.getElementById("pokemons");
var pokemons = [];
var initPage = 1;
var perPage = 12;
var lastPage = perPage;



//Inicialização
getPokemons();

//Controle da paginação
function next(){

  initPage = lastPage + 1;
  lastPage = lastPage + perPage;
  console.log(initPage,lastPage);

  if(initPage > 250){
    return
  }

  listaPokemons.innerHTML = '';
  pokemons = [];
  getPokemons();
}
function previus(){

  initPage = initPage - perPage;
  lastPage = lastPage - perPage;

  if(initPage < 1){
    return
  }
  listaPokemons.innerHTML = '';
  pokemons = [];
  getPokemons();
  
}
//Metodos
async function getPokemons() {
  for (let i = initPage; i <= lastPage; i++) {
    pokemons.push(await fetchPokemons(i));
  }
  renderAll();
}


async function fetchPokemons(id) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(URL);
  const pokemon = await response.json();
  return pokemon;
  
}

function getTypes(pokemon) {
  const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
  let spanHtml = ``;
  types.forEach((element) => {
    spanHtml += `<span class="badge badge-primary text-capitalize m-1 ${element}">${element}</span>`;
  });

  return spanHtml;
}

function renderAll(){
  pokemons.forEach((pokemon) => {
    render(pokemon);
  })
}
function render(pokemon){
    let typesHTML = getTypes(pokemon);
    listaPokemons.innerHTML += 
    `
      <li class="p-2 m-2 ">
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
    `;
}



async function search(){
  let inputValue = document.getElementById('input').value;
  listaPokemons.innerHTML = '';

  if(inputValue == '') renderAll();

  const pokemon = await fetchPokemons(inputValue.toLowerCase());

  render(pokemon);

}





