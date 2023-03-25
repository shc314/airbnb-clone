const header = document.querySelector('header');

document.addEventListener('scroll', (event) => {
    header.classList.add('header-bottom-border');
    if(window.scrollY == 0) {
        header.classList.remove('header-bottom-border');
    }
});