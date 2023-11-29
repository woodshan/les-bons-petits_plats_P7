export function filtersTemplate(recipes) {
    const buttons = document.querySelectorAll(".btn_filter");
    let isVisible = false;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
        const parentElement = btn.parentElement == document.querySelector(".filter") ? btn.parentElement : btn.parentElement.parentElement;
            if(!isVisible) {
                showFilter(btn, parentElement);
                isVisible = true;
            } else {
               hideFilter(btn, parentElement); 
               isVisible = false;
            }
        })
    })
}

function showFilter(btn, parentElement) {
    const filter = document.querySelector(".filter_expanded");
    const chevron = btn.querySelector(".fa-chevron-down");

    filter.classList.remove("hidden");
    chevron.classList.remove("down");
    chevron.classList.add("up");

    parentElement.classList.add("show_filter");
}

function hideFilter(btn, parentElement) {
    const filter = document.querySelector(".filter_expanded");
    const chevron = btn.querySelector(".fa-chevron-down");

    filter.classList.add("hidden");
    chevron.classList.remove("up");
    chevron.classList.add("down");
    
    parentElement.classList.remove("show_filter");  
}