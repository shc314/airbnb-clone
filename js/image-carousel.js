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

// Show the next image in the carousel when the next button is clicked
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
    transformDots();
}

// Show the previous image in the carousel when the left button is clicked
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
    transformDots();
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

// Create a span with a dot for each image
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

// Shift indicator dot continer to the left when the next button is clicked
function shiftIndicatorDotsLeft() {
    if (currentImg > 2 && currentImg < images.length - 2) {
        dotContainerPosition -= 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Shift indicator dot continer to the right when the previous button is clicked
function shiftIndicatorDotsRight() {
    if(currentImg > 1 && currentImg < images.length - 3) {
        dotContainerPosition += 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Change opacity of the indicator dot that corresponds to the image being shown
function highlightDot() {
    indicatorDots.forEach((dot) => dot.classList.remove('indicator-dot-current'));
    indicatorDots[currentImg].classList.add('indicator-dot-current');
}

// Change the size of the indicator dots
function transformDots() {
    if(currentImg < 3) {
        indicatorDots[0].style.transform = 'scale(1)';
        indicatorDots[1].style.transform = 'scale(1)';
        indicatorDots[2].style.transform = 'scale(1)';
        indicatorDots[3].style.transform = 'scale(0.8333334)';
        indicatorDots[4].style.transform = 'scale(0.6666666)';
    } else if(currentImg >= 3 && currentImg < images.length - 3) {
        indicatorDots[currentImg - 2].style.transform = 'scale(0.6666666)';
        indicatorDots[currentImg - 1].style.transform = 'scale(0.8333334)';
        indicatorDots[currentImg].style.transform = 'scale(1)';
        indicatorDots[currentImg + 1].style.transform = 'scale(0.8333334)';
        indicatorDots[currentImg + 2].style.transform = 'scale(0.6666666)';
    } else if(currentImg >= images.length - 3) {
        indicatorDots[indicatorDots.length - 5].style.transform = 'scale(0.6666666)';
        indicatorDots[indicatorDots.length - 4].style.transform = 'scale(0.8333334)';
        indicatorDots[indicatorDots.length - 3].style.transform = 'scale(1)';
        indicatorDots[indicatorDots.length - 2].style.transform = 'scale(1)';
        indicatorDots[indicatorDots.length - 1].style.transform = 'scale(1)';
    }
}

transformDots();