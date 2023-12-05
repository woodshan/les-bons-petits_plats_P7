import { recipes } from "../../data/recipes.js";
import { displayRecipes } from "../templates/recipeTemplate.js";

export function sort(activeFiltersArray) {
  const matchingIngredients = [];

  // Parcours des recettes
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      activeFiltersArray.forEach((activeFilter) => {
        if (ingredient.ingredient.toLowerCase() === activeFilter.getAttribute("value")) {
          matchingIngredients.push(recipe);
        }
      });
    });
  });
  
  displayRecipeCard(matchingIngredients);
}

function displayRecipeCard(matchingIngredients) {
  // Clear all recipe cards
  document.querySelector(".recipes_section").innerHTML = "";

  // Display searched recipe cards 
  if(matchingIngredients.length > 0) {
    displayRecipes(matchingIngredients);
  } else {
    displayRecipes(recipes)
  }
}
