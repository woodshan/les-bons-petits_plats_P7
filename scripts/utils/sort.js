import { recipes } from "../../data/recipes.js";
import { displayRecipes } from "../templates/recipeTemplate.js";

let matchingRecipes = [];

export function sort(activeFiltersArray, activeFilterCategory) {
  matchingRecipes = [];

  matchingRecipes = searchRecipe(activeFilterCategory);

  // Display searched recipe card
  displayRecipeCard(activeFiltersArray, matchingRecipes);

  console.log(activeFilterCategory)
}

// Filter recipes based on three criteria :  ingredients, ustensils, appliances
function searchRecipe(activeFilterCategory) {
  return recipes.filter(
    (recipe) =>
    // Check if every active filter ingredient match with recipes ingredients in each recipe
      activeFilterCategory.ingredients.every((ingredientFilt) =>
        recipe.ingredients.some(
          (recipeIngredient) =>
            recipeIngredient.ingredient.toLowerCase() === ingredientFilt
        )
      ) &&
      activeFilterCategory.ustensils.every((ustensilFilt) =>
        recipe.ustensils.some((ustensil) => ustensil.toLowerCase() === ustensilFilt)
      ) &&
      activeFilterCategory.appliances.every(
        (applianceFilt) => recipe.appliance.toLowerCase() === applianceFilt
      )
  );
}

function displayRecipeCard(activeFiltersArray, matchingRecipes) {
  // If more than 1 filter remove duplicate recipe
  if (activeFiltersArray.length > 1) {
    matchingRecipes = [...new Set(matchingRecipes)];
  }

  // Clear all recipe cards
  document.querySelector(".recipes_section").innerHTML = "";

  // Display searched recipe cards
  displayRecipes(matchingRecipes);
}