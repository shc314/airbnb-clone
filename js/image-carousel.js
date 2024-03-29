const listings = document.querySelectorAll('.listing');
listings.forEach(listing => {
    listing.setAttribute('data-current-img', 0);
    const images = listing.querySelectorAll('.listing-photos');
    const numImages = images.length;
    listing.setAttribute('data-num-images', numImages);
    const lastImg = numImages - 1;

    images.forEach((image, index) => {
        image.style.transform = `translateX(${index * 100}%)`;
    });

    // Create all the dots in their initial state for each carousel
    const dotContainer = listing.querySelector('.indicator-dot-inner-container');
    dotContainer.setAttribute('data-dot-container-pos', 0);
    createIndicatorDots(dotContainer, numImages);
    const indicatorDots = Array.from(dotContainer.children);
    transformDots(indicatorDots, 0, images);

    listing.addEventListener('click', (e) => {
        const container = e.currentTarget;
        let currentImg = Number(container.getAttribute('data-current-img'));

        if(e.target.classList.contains('btn__next-photo')) {
            currentImg = showNextImg(container, currentImg, lastImg, images);
            shiftIndicatorDotsLeft(dotContainer, currentImg, numImages);
            highlightDot(indicatorDots, currentImg);
            transformDots(indicatorDots, currentImg, numImages);
            showButton(container, currentImg, lastImg);
        }

        if(e.target.classList.contains('btn__prev-photo')) {
            currentImg = showPrevImg(container, currentImg, images);
            shiftIndicatorDotsRight(dotContainer, currentImg, numImages);
            highlightDot(indicatorDots, currentImg);
            transformDots(indicatorDots, currentImg, numImages);
            showButton(container, currentImg, lastImg);
        }
    });

    listing.addEventListener('pointerenter', (e) => {
        const container = e.currentTarget;
        let currentImg = Number(container.getAttribute('data-current-img'));
        showButton(container, currentImg, lastImg);
    });

    listing.addEventListener('pointerleave', hideButton);
});

// Show the next image in the carousel when the next button is clicked
function showNextImg(container, currentImg, lastImg, images) {
    if (currentImg === lastImg) {
        container.querySelector('.btn__next-photo').style.display = 'none';
    } else {
        currentImg++;
        container.setAttribute('data-current-img', currentImg);
    }
    
    images.forEach((image, index) => {
        image.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });
    
    return currentImg;
}

// Show the previous image in the carousel when the left button is clicked
function showPrevImg(container, currentImg, images) {
    if (currentImg === 0) {
        container.querySelector('.btn__prev-photo').style.display = 'none';
    } else {
        currentImg--;
        container.setAttribute('data-current-img', currentImg);
    }

    images.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentImg)}%)`;
    });
    
    return currentImg;
}

// Show or hides the previous and next buttons, depending on the current slide's position in the sequence
function showButton(container, currentImg, lastImg) {
    if (currentImg === lastImg) {
        container.querySelector('.btn__prev-photo').style.display = 'block'
        container.querySelector('.btn__next-photo').style.display = 'none';
    } else if (currentImg === 0) {
        container.querySelector('.btn__prev-photo').style.display = 'none'
        container.querySelector('.btn__next-photo').style.display = 'block';
    } else {
        container.querySelector('.btn__prev-photo').style.display = 'block'
        container.querySelector('.btn__next-photo').style.display = 'block';
    }
}

// hide both buttons
function hideButton(e) {
    e.target.querySelector('.btn__prev-photo').style.display = 'none';
    e.target.querySelector('.btn__next-photo').style.display = 'none';
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

// Shift indicator dot container to the left when the next button is clicked
function shiftIndicatorDotsLeft(dotContainer, currentImg, numImages) {
    if (currentImg > 2 && currentImg < numImages - 2) {
        let dotContainerPosition = Number(dotContainer.getAttribute('data-dot-container-pos'));
        dotContainerPosition -= 11;
        dotContainer.setAttribute('data-dot-container-pos', dotContainerPosition);
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
    }
}

// Shift indicator dot container to the right when the previous button is clicked
function shiftIndicatorDotsRight(dotContainer, currentImg, numImages) {
    if(currentImg > 1 && currentImg < numImages - 3) {
        let dotContainerPosition = Number(dotContainer.getAttribute('data-dot-container-pos'));
        dotContainerPosition += 11;
        dotContainer.style.transform = `translateX(${dotContainerPosition}px)`;
        dotContainer.setAttribute('data-dot-container-pos', dotContainerPosition);
    }
}

// Change opacity of the indicator dot that corresponds to the image being shown
function highlightDot(indicatorDots, currentImg) {
    indicatorDots.forEach((dot) => dot.classList.remove('indicator-dot-current'));
    indicatorDots[currentImg].classList.add('indicator-dot-current');
}

// Change the size of the indicator dots
function transformDots(indicatorDots, currentImg, numImages) {
    if(currentImg < 3) {
        indicatorDots[0].style.transform = 'scale(1)';
        indicatorDots[1].style.transform = 'scale(1)';
        indicatorDots[2].style.transform = 'scale(1)';
        indicatorDots[3].style.transform = 'scale(0.8333334)';
        indicatorDots[4].style.transform = 'scale(0.6666666)';
    } else if(currentImg >= 3 && currentImg < numImages - 3) {
        indicatorDots[currentImg - 2].style.transform = 'scale(0.6666666)';
        indicatorDots[currentImg - 1].style.transform = 'scale(0.8333334)';
        indicatorDots[currentImg].style.transform = 'scale(1)';
        indicatorDots[currentImg + 1].style.transform = 'scale(0.8333334)';
        indicatorDots[currentImg + 2].style.transform = 'scale(0.6666666)';
    } else if(currentImg >= numImages - 3) {
        indicatorDots[indicatorDots.length - 5].style.transform = 'scale(0.6666666)';
        indicatorDots[indicatorDots.length - 4].style.transform = 'scale(0.8333334)';
        indicatorDots[indicatorDots.length - 3].style.transform = 'scale(1)';
        indicatorDots[indicatorDots.length - 2].style.transform = 'scale(1)';
        indicatorDots[indicatorDots.length - 1].style.transform = 'scale(1)';
    }
}