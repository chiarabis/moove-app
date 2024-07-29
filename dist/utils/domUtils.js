export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
;
export function getElementById(id) {
    const element = document.getElementById(id);
    if (!element)
        throw new Error(`Element with id ${id} not found`);
    return element;
}
;
export function getElementByClass(className) {
    const element = document.querySelector(`.${className}`);
    if (!element)
        throw new Error(`Element with class ${className} not found`);
    return element;
}
;
/*export function createOption(value: string, text: string): HTMLOptionElement {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    return option;
};*/ 
