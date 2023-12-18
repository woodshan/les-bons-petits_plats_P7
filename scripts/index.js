import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filtersTemplate.js";
import { activeFilterCategory } from "./templates/selectFilter.js";
import { sort } from "./utils/sort.js";

// MAIN RESEARCH
let mainResearch = document.querySelector(".research");

function main() {
  // Display recipes cards
  displayRecipes(recipes);

  // Handle & display filters
  filtersTemplate(recipes);

  mainResearch.addEventListener("input", (e) => {
    // User typed >= 3 character
    if (e.target.value.length >= 3) {
      // Transform user typed value
      const value = e.target.value.toLowerCase();
      // Set keyword property w/user typed value
      activeFilterCategory.keyword = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
      activeFilterCategory.keyword = "";
    }

    // Handle searched recipes
    sort(activeFilterCategory);
  });
}

window.addEventListener("load", () => {
  main();
});
