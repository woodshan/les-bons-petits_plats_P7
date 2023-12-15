import { recipes } from "../../data/recipes.js";
import { displayFiltersCategories } from "../templates/filtersTemplate.js";
import { displayRecipes } from "../templates/recipeTemplate.js";
import { createElement } from "./createElement.js";
import { recipeArr } from "../templates/filtersTemplate.js";

let matchingRecipes = [];

/**
 * Filter, display recipes & show remaning tags
 * @param {Object} activeFilterCategory array of searched filters/values
 * @param {Object} recipeArr array of remaining tags
 */
export function sort(activeFilterCategory) {
  // Array of searched recipes
  matchingRecipes = [];

  // Extract recipeArr keys, check if is array and empty each property (empty recipeArr)
  Object.keys(recipeArr).forEach((key) =>
    Array.isArray(recipeArr[key])
      ? (recipeArr[key] = [])
      : (recipeArr[key] = "")
  );

  // Array of searched recipes
  matchingRecipes = searchRecipe(activeFilterCategory);

  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    // Display filter based on searched recipes and fill recipeArr w/remaning tags
    displayFiltersCategories(filter, matchingRecipes, displayFilter);
    // empty value search
    let inputTag = filter.querySelector(".research_filter");
    if (inputTag.value !== "") {
      inputTag.value = "";
    }
  });

  // Display searched recipe card
  displayRecipeCard(matchingRecipes);
}

/**
 * Filter recipes based on four criteria :  ingredients, ustensils, appliances, keyword
 * @param {Object} activeFilterCategory array of searched filters/values
 * @returns searched recipes
 */
export function searchRecipe(activeFilterCategory) {
  // filter
  for (let i = 0; i < recipes.length; i++) {
    // INGREDIENTS
    // every
    let allIngredientsMatch = true;
    for (let j = 0; j < activeFilterCategory.ingredients.length; j++) {
      // some
      let foundIngredient = false;
      for (let n = 0; n < recipes[i].ingredients.length; n++) {
        if (
          activeFilterCategory.ingredients[j] ==
          recipes[i].ingredients[n].ingredient.toLowerCase()
        ) {
          foundIngredient = true;
        }
      }

      if (!foundIngredient) {
        allIngredientsMatch = false;
      }
    }

    // USTENSILS
    // every
    let allUstensilsMatch = true;
    for (let k = 0; k < activeFilterCategory.ustensils.length; k++) {
      // some
      let foundUstensil = false;
      for (let u = 0; u < recipes[i].ustensils.length; u++) {
        if (
          activeFilterCategory.ustensils[k] ==
          recipes[i].ustensils[u].toLowerCase()
        ) {
          foundUstensil = true;
        }
      }

      if (!foundUstensil) {
        allUstensilsMatch = false;
      }
    }

    // APPLIANCES
    let allAppliancesMatch = true;
    for (let h = 0; h < activeFilterCategory.appliances.length; h++) {
      if (
        recipes[i].appliance.toLowerCase() !==
        activeFilterCategory.appliances[h]
      ) {
        allAppliancesMatch = false;
      }
    }

    // KEYWORD
    let recipeKeywordFound = false;
    // if no keyword
    if (activeFilterCategory.keyword == "") {
      recipeKeywordFound = true;
    }

    if (
      recipes[i].name.toLowerCase().includes(activeFilterCategory.keyword) ||
      recipes[i].description
        .toLowerCase()
        .includes(activeFilterCategory.keyword)
    ) {
      recipeKeywordFound = true;
    }
    // some
    let ingredientKeywordMatch = false;
    for (let g = 0; g < recipes[i].ingredients.length; g++) {
      if (
        recipes[i].ingredients[g].ingredient
          .toLowerCase()
          .includes(activeFilterCategory.keyword)
      ) {
        ingredientKeywordMatch = true;
      }
    }

    if (recipeKeywordFound || ingredientKeywordMatch) {
      recipeKeywordFound = true;
    }

    if (
      allIngredientsMatch &&
      allUstensilsMatch &&
      allAppliancesMatch &&
      recipeKeywordFound
    ) {
      matchingRecipes.push(recipes[i]);
    }
  }

  return matchingRecipes;
}

/**
 * Show filters based on remain recipes
 * @param {Object} recipeCategory
 * @param {HTMLElement} filterContainer
 */
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

/**
 * Display searched recipes cards and display error msg
 * @param {Object} matchingRecipes array of recipes corresponding to filters
 */
function displayRecipeCard(matchingRecipes) {
  // Remove duplicate recipe
  matchingRecipes = [...new Set(matchingRecipes)];

  // Clear all recipe cards
  document.querySelector(".recipes_section").innerHTML = "";

  // Display searched recipe cards
  displayRecipes(matchingRecipes);

  if (matchingRecipes.length == 0) {
    const recipeSection = document.querySelector(".recipes_section");
    const typedValue = document.querySelector(".research").value;

    const errorMsg = createElement("p", { class: "no_result" });
    errorMsg.innerText = `Aucune recette ne contient "${typedValue}" vous pouvez chercher "Limonade de coco", "Tarte au thon", etc.`;

    recipeSection.append(errorMsg);
  }
}
