import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filtersTemplate.js";
import { sort } from "./utils/sort.js";

// Array of remaining tags
let recipeArr = { ingredients: [], appliances: [], ustensils: []};

// Array of searched filters/values
let activeFilterCategory = {
  ingredients: [],
  appliances: [],
  ustensils: [],
  keyword: "",
};

let mainResearch = document.querySelector(".research");

function main() {
  displayRecipes(recipes);

  filtersTemplate(recipes, recipeArr, activeFilterCategory);

  mainResearch.addEventListener("input", (e) => {
    if(e.target.value.length >= 3) {
      const value = e.target.value.toLowerCase();
      activeFilterCategory.keyword = value;
    } else {
      activeFilterCategory.keyword = "";
    }
    
    sort(activeFilterCategory, recipeArr);
  })
}

window.addEventListener("load", () => {
  main();
});