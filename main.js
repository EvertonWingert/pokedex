
const POKEMONS_NUMBER = 150;
var div = document.getElementById('pokemons');

async function fetchPokemons(){
  for(let i = 1; i <= POKEMONS_NUMBER; i++){
    await getPokemon(i);
  } 
}

async function getPokemon(id)   {
  const URL =  `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(URL);
  const pokemon = await response.json();
  render(pokemon); 
}

function getTypes(types){
  let spanHtml = ``;
  types.forEach(element => {
    spanHtml += `<span class="badge badge-primary text-capitalize m-1 ${element}">${element}</span>`
  });

  return spanHtml;
}

function render(pokemon){
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    let typesHTML = getTypes(types);

    div.innerHTML += 
    `
    <li>
      <div class="card p-2 m-2 shadow-sm border-0 " style="width: 18rem;">
      <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
      <div class="card-body">
        <h5 class="card-tittle text-center text-capitalize">${pokemon.name}</h5> 
        ${typesHTML}
      </div>
    </div> 
    </li>
    
    ` 
   
}


fetchPokemons();


