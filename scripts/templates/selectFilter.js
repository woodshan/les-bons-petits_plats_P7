import { createElement } from "../utils/createElement.js";
import { sort } from "../utils/sort.js";

// Array of searched values
export const activeFilterCategory = {
  ingredients: [],
  appliances: [],
  ustensils: [],
  keyword: "",
};

const activeFiltersSection = document.querySelector(".filters_active_section");

// Array of filters active (HTMLElement)
let activeFiltersArray = [];

/**
 * Select/Unselect filter choices & display actives filters
 * @param {HTMLElement} button
 */
export function selectFilter(button) {
  const isActive = button.classList.contains("btn_active");

  if (!isActive) {
    // Enable filter
    enableFilter(button);
  } else {
    // Disable filter
    disableFilter(button, "");
  }

  // Display actives filters
  displayActiveFilters();
}

/**
 * Handle active filters
 * @param {HTMLElement} button
 */
function enableFilter(button) {
  // Active selected btn
  button.classList.add("btn_active");

  // Display filter active section
  activeFiltersSection.classList.remove("hidden");

  const filterValue = button.innerText.toLowerCase();

  // Display X btn
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

  // Push selected value in activeFilterCategory
  const filter =
    button.parentElement.parentElement.querySelector(".btn_filter").value;
  if (filter == "ingredients") {
    activeFilterCategory.ingredients.push(button.getAttribute("value"));
  } else if (filter == "appliances") {
    activeFilterCategory.appliances.push(button.getAttribute("value"));
  } else if (filter == "ustensils") {
    activeFilterCategory.ustensils.push(button.getAttribute("value"));
  }

  // Remove filter active on click filter active btn
  removebtn.addEventListener("click", () => {
    disableFilter(button, removebtn.parentElement);
  });

  // Handle searched recipes using selected values
  sort(activeFilterCategory);
}

/**
 * Handle active filters
 * @param {HTMLElement} button
 * @param {HTMLElement} filterToRemove
 */
function disableFilter(button, filterToRemove) {
  const filterValue = button.value.toLowerCase();

  // Remove clicked filter active from array
  activeFiltersArray = activeFiltersArray.filter(
    (filt) => filt.getAttribute("value").toLowerCase() !== filterValue
  );

  // Remove filter active
  if (filterToRemove && filterToRemove !== "") {
    filterToRemove.remove();
  }

  // Disable active button in scrolling menu
  button.classList.remove("btn_active");
  button.querySelector("em").remove();

  // Remove filters active section if no filter is active
  if (activeFiltersArray.length === 0) {
    activeFiltersSection.classList.add("hidden");
  }

  // Remove selected value in activeFilterCategory
  const filter =
    button.parentElement.parentElement.querySelector(".btn_filter").value;
  if (filter == "ingredients") {
    activeFilterCategory.ingredients = activeFilterCategory.ingredients.filter(
      (ingredient) => ingredient !== button.getAttribute("value")
    );
  } else if (filter == "appliances") {
    activeFilterCategory.appliances = activeFilterCategory.appliances.filter(
      (appliance) => appliance !== button.getAttribute("value")
    );
  } else if (filter == "ustensils") {
    activeFilterCategory.ustensils = activeFilterCategory.ustensils.filter(
      (ustensil) => ustensil !== button.getAttribute("value")
    );
  }

  // Handle searched recipes using remaining values
  sort(activeFilterCategory);
}

function displayActiveFilters() {
  // Clear active filters
  activeFiltersSection.innerHTML = "";

  // Display active filters
  activeFiltersArray.forEach((filt) => {
    activeFiltersSection.append(filt);
  });

  // Hide filters active section if no filter is active
  if (activeFiltersArray.length === 0) {
    activeFiltersSection.classList.add("hidden");
  }
}
