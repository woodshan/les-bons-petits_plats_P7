import { recipes } from "../../data/recipes.js";
import { displayFiltersCategories } from "../templates/filtersTemplate.js";
import { displayRecipes } from "../templates/recipeTemplate.js";

let matchingRecipes = [];

export function sort(activeFilterCategory, recipeArr) {
  matchingRecipes = [];

  Object.keys(recipeArr).forEach(key => Array.isArray(recipeArr[key]) ? recipeArr[key] = [] : recipeArr[key] = "");

  // Array of searched recipes
  matchingRecipes = searchRecipe(activeFilterCategory);

  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    displayFiltersCategories(filter, matchingRecipes, recipeArr, displayFilter);
  });

  // Display searched recipe card
  displayRecipeCard(matchingRecipes);

  // console.log(recipeArr)
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
        recipe.ustensils.some(
          (ustensil) => ustensil.toLowerCase() === ustensilFilt
        )
      ) &&
      activeFilterCategory.appliances.every(
        (applianceFilt) => recipe.appliance.toLowerCase() === applianceFilt
      )
  );
}

function displayFilter(recipeCategory, filterContainer) {
  filterContainer
    .querySelectorAll(".btn_filter")
    .forEach((btn) => btn.classList.add("hidden"));

  // Display dom element for each filters
  recipeCategory.forEach((element) => {
    filterContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      if (btn.value === element) {
        btn.classList.remove("hidden");
      }
    });
  });
}

function displayRecipeCard(matchingRecipes) {
  // If more than 1 filter remove duplicate recipe
  matchingRecipes = [...new Set(matchingRecipes)];

  // Clear all recipe cards
  document.querySelector(".recipes_section").innerHTML = "";

  // Display searched recipe cards
  displayRecipes(matchingRecipes);
}