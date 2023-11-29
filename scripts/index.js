import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filters.js";

displayRecipes(recipes);
filtersTemplate(recipes);