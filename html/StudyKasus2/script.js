
 function checkScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
      navbar.classList.remove('scrolled');
    } else {
      navbar.classList.add('scrolled');
      navbar.classList.remove('solid');
    }
  }

  // Cek scroll saat halaman pertama kali dimuat
  document.addEventListener('DOMContentLoaded', checkScroll);

  // Tambahkan event listener untuk cek scroll ketika user scroll
  window.addEventListener('scroll', checkScroll);

// Fetch and render recipes
const getRecipes = async () => {
    const url = 'https://dummyjson.com/recipes';
    const response = await fetch(url);
    const data = await response.json();
    return data.recipes;
};

// Render function with limit
const render = (recipes, limit) => {
    return recipes.slice(0, limit).map((recipe) => 
        `<div class="swiper-slide">
            <div  data-aos="zoom-out" class="card" onclick="showRecipeModal(${recipe.id})">
                <div class="portfolio-item position-relative overflow-hidden rounded shadow-sm">
                    <img src="${recipe.image}" alt="${recipe.name}"/>
                    <div class="text-center portfolio-overlay d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                        <button class="btn btn-outline-light mt-2">Show Recipe</button>
                    </div>
                </div>
                <h5 class="fw-bold mt-3">${recipe.name}</h5>
                <p><i class="bi bi-star-fill"></i> ${recipe.rating} (${recipe.reviewCount} reviews)</p>
            </div>
        </div>`
    ).join('');
};

// Show recipe modal with details
const showRecipeModal = (id) => {
    const recipe = window.recipes.find(recipe => recipe.id === id);
    if (recipe) {
        document.getElementById("modal-title").innerText = recipe.name;
        document.getElementById("modal-image").src = recipe.image;
        document.getElementById("modal-prep-time").innerText = `${recipe.prepTimeMinutes} minutes`;
        document.getElementById("modal-cook-time").innerText = `${recipe.cookTimeMinutes} minutes`;
        document.getElementById("modal-servings").innerText = recipe.servings;
        document.getElementById("modal-difficulty").innerText = recipe.difficulty;
        document.getElementById("modal-cuisine").innerText = recipe.cuisine;
        document.getElementById("modal-calories").innerText = `${recipe.caloriesPerServing} kcal`;
        document.getElementById("modal-meal-type").innerText = recipe.mealType.join(", ");
        
        const ingredientsList = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        document.getElementById('modal-ingredients').innerHTML = ingredientsList;

        const instructionsList = recipe.instructions.map(step => `<li>${step}</li>`).join('');
        document.getElementById('modal-instructions').innerHTML = instructionsList;
        
        document.getElementById("recipe-modal").style.display = "block";
    }
};

// Close modal function
const closeModal = () => {
    document.getElementById("recipe-modal").style.display = "none";
};

// IIFE to load data and initialize the swiper after data loading
(async () => {
    window.recipes = await getRecipes();
    let initialDisplayCount = 6;

    // Initial display of recipes
    const recipeCards = render(recipes, initialDisplayCount);
    document.getElementById('recipe-cards').innerHTML = recipeCards;

    // Initialize Swiper only after loading recipes
    const swiper = new Swiper('.swiper', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    
    // Show More button event listener
    document.getElementById("show-more-btn").addEventListener("click", () => {
        const allCards = render(recipes, recipes.length);
        document.getElementById("recipe-cards").innerHTML = allCards;
        document.getElementById("show-more-btn").style.display = "none";
        document.getElementById("show-less-btn").style.display = "inline";
    });

    // Show Less button event listener
    document.getElementById("show-less-btn").addEventListener("click", () => {
        const limitedCards = render(recipes, initialDisplayCount);
        document.getElementById("recipe-cards").innerHTML = limitedCards;
        document.getElementById("show-less-btn").style.display = "none";
        document.getElementById("show-more-btn").style.display = "inline";
    });
})();

$(document).ready(function() {
  $(`[unique-script-id="w-w-dm-id"] .btn-box`).click(function() {
    $(this).parent().children(".overlay").show();
  });

  $(`[unique-script-id="w-w-dm-id"] .close`).click(function() {
    $(".overlay").hide();
  });
});