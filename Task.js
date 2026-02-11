let pokemons = [];
let limit = 20;
async function showPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit${limit}", {
        method: "GET"
    });

    const data = await response.json();
    pokemons = data.results;

    const list = document.getElementById("pokemon-list");

    pokemons.forEach(pokemon => {
        const li = document.createElement("li");
        li.textContent  = pokemon.name;
        li.addEventListener("click", function () {
            showPokemonDetails(pokemon.url);
        });
        list.appendChild(li);
    });
}

document.getElementById("loadMoreBtn").addEventListener("click", function (){
    limit = 30;
    showPokemons();
})
document.getElementById("SubmitBtn").addEventListener("click", function () {
    const searchValue = document.getElementById("Search").value.toLowerCase();
    const list = document.getElementById("pokemon-list");

    list.innerHTML = "";
     pokemons.forEach(function (pokemon) {
        if(pokemon.name.includes(searchValue)){
            const li = document.createElement("li");
            li.textContent = pokemon.name;
            list.appendChild(li);
        }
     });
    });


   async function showPokemonDetails(url){
        const response =await fetch(url);
        const data =await response.json();
        const details = document.getElementById("pokemon-details");

        const hp = data.stats.find(stat => stat.stat.name === "hp").base_stat;
        const attack = data.stats.find(stat => stat.stat.name === "attack").base_stat;
        const speed = data.stats.find(stat => stat.stat.name === "speed").base_stat;
        details.innerHTML = ` Height: ${data.height}  Weight: ${data.weight} 
                              HP: ${hp} Attack: ${attack} Speed: ${speed}
                            `;
    }

showPokemons();

/*
Make the list of pokemons a name only
Create a search bar with a submit button to search for a specific pokemon
Only while clicking on a pokemon name display the pokemon height and wieght and 3 stats (hp, attack, speed)
Add some styling to the page
BONUS – Add pagination to load more pokemons (we load only 20 by default)
BONUS BONUS – Make a favorite pokemon list and add the ability to add a pokemon to that list
*/ 