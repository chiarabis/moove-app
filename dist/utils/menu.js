export function handleHamburgerMenu(hamburger, navMenu, hamburgerIcon) {
    hamburger.addEventListener('click', () => {
        if (navMenu.style.opacity === '1') {
            navMenu.style.opacity = '0';
            navMenu.style.pointerEvents = 'none';
            hamburgerIcon.src = './assets/hamburger.png';
        }
        else {
            navMenu.style.opacity = '1';
            navMenu.style.pointerEvents = 'auto';
            hamburgerIcon.src = './assets/close.png';
        }
    });
}
;
