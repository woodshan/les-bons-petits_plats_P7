import { createElement } from "../utils/createElement.js";
import { sort } from "../utils/sort.js";

// Select filters
const filters = document.querySelectorAll(".filter");

// Array without duplicate elements
let recipeArr = {"ingredients": [], "appliances": [],"ustensils": []};

export function filtersTemplate(recipes) {
  filters.forEach((filter) => {
    displayFiltersCategories(filter, recipes);

    filter.addEventListener("click", (e) => {
      // Select button
      let button =
        e.target.value == undefined ? e.target.parentElement : e.target;

      if (
        button.value == "ingredients" ||
        button.value == "appliances" ||
        button.value == "ustensils"
      ) {
        showFilter(filter);
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
 * add filters values to array & Display filters btn
 * @param {HTMLElement} filter
 * @param {Object} recipes recipes data
 */
function displayFiltersCategories(filter, recipes) {
  // Select filter
  let filterValue = filter.children[0].value;
  let openFilterContainer = filter.children[1];

  switch (filterValue) {
    case "ingredients":
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingredient = ingredient.ingredient;
          recipeArr.ingredients.push(ingredient.toLowerCase());
        });
      });
      
      // Create array without duplicate elements
      recipeArr.ingredients = [...new Set(recipeArr.ingredients)];

      // Display dom element for each filters
      displayFilters(recipeArr.ingredients, openFilterContainer);
      break;
    case "appliances":
      recipes.forEach((recipe) => {
        recipeArr.appliances.push(recipe.appliance.toLowerCase());
      });

      // Create array without duplicate elements
      recipeArr.appliances = [...new Set(recipeArr.appliances)];

      // Display dom element for each filters
      displayFilters(recipeArr.appliances, openFilterContainer);
      break;
    case "ustensils":
      recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          recipeArr.ustensils.push(ustensil.toLowerCase());
        });
      });

      // Create array without duplicate elements
      recipeArr.ustensils = [...new Set(recipeArr.ustensils)];

      // Display dom element for each filters
      displayFilters(recipeArr.ustensils, openFilterContainer);
      break;
    default:
      console.log("Cette valeur n'existe pas.");
  }
}

/**
 * Display filters btn in each filter
 * @param {Object} recipeArrCategory 
 * @param {HTMLElement} container
 */
export function displayFilters(recipeArrCategory, container) {
  // Display dom element for each filters
  recipeArrCategory.forEach((element) => {
    const btnElement = createElement("button", {
      class: "btn_filter",
      value: element,
    });

    // Capitalize first letter
    btnElement.innerText = element.replace(/^\w/, (c) => c.toUpperCase());

    container.append(btnElement);
  });
}

/**
 * Select/Unselect filter choices
 * @param {HTMLElement} button
 */
function selectFilter(button) {
  const isActive = button.classList.contains("btn_active");

  if (!isActive) {
    // Active filter
    activateFilter(button);
  } else {
    // Desactive filter
    desactivateFilter(button);
  }

  // Display actives filters
  displayActiveFilters();
}


const activeFiltersSection = document.querySelector(".filters_active_section");
// Array of filters active
let activeFiltersArray = [];
/**
 * Handle active filters
 * @param {HTMLElement} button
 */
function activateFilter(button) {
  // Active selected btn
  button.classList.add("btn_active");

  // Display filter active section
  activeFiltersSection.classList.remove("hidden");

  const filterValue = button.innerText.toLowerCase();

  const xMark = createElement("em", {
    class: "fa-solid fa-circle-xmark",
    role: "button",
  });
  button.append(xMark);

  // Display filter active
  const activeFilter = createElement("span", {
    class: "btn_filter filter_active",
    value: filterValue,
  });
  activeFilter.innerText = button.innerText;
  const removebtn = createElement("button", {
    class: "fa-solid fa-xmark remove_filter",
  });
  activeFilter.append(removebtn);

  // Add active filter to array
  activeFiltersArray.push(activeFilter);

  // Remove filter active on click filter active btn
  removebtn.addEventListener("click", () => {
    desactivateFilter(button, removebtn.parentElement);
  });
}

/**
 * Handle active filters
 * @param {HTMLElement} button
 * @param {HTMLElement} filterToRemove
 */
function desactivateFilter(button, filterToRemove) {
  const filterValue = button.value.toLowerCase();

  // Remove clicked filter active from array
  activeFiltersArray = activeFiltersArray.filter(
    (filt) => filt.getAttribute("value").toLowerCase() !== filterValue
  );

  // Remove filter active
  if (filterToRemove) {
    filterToRemove.remove();
  }

  // Desactivate active button in scrolling menu
  button.classList.remove("btn_active");
  button.querySelector("em").remove();

  // Remove filters active section if no filter is active
  if (activeFiltersArray.length === 0) {
    activeFiltersSection.classList.add("hidden");
  }
}

function displayActiveFilters() {
  // Clear filters
  activeFiltersSection.innerHTML = "";

  // Display active filters
  activeFiltersArray.forEach((filt) => {
    activeFiltersSection.append(filt);
  });

  // Remove filters active section if no filter is active
  if (activeFiltersArray.length === 0) {
    activeFiltersSection.classList.add("hidden");
  }
}


sort(filters, recipeArr, activeFiltersArray);