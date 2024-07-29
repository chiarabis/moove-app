export function handleHamburgerMenu(hamburger: HTMLDivElement, navMenu: HTMLUListElement, hamburgerIcon: HTMLImageElement): void {
    hamburger.addEventListener('click', () => {
        if (navMenu.style.opacity === '1') {
            navMenu.style.opacity = '0';
            navMenu.style.pointerEvents = 'none';
            hamburgerIcon.src = './assets/hamburger.png';
        } else {
            navMenu.style.opacity = '1';
            navMenu.style.pointerEvents = 'auto';
            hamburgerIcon.src = './assets/close.png';
        }
    });
};