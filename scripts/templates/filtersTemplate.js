import { createElement } from "../utils/createElement.js";
import { selectFilter } from "./selectFilter.js";
import { searchTag } from "../utils/searchTag.js";

// Array of remaining tags
export const recipeArr = { ingredients: [], appliances: [], ustensils: [] };

// Select filters
const filters = document.querySelectorAll(".filter");

/**
 * Handle & display filters
 * @param {Object} recipes data
 */
export function filtersTemplate(recipes) {
  filters.forEach((filter) => {
    displayFiltersCategories(filter, recipes, displayFilters);

    filter.addEventListener("click", (e) => {
      // Select button
      let button =
        e.target.value == undefined ? e.target.parentElement : e.target;

      if (
        button.value == "ingredients" ||
        button.value == "appliances" ||
        button.value == "ustensils"
      ) {
        showFilter(filters, filter);
      } else if (button.classList.contains("btn_filter")) {
        selectFilter(button);
      }
    });

    // Search tag
    filter.querySelector(".research_filter").addEventListener("input", (e) => {
      searchTag(filter, e);
    });
  });
}

/**
 * Show/Hide filter
 * @param {HTMLElement} filters Array of filters
 * @param {HTMLElement} filter selected filter
 */
function showFilter(filters, filter) {
  filters.forEach((filt) => {
    // Show/hide clicked filter & hide all filters unselected
    if (filt == filter) {
      const filterHide = filter.querySelector(".filter_expanded");
      const chevron = filter.querySelector(".fa-chevron-down");

      filterHide.classList.toggle("hidden");

      chevron.classList.toggle("down");
      chevron.classList.toggle("up");

      filter.classList.toggle("show_filter");
    } else {
      filt.classList.remove("show_filter");
      filt.querySelector(".filter_expanded").classList.add("hidden");
      filt.querySelector(".fa-chevron-down").classList.add("down");
      filt.querySelector(".fa-chevron-down").classList.remove("up");
    }
  });
}

/**
 * Add filters values to array & Display filters btn
 * @param {HTMLElement} filter selected filter
 * @param {Object} recipes recipes data
 * @param {function} displayFilters display remaining filter btn
 */
export function displayFiltersCategories(filter, recipes, displayFilters) {
  let filterValue = filter.children[0].value;
  let openFilterContainer = filter.children[1];

  switch (filterValue) {
    case "ingredients":
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingredient = ingredient.ingredient;
          recipeArr.ingredients.push(ingredient.toLowerCase());
        });
      });

      // Create array without duplicate elements
      recipeArr.ingredients = [...new Set(recipeArr.ingredients)];

      // Display dom element for each filters
      displayFilters(recipeArr.ingredients, openFilterContainer);
      break;
    case "appliances":
      recipes.forEach((recipe) => {
        recipeArr.appliances.push(recipe.appliance.toLowerCase());
      });

      // Create array without duplicate elements
      recipeArr.appliances = [...new Set(recipeArr.appliances)];

      // Display dom element for each filters
      displayFilters(recipeArr.appliances, openFilterContainer);
      break;
    case "ustensils":
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          recipeArr.ustensils.push(ustensil.toLowerCase());
        });
      });

      // Create array without duplicate elements
      recipeArr.ustensils = [...new Set(recipeArr.ustensils)];

      // Display dom element for each filters
      displayFilters(recipeArr.ustensils, openFilterContainer);
      break;
    default:
      console.log("Cette valeur n'existe pas.");
  }
}

/**
 * Display filters btn in each filter
 * @param {Object} recipeArrCategory select tag category
 * @param {HTMLElement} container
 */
function displayFilters(recipeArrCategory, container) {
  // Display tags element for each filters
  recipeArrCategory.forEach((element) => {
    const btnElement = createElement("button", {
      class: "btn_filter",
      value: element,
    });

    // Capitalize first letter
    btnElement.innerText = element.replace(/^\w/, (c) => c.toUpperCase());

    container.append(btnElement);
  });
}
