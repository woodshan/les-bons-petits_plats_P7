let searchedFilter = [];

export function sort(filters, recipeArr, activeFiltersArray) {
  filters.forEach((filter) => {
    switch (filter.children[0].value) {
      case "ingredients":
        let searchIngredients = filter.querySelector(".research_filter");

        searchIngredients.addEventListener("input", (e) => {
          searchEachFilter(filter, e.target.value, recipeArr.ingredients);
        });

        break;
      case "appliances":
        let searchAppliances = filter.querySelector(".research_filter");

        searchAppliances.addEventListener("input", (e) => {
          searchEachFilter(filter, e.target.value, recipeArr.appliances);
        });

        break;
      case "ustensils":
        let searchUstensils = filter.querySelector(".research_filter");

        searchUstensils.addEventListener("input", (e) => {
          searchEachFilter(filter, e.target.value, recipeArr.ustensils);
        });

        break;
      default:
        console.log("Cette valeur n'existe pas");
    }
  });
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
    searchedFilter = recipeArr.filter(
      (ingr) => ingr.startsWith(value) || ingr.includes(value)
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
    // Hide all filters buttons
    filtersContainer
      .querySelectorAll(".btn_filter")
      .forEach((btn) => btn.classList.remove("hidden"));

    console.log("Aucun filtre recherché");
  }
}
