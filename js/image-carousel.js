const images = document.querySelectorAll('.listing1');
images.forEach((image, index) => {
    image.style.transform = `translateX(${index * 100}%)`;
});

let currentImg = 0;
let lastImg = images.length - 1;

const nextImgButton = document.querySelector(".btn__next-photo");
const prevImgButton = document.querySelector(".btn__prev-photo");
const dotContainer = document.querySelector('.indicator-dot-inner-container');
let dotContainerPosition = 0;

nextImgButton.addEventListener('click', showNextImg);
prevImgButton.addEventListener('click', showPrevImg);

function showNextImg() {
    if (currentImg === lastImg) {
        nextImgButton.style.display = 'none';
    } else {
        currentImg++;
    }
    
    images.forEach((image, index) => {
        image.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });

    shiftIndicatorDotsLeft();
    highlightDot();
}

function showPrevImg() {
    if (currentImg === 0) {
        prevImgButton.style.display = 'none';
    } else {
        currentImg--;
    }

    images.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });

    shiftIndicatorDotsRight();
    highlightDot();
}

// Show or hide buttons when hovering over listing
const listing = document.querySelector('.listing');
listing.addEventListener('pointerenter', showButton);
listing.addEventListener('pointerleave', hideButton);

function showButton() {
    if (currentImg === lastImg) {
        nextImgButton.style.display = 'none';
        prevImgButton.style.display = 'block';
    } else if (currentImg === 0) {
        prevImgButton.style.display = 'none';
        nextImgButton.style.display = 'block';
    } else {
        nextImgButton.style.display = 'block';
        prevImgButton.style.display = 'block';
    }
}

function hideButton() {
    nextImgButton.style.display = 'none';
    prevImgButton.style.display = 'none';
}

// Creates a span with a dot for each image
function createIndicatorDots() {
    for(let i=0; i < images.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('indicator-dot');
        if(i==0) {
            dot.classList.add('indicator-dot-current');
        }
        dotContainer.appendChild(dot);
    }
}

createIndicatorDots();

let indicatorDots = document.querySelectorAll('.indicator-dot');

// Shifts indicator dot continer to the left when the next button is clicked
function shiftIndicatorDotsLeft() {
    if (currentImg > 2 && currentImg < images.length - 2) {
        dotContainerPosition -= 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Shifts indicator dot continer to the right when the previous button is clicked
function shiftIndicatorDotsRight() {
    if(currentImg > 1 && currentImg < images.length - 3) {
        dotContainerPosition += 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Changes opacity of the dot that corresponds to the image being shown
function highlightDot() {
    indicatorDots.forEach((dot) => dot.classList.remove('indicator-dot-current'));
    indicatorDots[currentImg].classList.add('indicator-dot-current');
}