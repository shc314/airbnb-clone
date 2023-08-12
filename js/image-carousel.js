const carousels = document.querySelectorAll('.listing-carousel-container');
carousels.forEach(carousel => {
    carousel.setAttribute('data-current-img', 0);
    const images = carousel.querySelectorAll('.listing-photos');
    const numImages = images.length;
    carousel.setAttribute('data-num-images', numImages);

    images.forEach((image, index) => {
        image.style.transform = `translateX(${index * 100}%)`;
    });

    // Create all the dots in their initial state for each carousel
    // const dotContainer = carousel.querySelector('.indicator-dot-inner-container');
    // createIndicatorDots(dotContainer, numImages);
    // let indicatorDots = dotContainer.children;
    // transformDots(indicatorDots);

    carousel.addEventListener('click', (e) => {
        const container = e.currentTarget;
        let currentImg = container.getAttribute('data-current-img');
        let lastImg = numImages - 1;

        if(e.target.classList.contains('btn__next-photo')) {
            showNextImg(container, currentImg, lastImg, images);
        }

        if(e.target.classList.contains('btn__prev-photo')) {
            showPrevImg(container, currentImg, images);
        }
    });
});

const dotContainers = document.querySelectorAll('.indicator-dot-inner-container');
let dotContainer;
let dotContainerPosition = 0;
let indicatorDots;

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
function showNextImg(container, currentImg, lastImg, images) {
    // getImageList(e);
    if (currentImg == lastImg) { // currentImg is a string, lastImg is a number
        container.querySelector('.btn__next-photo').style.display = 'none';
    } else {
        currentImg++;
        container.setAttribute('data-current-img', currentImg);
    }
    
    images.forEach((image, index) => {
        image.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });

    dotContainer = container.querySelector('.indicator-dot-inner-container');
    indicatorDots = Array.from(dotContainer.children);
    shiftIndicatorDotsLeft(dotContainer, currentImg, images);
    highlightDot(indicatorDots, currentImg);
    transformDots(indicatorDots, currentImg, images);
}

// Show the previous image in the carousel when the left button is clicked
function showPrevImg(container, currentImg, images) {
    // getImageList(e);
    if (currentImg == 0) {
        container.querySelector('.btn__prev-photo').style.display = 'none';
    } else {
        currentImg--;
        container.setAttribute('data-current-img', currentImg);
    }

    images.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });

    dotContainer = container.querySelector('.indicator-dot-inner-container');
    indicatorDots = Array.from(dotContainer.children);
    shiftIndicatorDotsRight(dotContainer, currentImg, images);
    highlightDot(indicatorDots, currentImg);
    transformDots(indicatorDots, currentImg, images);
}

// Show or hide buttons when hovering over listing
const listings = document.querySelectorAll('.listing');
listings.forEach(listing => {
    listing.addEventListener('pointerenter', showButton);
    listing.addEventListener('pointerleave', hideButton);
});

function showButton(e) {
    const container = e.target.querySelector('.listing-carousel-container');
    const currentImg = container.getAttribute('data-current-img');
    const lastImg = container.getAttribute('data-num-images') - 1;
    if (currentImg == lastImg) {
        container.querySelector('.btn__prev-photo').style.display = 'block'
        container.querySelector('.btn__next-photo').style.display = 'none';
    } else if (currentImg == 0) {
        container.querySelector('.btn__prev-photo').style.display = 'none'
        container.querySelector('.btn__next-photo').style.display = 'block';
    } else {
        container.querySelector('.btn__prev-photo').style.display = 'block'
        container.querySelector('.btn__next-photo').style.display = 'block';
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
function shiftIndicatorDotsLeft(dotContainer, currentImg, images) {
    if (currentImg > 2 && currentImg < images.length - 2) {
        dotContainerPosition -= 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Shift indicator dot continer to the right when the previous button is clicked
function shiftIndicatorDotsRight(dotContainer, currentImg, images) {
    if(currentImg > 1 && currentImg < images.length - 3) {
        dotContainerPosition += 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Change opacity of the indicator dot that corresponds to the image being shown
function highlightDot(indicatorDots, currentImg) {
    indicatorDots.forEach((dot) => dot.classList.remove('indicator-dot-current'));
    indicatorDots[currentImg].classList.add('indicator-dot-current');
}

// Change the size of the indicator dots
function transformDots(indicatorDots, currentImg, images) {
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