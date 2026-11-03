let pokemonObject;
let myChart;

async function getStuff(id) {
    // creating a pokemon object so that we can return it once we search via a specific id
    let pokeObj = { name: "", id: 0, height: 0, weight: 0, image: null, hp: 0, attack: 0, defense: 0, speed: 0 };
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);      // fetching from the api
    let response_obj = await response.json(); // turning the response into a js object
    // testing to see if it prints // if it works
    // console.log(response_obj)
    // console.log(response_obj.name)
    // console.log(response_obj.weight)
    // let image = response_obj.sprite.back_default
    pokeObj.name = response_obj.name;   // passing the values onto our pokemon object we created to extract the values that we need
    pokeObj.weight = response_obj.weight;
    pokeObj.image = response_obj.sprites.front_shiny;
    pokeObj.hp = response_obj.stats[0].base_stat;
    pokeObj.attack = response_obj.stats[1].base_stat;
    pokeObj.defense = response_obj.stats[2].base_stat;
    pokeObj.specialAttack = response_obj.stats[3].base_stat;
    pokeObj.specialDefense = response_obj.stats[4].base_stat;
    pokeObj.speed = response_obj.stats[5].base_stat;

    return pokeObj;

}

let pokeForm = document.querySelector("#Pokeform"); // here we are creating a form or pulling from the html of the form we made
// so that we can add an add a event listner for when the user submits a value  so that we can change the pokemon and their stats and recall the function
pokeForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    let pokeID = document.querySelector("#pokeID")
    let id = pokeID.value
    createChart(id)

})


async function createChart(id) { // creating the chart using chart.js
    let imgDiv = document.querySelector("#img"); // getting image div from html
    let chart = document.querySelector("#chart"); // getting cart canvas
    let pokemon = await getStuff(id) // calling the function to draw based on id we want
    let name = document.createElement("h1")
    name.innerHTML = pokemon.name

    document.querySelector("#img")

    let img = document.createElement("img")

    img.src = pokemon.image
    imgDiv.innerHTML = ""
    imgDiv.append(name)
    imgDiv.append(img); // adding image to the image div so we can create an img card

    if (myChart) {
        myChart.destroy()
    }

    // creating a bar chart
    myChart = new Chart(chart, {
        type: 'bar', // type of graph
        data: { // the data object which takes a x and y axis
            labels: ['Weight', 'HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'], // values of the x axis
            datasets: [{ // the actual data a list of objects
                label: pokemon.name,
                data: [     // the values of the columns derived from our pokemon object
                    pokemon.weight,
                    pokemon.hp,
                    pokemon.attack,
                    pokemon.defense,
                    pokemon.specialAttack,
                    pokemon.specialDefense,
                    pokemon.speed
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}



async function main() {
    let pokemonObject = await getStuff(2)
    console.log(pokemonObject)
}

createChart(2)