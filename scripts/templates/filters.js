export function filtersTemplate(recipes) {
  const filters = document.querySelectorAll(".filter");

  filters.forEach((filter) => {
    let isVisible = false;

    filter.addEventListener("click", (e) => {
      // Select button
      let button =
        e.target.value == undefined ? e.target.parentElement : e.target;
      button = button.classList.value !== "btn_filter" ? undefined : button;

      if (!isVisible) {
        showFilter(filter);
        displayFilter(recipes, button);
        isVisible = true;
      } else if (isVisible && button !== undefined) {
        if (
          button.value == "ingredient" ||
          button.value == "appliance" ||
          button.value == "ustensils"
        ) {
          hideFilter(filter);
          isVisible = false;
        } else {
          selectFilter(button);
        }
      }
    });
  });
}

/**
 *
 * @param {HTMLElement} filter
 */
function showFilter(filter) {
  const filterHide = filter.querySelector(".filter_expanded");
  const chevron = filter.querySelector(".fa-chevron-down");

  filterHide.classList.remove("hidden");
  chevron.classList.remove("down");
  chevron.classList.add("up");

  filter.classList.add("show_filter");
}

/**
 *
 * @param {HTMLElement} filter
 */
function hideFilter(filter) {
  const filterHide = filter.querySelector(".filter_expanded");
  const chevron = filter.querySelector(".fa-chevron-down");

  filterHide.classList.add("hidden");
  chevron.classList.remove("up");
  chevron.classList.add("down");

  filter.classList.remove("show_filter");
}

function displayFilter(recipes, button) {
  // Array without duplicate elements
  let recipeArr;

  switch (button.value) {
    case "ingredient":
      recipeArr = [];

      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingredient = ingredient.ingredient;
          recipeArr.push(ingredient.toLowerCase());
        });
      });

      recipeArr = [...new Set(recipeArr)];
      break;
    case "appliance":
      recipeArr = [];

      recipes.forEach((recipe) => {
        recipeArr.push(recipe.appliance.toLowerCase());
      });

      recipeArr = [...new Set(recipeArr)];
      break;
    case "ustensils":
      recipeArr = [];

      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          recipeArr.push(ustensil.toLowerCase());
        });
      });

      recipeArr = [...new Set(recipeArr)];

      break;
    default:
      console.log("Cette valeur n'existe pas.");
  }

  recipeArr.forEach((element) => {
    const btnElement = document.createElement("button");

    btnElement.setAttribute("class", "btn_filter");
    btnElement.setAttribute("value", element);

    // Capitalize first letter
    btnElement.innerText = element.replace(/^\w/, (c) => c.toUpperCase());

    button.parentElement.querySelector(".filter_expanded").append(btnElement);
  });
}

function selectFilter(button) {
  button.classList.add("btn_active");

  const xMark = document.createElement("em");

  xMark.setAttribute("class", "fa-solid fa-circle-xmark");
  xMark.setAttribute("role", "button");

  button.append(xMark);
}

function unSelectFilter(button) {
  button.classList.remove("btn_active");

  button.querySelector("em").remove();
}
