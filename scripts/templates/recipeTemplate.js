import { createElement } from "../utils/createElement.js";

export function displayRecipes(recipes) {
  const totalRecipes = document.querySelector(".total_recipes");

  totalRecipes.innerText = `${recipes.length} recettes`;

  recipes.forEach((recipe) => {
    const recipesSection = document.querySelector(".recipes_section");

    // Create dom elements & Set attributes (class, src...)
    const recipeCard = createElement("article", {
      class: "recipe_card",
      "data-id": recipe.id,
    });
    const imgContainer = createElement("div", { class: "img_container" });
    const img = createElement("img", {
      class: "recipe_img",
      src: `../assets/recipes/${recipe.image}`,
      alt: recipe.name,
    });
    const labelTime = createElement("span", { class: "label_time" });
    const descriptionContainer = createElement("div", {
      class: "recipe_description_container",
    });
    const recipeTitle = createElement("h3", { class: "recipe_title" });
    const recipeWrapper = createElement("div", { class: "recipe_wrapper" });
    const recipeTitleDesc = createElement("p", { class: "title_description" });
    const recipeDescription = createElement("p", {
      class: "recipe_description",
    });
    const recipeIngredientWrapper = createElement("div", {
      class: "recipe_wrapper",
    });
    const ingredientTitle = createElement("p", { class: "title_description" });
    const ingredientWrapper = createElement("div", {
      class: "ingredient_wrapper",
    });

    // Inner text
    labelTime.innerText = `${recipe.time}min`;
    recipeTitle.innerText = recipe.name;
    recipeTitleDesc.innerText = "recette";
    recipeDescription.innerText = recipe.description;
    ingredientTitle.innerText = "ingrédients";

    // Display dom elements
    recipesSection.append(recipeCard);
    recipeCard.append(imgContainer);
    imgContainer.append(img);
    imgContainer.append(labelTime);
    recipeCard.append(descriptionContainer);
    descriptionContainer.append(recipeTitle);
    descriptionContainer.append(recipeWrapper);
    recipeWrapper.append(recipeTitleDesc);
    recipeWrapper.append(recipeDescription);
    descriptionContainer.append(recipeIngredientWrapper);
    recipeIngredientWrapper.append(ingredientTitle);
    recipeIngredientWrapper.append(ingredientWrapper);

    // Ingredients
    recipe.ingredients.forEach((ingredient) => {
      const ingredientContainer = createElement("div", {
        class: "ingredient_container",
      });
      const ingredients = createElement("span", { class: "ingredient" });
      const unit = createElement("span", { class: "unit" });

      ingredients.innerText = ingredient.ingredient;
      unit.innerText = `${ingredient.quantity ? ingredient.quantity : ""}${
        ingredient.unit ? ingredient.unit : ""
      }`;

      ingredientWrapper.append(ingredientContainer);
      ingredientContainer.append(ingredients);
      ingredientContainer.append(unit);
    });
  });
}
