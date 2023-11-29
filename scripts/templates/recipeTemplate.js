export function displayRecipes(recipes) {
  const totalRecipes = document.querySelector(".total_recipes");

  totalRecipes.innerText = `${recipes.length} recettes`;

  recipes.forEach((recipe) => {
    const recipesSection = document.querySelector(".recipes_section");

    // Create dom elements
    const recipeCard = document.createElement("article");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const labelTime = document.createElement("span");
    const descriptionContainer = document.createElement("div");
    const recipeTitle = document.createElement("h3");
    const recipeWrapper = document.createElement("div");
    const recipeTitleDesc = document.createElement("p");
    const recipeDescription = document.createElement("p");
    const recipeIngredientWrapper = document.createElement("div");
    const ingredientTitle = document.createElement("p");
    const ingredientWrapper = document.createElement("div");

    // Set attributes (class, src...)
    recipeCard.setAttribute("class", "recipe_card");
    imgContainer.setAttribute("class", "img_container");
    img.setAttribute("class", "recipe_img");
    img.setAttribute("src", `../assets/recipes/${recipe.image}`);
    img.setAttribute("alt", recipe.name);
    labelTime.setAttribute("class", "label_time");
    descriptionContainer.setAttribute("class", "recipe_description_container");
    recipeTitle.setAttribute("class", "recipe_title");
    recipeWrapper.setAttribute("class", "recipe_wrapper");
    recipeTitleDesc.setAttribute("class", "title_description");
    recipeDescription.setAttribute("class", "recipe_description");
    recipeIngredientWrapper.setAttribute("class", "recipe_wrapper");
    ingredientTitle.setAttribute("class", "title_description");
    ingredientWrapper.setAttribute("class", "ingredient_wrapper");

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
      const ingredientContainer = document.createElement("div");
      const ingredients = document.createElement("span");
      const unit = document.createElement("span");

      ingredientContainer.setAttribute("class", "ingredient_container");
      ingredients.setAttribute("class", "ingredient");
      unit.setAttribute("class", "unit");

      ingredients.innerText = ingredient.ingredient;
      unit.innerText = `${ingredient.quantity ? ingredient.quantity : ""}${ingredient.unit ? ingredient.unit : ""}`
      
      ingredientWrapper.append(ingredientContainer);
      ingredientContainer.append(ingredients);
      ingredientContainer.append(unit);
    });
  });
}
