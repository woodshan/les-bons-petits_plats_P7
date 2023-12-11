import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filtersTemplate.js";

function main() {
  displayRecipes(recipes);

  filtersTemplate(recipes);
}

window.addEventListener("load", () => {
  main();
});
