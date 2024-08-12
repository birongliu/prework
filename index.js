// grab the elements with the ids
const coffeesContainer = document.getElementById("coffees-container");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const searchInput = document.querySelector(".coffee-input");
const coffeeTypeDropdown = document.getElementById("coffee-type");

let allCoffees = [];
let choice = 'hot'; // Default choice

// Function to check if the device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Function to add coffee cards to the page
function addCoffeeToPage(coffees) {
    coffeesContainer.innerHTML = ''; // Clear previous content
    for (let coffee of coffees) {
        const coffeeCardDiv = document.createElement("div");
        coffeeCardDiv.classList.add("coffee-card");
        coffeeCardDiv.innerHTML = `
            <img class="coffee-img" width="300px; height=300px" src="${coffee.image}" alt="${coffee.title}"/>
            <h1 id="title">${coffee.title}</h1>
            <div>ingredients: ${coffee.ingredients.map(k => `<li>${k}</li>`).join('')}</div>
            <p>${coffee.description}</p>
        `;
        coffeesContainer.appendChild(coffeeCardDiv);
    }
}

// Function to filter coffees based on search query
function filterCoffees(query) {
    const filteredCoffees = allCoffees.filter(coffee => 
        coffee.title.toLowerCase().includes(query.toLowerCase()) ||
        coffee.description.toLowerCase().includes(query.toLowerCase()) ||
        coffee.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()))
    );
    addCoffeeToPage(filteredCoffees);
}

// Add event listener for the search input
searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    filterCoffees(query);
});

// Add event listener for the dropdown menu
coffeeTypeDropdown.addEventListener("change", async (event) => {
    choice = event.target.value;
    await main(choice); // Refetch data based on the new choice
});

// Add event listeners for the arrows
leftArrow.addEventListener("click", () => {
    const scrollAmount = isMobile() ? coffeesContainer.clientWidth : coffeesContainer.clientWidth / 4;
    coffeesContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

rightArrow.addEventListener("click", () => {
    const scrollAmount = isMobile() ? coffeesContainer.clientWidth : coffeesContainer.clientWidth / 4;
    coffeesContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

async function main(coffeeType = 'hot') {
    const data = await fetch(`https://api.sampleapis.com/coffee/${coffeeType}`).then(
        (res) => res.json()
    );
    allCoffees = data; // Reset allCoffees with new data
    addCoffeeToPage(data);
}

// Initial fetch with default choice
main();