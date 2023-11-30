/**
 * Create dom elements & Set attributes
 * @param {String} elementType 
 * @param {Object} attributes 
 * @returns {HTMLElement}
 */
export function createElement(elementType, attributes) {
    const element = document.createElement(elementType);

    // Transform object in array containing arrays of key-value pairs & Extract key value from array
    for(const [attr, value] of Object.entries(attributes)) {
        if(value !== null) {
           element.setAttribute(attr, value);
        }
    }

    return element
}