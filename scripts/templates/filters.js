import { createElement } from "../utils/createElement.js";

const activeFilters = document.querySelector(".filters_active_section");
// Arr of filters values
let filteredArr = [];

export function filtersTemplate(recipes) {
  const filters = document.querySelectorAll(".filter");

  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      // Select button
      let button =
        e.target.value == undefined ? e.target.parentElement : e.target;

      if (
        button.value == "ingredient" ||
        button.value == "appliance" ||
        button.value == "ustensils"
      ) {
        showFilter(filter);
        displayFilter(recipes, button);
      } else if (button.classList.contains("btn_filter")) {
        selectFilter(button);
      }
    });
  });
}

/**
 * Show/Hide filter
 * @param {HTMLElement} filter
 */
function showFilter(filter) {
  const filterHide = filter.querySelector(".filter_expanded");
  const chevron = filter.querySelector(".fa-chevron-down");

  filterHide.classList.toggle("hidden");

  chevron.classList.toggle("down");
  chevron.classList.toggle("up");

  filter.classList.toggle("show_filter");
}

/**
 * Display filter choices
 * @param {Object} recipes
 * @param {HTMLElement} button
 */
function displayFilter(recipes, button) {
  // Array without duplicate elements
  let recipeArr = [];

  switch (button.value) {
    case "ingredient":
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingredient = ingredient.ingredient;
          recipeArr.push(ingredient.toLowerCase());
        });
      });
      break;
    case "appliance":
      recipes.forEach((recipe) => {
        recipeArr.push(recipe.appliance.toLowerCase());
      });
      break;
    case "ustensils":
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          recipeArr.push(ustensil.toLowerCase());
        });
      });
      break;
    default:
      console.log("Cette valeur n'existe pas.");
  }

  // Create array without duplicate elements
  recipeArr = [...new Set(recipeArr)];

  recipeArr.forEach((element) => {
    const btnElement = createElement("button", {
      class: "btn_filter",
      value: element,
    });

    // Capitalize first letter
    btnElement.innerText = element.replace(/^\w/, (c) => c.toUpperCase());

    button.parentElement.querySelector(".filter_expanded").append(btnElement);
  });
}


/**
 * Select/Unselect filter choices
 * @param {HTMLElement} button
 */
function selectFilter(button) {
  const isActive = button.classList.contains("btn_active");

  if (!isActive) {
    // Activate filter
    activateFilter(button);
  } else {
    // Desactivate filter
    desactivateFilter(button);
  }

  // Display actives filters
  displayActiveFilters();
}

function activateFilter(button) {
  button.classList.add("btn_active");
  activeFilters.classList.remove("hidden");

  const filterValue = button.innerText.toLowerCase();

  const xMark = createElement("em", {
    class: "fa-solid fa-circle-xmark",
    role: "button",
  });

  const activeFilter = createElement("span", {
    class: "btn_filter filter_active",
    value: filterValue,
  });
  activeFilter.innerText = button.innerText;

  const removebtn = createElement("button", {
    class: "fa-solid fa-xmark remove_filter",
  });
  activeFilter.append(removebtn);

  button.append(xMark);
  filteredArr.push(activeFilter);

  removebtn.addEventListener("click", () => {
    desactivateFilter(button, removebtn.parentElement);
  });
}

function desactivateFilter(button, filterToRemove) {
  const filterValue = button.value.toLowerCase();
  filteredArr = filteredArr.filter((filt) => filt.getAttribute("value").toLowerCase() !== filterValue);
  if(filterToRemove) {
    filterToRemove.remove();
  }
  
  button.classList.remove("btn_active");
  button.querySelector("em").remove();

  if(filteredArr.length === 0) {
    activeFilters.classList.add("hidden");
  }
}

function displayActiveFilters() {
  // Clear filters
  activeFilters.innerHTML = ""; 

  // Display active filters
  filteredArr.forEach((filt) => {
    activeFilters.append(filt);
  });

  if(filteredArr.length === 0) {
    activeFilters.classList.add("hidden");
  }
}