import { createElement } from "../utils/createElement.js";
import { sort } from "../utils/sort.js";

const activeFiltersSection = document.querySelector(".filters_active_section");

// Update active filters array
let updatedActiveFiltersArr = [];

/**
 * Select/Unselect filter choices
 * @param {HTMLElement} button clicked btn
 * @param {Object} activeFiltersArray
 */
export function selectFilter(button, activeFiltersArray) {
  const isActive = button.classList.contains("btn_active");

  if (!isActive) {
    // Active filter
    activeFiltersArray = activateFilter(button);
  } else {
    // Desactive filter
    activeFiltersArray = desactivateFilter(button);
  }

  // Display actives filters
  displayActiveFilters(activeFiltersArray);

  sort(activeFiltersArray);

  return activeFiltersArray;
}

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
  updatedActiveFiltersArr.push(activeFilter);

  // Remove filter active on click filter active btn
  removebtn.addEventListener("click", () => {
    updatedActiveFiltersArr = desactivateFilter(
      button,
      removebtn.parentElement
    );
  });

  return updatedActiveFiltersArr;
}

/**
 * Handle active filters
 * @param {HTMLElement} button
 * @param {HTMLElement} filterToRemove
 */
function desactivateFilter(button, filterToRemove) {
  const filterValue = button.value.toLowerCase();

  // Remove clicked filter active from array
  updatedActiveFiltersArr = updatedActiveFiltersArr.filter(
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
  if (updatedActiveFiltersArr.length === 0) {
    activeFiltersSection.classList.add("hidden");
  }

  return updatedActiveFiltersArr;
}

/**
 *
 * @param {Object} activeFiltersArray
 */
function displayActiveFilters(activeFiltersArray) {
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

// import { createElement } from "../utils/createElement.js";
// import { sort } from "../utils/sort.js";

// const activeFiltersSection = document.querySelector(".filters_active_section");
// // Array of filters active
// let activeFiltersArray = [];

// /**
//  * Select/Unselect filter choices
//  * @param {HTMLElement} button
//  */
// export function selectFilter(button) {
//   const isActive = button.classList.contains("btn_active");

//   if (!isActive) {
//     // Active filter
//     activateFilter(button);
//   } else {
//     // Desactive filter
//     desactivateFilter(button);
//   }

//   // Display actives filters
//   displayActiveFilters();
// }

// /**
//  * Handle active filters
//  * @param {HTMLElement} button
//  */
// function activateFilter(button) {
//   // Active selected btn
//   button.classList.add("btn_active");

//   // Display filter active section
//   activeFiltersSection.classList.remove("hidden");

//   const filterValue = button.innerText.toLowerCase();

//   const xMark = createElement("em", {
//     class: "fa-solid fa-circle-xmark",
//     role: "button",
//   });
//   button.append(xMark);

//   // Display filter active
//   const activeFilter = createElement("span", {
//     class: "btn_filter filter_active",
//     value: filterValue,
//   });
//   activeFilter.innerText = button.innerText;
//   const removebtn = createElement("button", {
//     class: "fa-solid fa-xmark remove_filter",
//   });
//   activeFilter.append(removebtn);

//   // Add active filter to array
//   activeFiltersArray.push(activeFilter);

//   // Remove filter active on click filter active btn
//   removebtn.addEventListener("click", () => {
//     desactivateFilter(button, removebtn.parentElement);
//   });
// }

// /**
//  * Handle active filters
//  * @param {HTMLElement} button
//  * @param {HTMLElement} filterToRemove
//  */
// function desactivateFilter(button, filterToRemove) {
//   const filterValue = button.value.toLowerCase();

//   // Remove clicked filter active from array
//   activeFiltersArray = activeFiltersArray.filter(
//     (filt) => filt.getAttribute("value").toLowerCase() !== filterValue
//   );

//   // Remove filter active
//   if (filterToRemove) {
//     filterToRemove.remove();
//   }

//   // Desactivate active button in scrolling menu
//   button.classList.remove("btn_active");
//   button.querySelector("em").remove();

//   // Remove filters active section if no filter is active
//   if (activeFiltersArray.length === 0) {
//     activeFiltersSection.classList.add("hidden");
//   }
// }

// function displayActiveFilters() {
//   // Clear filters
//   activeFiltersSection.innerHTML = "";

//   // Display active filters
//   activeFiltersArray.forEach((filt) => {
//     activeFiltersSection.append(filt);
//   });

//   // Remove filters active section if no filter is active
//   if (activeFiltersArray.length === 0) {
//     activeFiltersSection.classList.add("hidden");
//   }
// }
