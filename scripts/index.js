import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filtersTemplate.js";
import { sort } from "./utils/sort.js";

// // Select filters
const filters = document.querySelectorAll(".filter");

// // Array without duplicate elements
// let recipeArr = {"ingredients": [], "appliances": [],"ustensils": []};


// Array of filters active
// let activeFiltersArray = [];

function main() {
  displayRecipes(recipes);

  
  filtersTemplate(recipes);

  // console.log(recipeArr);
}

window.addEventListener("load", () => {
  main();
});
