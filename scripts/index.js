import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filtersTemplate.js";

// Array without duplicate elements
let recipeArr = { ingredients: [], appliances: [], ustensils: [], keyword: "" };

let research = document.querySelector(".research");

function main() {
  displayRecipes(recipes);

  filtersTemplate(recipes, recipeArr);

  research.addEventListener("input", (e) => {
    console.log(recipeArr.ingredients)
  })
}

window.addEventListener("load", () => {
  main();
});