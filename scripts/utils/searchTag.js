let searchedFilter = [];

export function searchFilter(filter, e, recipeArr) {
  switch (filter.children[0].value) {
    case "ingredients":
      searchEachFilter(filter, e.target.value, recipeArr.ingredients);
      break;
    case "appliances":
      searchEachFilter(filter, e.target.value, recipeArr.appliances);
      break;
    case "ustensils":
      searchEachFilter(filter, e.target.value, recipeArr.ustensils);
      break;
    default:
      console.log("Cette valeur n'existe pas");
  }
}

/**
 * Display searched filter
 * @param {HTMLElement} filter
 * @param {String} value
 * @param {Object} recipeArr
 */
function searchEachFilter(filter, value, recipeArr) {
  let filtersContainer = filter.children[1];

  if (value !== "") {
    // Get array of searched value using typed value
    searchedFilter = recipeArr.filter((ingr) =>
      ingr.startsWith(value.toLocaleLowerCase()) || value.length >= 3
        ? ingr.includes(value.toLocaleLowerCase())
        : ""
    );

    filtersContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      // Hide all filters buttons
      btn.classList.add("hidden");

      // Show searched filter
      searchedFilter.forEach((filtValue) => {
        if (filtValue == btn.value) {
          btn.classList.remove("hidden");
        }
      });
    });
  } else {
    // Show all filters buttons
    // filtersContainer
    //   .querySelectorAll(".btn_filter")
    //   .forEach((btn) => btn.classList.remove("hidden"));

    filtersContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      recipeArr.forEach((filt) => {
        if(filt == btn.value) {
          btn.classList.remove("hidden");
        }
      })
    });

    console.log("Aucun filtre recherché");
  }
}
