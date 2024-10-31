const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

//CONECTAR E CAPTURAR AS INFORMAÇÕES DA POKEAPI
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if (APIResponse.status === 200) {

        const data = await APIResponse.json();
        return data;
    }


};

const renderPokemon = async (pokemon) => {

    pokemonName.textContent = 'Loading...';
    pokemonNumber.textContent = '';
    pokemonImage.src = 'https://i.pinimg.com/originals/0a/50/6f/0a506fe0f6c211128cf1ed370655c6a1.gif';

    const data = await fetchPokemon(pokemon);

    console.log(data);

    if (data) {
        //Quando der tudo ok

        pokemonImage.style.width = '20%';
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        pokemonNumber.textContent = data.id;
        pokemonName.innerHTML = data.name;
        input.value = "";
        searchPokemon = data.id;

    } else {
        //Quando houver erro
        pokemonNumber.textContent = "😑";
        pokemonName.textContent = "Not Found :(";
        pokemonImage.src = 'https://i.pinimg.com/originals/80/e1/8d/80e18df0ed0ad872ac1a003d543d9613.gif';
        pokemonImage.style.width = '35%';

    }



}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

})

buttonPrev.addEventListener("click", () => {

    if (searchPokemon > 1) {
        
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }


});

buttonNext.addEventListener("click", () => {

    searchPokemon += 1;

    renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);

