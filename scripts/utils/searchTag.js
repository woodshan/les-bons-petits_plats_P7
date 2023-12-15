import { recipeArr } from "../templates/filtersTemplate.js";

// Array of searched value
let searchedFilter = [];

/**
 * Handle ssearch tag
 * @param {HTMLElement} filter selected filter
 * @param {Object} e event
 */
export function searchTag(filter, e) {
  // Handle search on each filter
  switch (filter.children[0].value) {
    case "ingredients":
      searchEachFilter(filter, e.target.value, recipeArr.ingredients);
      break;
    case "appliances":
      searchEachFilter(filter, e.target.value, recipeArr.appliances);
      break;
    case "ustensils":
      searchEachFilter(filter, e.target.value, recipeArr.ustensils);
      break;
    default:
      console.log("Cette valeur n'existe pas");
  }
}

/**
 * Display searched filter
 * @param {HTMLElement} filter selected filter
 * @param {String} value typed value
 * @param {Object} recipeCategory category of filter value remaining
 */
function searchEachFilter(filter, value, recipeCategory) {
  let filtersContainer = filter.children[1];

  // If user typed value is not empty
  if (value !== "") {
    // Get array of searched value using typed value
    searchedFilter = recipeCategory.filter((recipe) =>
      // Get all tags start with user typed value or if value >= 3character get tags includes user typed value
      recipe.startsWith(value.toLocaleLowerCase()) || value.length >= 3
        ? recipe.includes(value.toLocaleLowerCase())
        : ""
    );

    filtersContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      // Hide all filters buttons
      btn.classList.add("hidden");

      // Show searched filter btn
      searchedFilter.forEach((filtValue) => {
        if (filtValue == btn.value) {
          btn.classList.remove("hidden");
        }
      });
    });
  } else {
    // Show all filters buttons
    filtersContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      recipeCategory.forEach((filt) => {
        if (filt == btn.value) {
          btn.classList.remove("hidden");
        }
      });
    });

    console.log("Aucun filtre recherché");
  }
}
