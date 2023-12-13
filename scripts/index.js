import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filtersTemplate.js";
import { activeFilterCategory } from "./templates/selectFilter.js";
import { sort } from "./utils/sort.js";

let mainResearch = document.querySelector(".research");

function main() {
  displayRecipes(recipes);

  filtersTemplate(recipes);

  mainResearch.addEventListener("input", (e) => {
    if(e.target.value.length >= 3) {
      const value = e.target.value.toLowerCase();
      activeFilterCategory.keyword = value;
    } else {
      activeFilterCategory.keyword = "";
    }
    
    sort(activeFilterCategory);
  })
}

window.addEventListener("load", () => {
  main();
});