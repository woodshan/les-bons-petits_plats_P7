import { recipes } from "../../data/recipes.js";
import { displayFiltersCategories } from "../templates/filtersTemplate.js";
import { displayRecipes } from "../templates/recipeTemplate.js";
import { createElement } from "./createElement.js";

let matchingRecipes = [];

export function sort(activeFilterCategory, recipeArr) {
  // Array of searched recipes
  matchingRecipes = [];

  // Extract recipeArr keys, check if is array and empty each property
  Object.keys(recipeArr).forEach((key) =>
    Array.isArray(recipeArr[key])
      ? (recipeArr[key] = [])
      : (recipeArr[key] = "")
  );

  // Array of searched recipes
  matchingRecipes = searchRecipe(activeFilterCategory);

  const filters = document.querySelectorAll(".filter");
  // Display filter based on searched recipes
  filters.forEach((filter) => {
    displayFiltersCategories(filter, matchingRecipes, recipeArr, displayFilter);
  });

  // Display searched recipe card
  displayRecipeCard(matchingRecipes);
}

// Filter recipes based on three criteria :  ingredients, ustensils, appliances
export function searchRecipe(activeFilterCategory) {
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
      ) &&
      (recipe.name.toLowerCase().includes(activeFilterCategory.keyword) ||
        recipe.description
          .toLowerCase()
          .includes(activeFilterCategory.keyword) ||
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.ingredient
            .toLowerCase()
            .includes(activeFilterCategory.keyword)
        ))
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
  // Remove duplicate recipe
  matchingRecipes = [...new Set(matchingRecipes)];

  // Clear all recipe cards
  document.querySelector(".recipes_section").innerHTML = "";

  // Display searched recipe cards
  displayRecipes(matchingRecipes);

  if(matchingRecipes.length == 0) {
    const recipeSection = document.querySelector(".recipes_section");
    const typedValue = document.querySelector(".research").value;

    const errorMsg = createElement("p", {class: "no_result"});
    errorMsg.innerText = `Aucune recette ne contient "${typedValue}" vous pouvez chercher "Limonade de coco", "Tarte au thon", etc.`;

    recipeSection.append(errorMsg);
  }
}
