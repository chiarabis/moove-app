export function capitalizeFirstLetter(string: string): string{
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function getElementById<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element with id ${id} not found`);
    return element as T;
};

export function getElementByClass<T extends HTMLElement>(className: string): T {
    const element = document.querySelector(`.${className}`);
    if (!element) throw new Error(`Element with class ${className} not found`);
    return element as T;
};