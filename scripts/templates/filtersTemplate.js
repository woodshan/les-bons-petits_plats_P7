import { createElement } from "../utils/createElement.js";
import { selectFilter } from "./activeFilters.js";
import { searchFilter } from "../utils/searchFilter.js";

// Select filters
const filters = document.querySelectorAll(".filter");

// // Array without duplicate elements
// let recipeArr = { ingredients: [], appliances: [], ustensils: [] };

export function filtersTemplate(recipes, recipeArr) {

  filters.forEach((filter) => {
    displayFiltersCategories(filter, recipes, recipeArr, displayFilters);

    filter.addEventListener("click", (e) => {
      // Select button
      let button =
        e.target.value == undefined ? e.target.parentElement : e.target;

      if (
        button.value == "ingredients" ||
        button.value == "appliances" ||
        button.value == "ustensils"
      ) {
        showFilter(filter);
      } else if (button.classList.contains("btn_filter")) {
        selectFilter(button, recipeArr);
      }
    });

    filter.querySelector(".research_filter").addEventListener("input", (e) => {
      searchFilter(filter, e, recipeArr);
    });
  });
}

/**
 * Show/Hide filter
 * @param {HTMLElement} filter
 */
function showFilter(filter) {
  const filterHide = filter.querySelector(".filter_expanded");
  const chevron = filter.querySelector(".fa-chevron-down");

  filterHide.classList.toggle("hidden");

  chevron.classList.toggle("down");
  chevron.classList.toggle("up");

  filter.classList.toggle("show_filter");
}

/**
 * add filters values to array & Display filters btn
 * @param {HTMLElement} filter
 * @param {Object} recipes recipes data
 */
export function displayFiltersCategories(filter, recipes, recipeArr, displayFilters) {
  // Select filter
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
 * @param {Object} recipeArrCategory
 * @param {HTMLElement} container
 */
function displayFilters(recipeArrCategory, container) {
  // Display dom element for each filters
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