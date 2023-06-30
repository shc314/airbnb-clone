//let images = document.querySelectorAll('.listing1'); // NodeList so can use forEach
// images.forEach((image, index) => {
//     image.style.transform = `translateX(${index * 100}%)`;
// });

let currentImg = 0;
let lastImg;// = images.length - 1;

const nextImgButtons = document.querySelectorAll(".btn__next-photo");
const prevImgButtons = document.querySelectorAll(".btn__prev-photo");
const dotContainers = document.querySelectorAll('.indicator-dot-inner-container');
let dotContainer;
let dotContainerPosition = 0;
let indicatorDots;

nextImgButtons.forEach(nextImgButton => nextImgButton.addEventListener('click', showNextImg));
prevImgButtons.forEach(prevImgButton => prevImgButton.addEventListener('click', showPrevImg));

let imageCollection;
function getImageList(e) {
    imageCollection = e.target.parentElement.children[0].children; //HTMLCollection cannot use forEach
    images = Array.from(imageCollection); // convert HTMLCollection to array
    images.forEach((image, index) => {
        image.style.transform = `translateX(${index * 100}%)`;
    });
    lastImg = images.length - 1;
}

// Show the next image in the carousel when the next button is clicked
function showNextImg(e) {
    getImageList(e);
    if (currentImg === lastImg) {
        e.target.style.display = 'none'; // hide nextImgButton
    } else {
        currentImg++;
    }
    
    images.forEach((image, index) => {
        image.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });

    dotContainer = e.target.nextElementSibling.children[0]; // get the indicator-dot-inner-container
    indicatorDots = Array.from(dotContainer.children);
    shiftIndicatorDotsLeft(dotContainer);
    highlightDot(indicatorDots);
    transformDots(indicatorDots);
}

// Show the previous image in the carousel when the left button is clicked
function showPrevImg(e) {
    getImageList(e);
    if (currentImg === 0) {
        e.target.style.display = 'none'; // hide prevImgButton
    } else {
        currentImg--;
    }

    images.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });

    dotContainer = e.target.parentElement.children[3].children[0]; // get the indicator-dot-inner-container
    indicatorDots = Array.from(dotContainer.children);
    shiftIndicatorDotsRight(dotContainer);
    highlightDot(indicatorDots);
    transformDots(indicatorDots);
}

// Show or hide buttons when hovering over listing
const listings = document.querySelectorAll('.listing');
listings.forEach(listing => {
    listing.addEventListener('pointerenter', showButton);
    listing.addEventListener('pointerleave', hideButton);
});

function showButton(e) {
    if (currentImg === lastImg) {
        e.target.children[0].children[1].style.display = 'block'; // show prevImgButton
        e.target.children[0].children[2].style.display = 'none'; // hide nextImgButton
    } else if (currentImg === 0) {
        e.target.children[0].children[1].style.display = 'none'; // hide prevImgButton
        e.target.children[0].children[2].style.display = 'block'; // show nextImgButton
    } else {
        e.target.children[0].children[2].style.display = 'block'; // show prevImgButton
        e.target.children[0].children[1].style.display = 'block'; // show nextImgButton
    }
}

// hide both buttons
function hideButton(e) {
    e.target.children[0].children[1].style.display = 'none'; // prevImgButton
    e.target.children[0].children[2].style.display = 'none'; // nextImgButton
}

// Create a span with a dot for each image
function createIndicatorDots(dotContainer, numImages) {
    for(let i=0; i < numImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('indicator-dot');
        if(i==0) {
            dot.classList.add('indicator-dot-current');
        }
        dotContainer.appendChild(dot);
    }
}

// Shift indicator dot continer to the left when the next button is clicked
function shiftIndicatorDotsLeft(dotContainer) {
    if (currentImg > 2 && currentImg < images.length - 2) {
        dotContainerPosition -= 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Shift indicator dot continer to the right when the previous button is clicked
function shiftIndicatorDotsRight(dotContainer) {
    if(currentImg > 1 && currentImg < images.length - 3) {
        dotContainerPosition += 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Change opacity of the indicator dot that corresponds to the image being shown
function highlightDot(indicatorDots) {
    indicatorDots.forEach((dot) => dot.classList.remove('indicator-dot-current'));
    indicatorDots[currentImg].classList.add('indicator-dot-current');
}

// Change the size of the indicator dots
function transformDots(indicatorDots) {
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

// Create all the dots in their initial state for each carousel
dotContainers.forEach((dotContainer) => {
    let numImages = dotContainer.parentElement.parentElement.children[0].children.length;
    createIndicatorDots(dotContainer, numImages);
    indicatorDots = Array.from(dotContainer.children);
    transformDots(indicatorDots);
});