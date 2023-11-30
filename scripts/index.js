import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filters.js";

window.addEventListener("load", () => {
  displayRecipes(recipes);
  filtersTemplate(recipes);
});
