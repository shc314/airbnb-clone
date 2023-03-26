// Adds and removes bottom border of header on scroll
const header = document.querySelector('header');

document.addEventListener('scroll', (event) => {
    header.classList.add('header-bottom-border');
    if(window.scrollY == 0) {
        header.classList.remove('header-bottom-border');
    }
});

/* ================ Category carousel ================ */
const leftCarouselButton = document.querySelector('#carousel-arrow-prev');
const rightCarouselbutton = document.querySelector('#carousel-arrow-next');
const categoryContainer = document.querySelector('.carousel-category-container');

// Show left carousel button when scrolled past the starting position
categoryContainer.addEventListener('scroll', showLeftButton);
function showLeftButton() {
    if(categoryContainer.scrollLeft == 0) {
        leftCarouselButton.classList.add('carousel-arrow-hidden');
    } else {
        leftCarouselButton.classList.remove('carousel-arrow-hidden');
    }
}

// Advance the category carousel when right button is clicked
leftCarouselButton.onclick = () => {
    categoryContainer.scrollLeft -= categoryContainer.offsetWidth * .72;
}

// Scroll to the left when the left button is clicked
rightCarouselbutton.onclick = () => {
    categoryContainer.scrollLeft += categoryContainer.offsetWidth * .72;
}