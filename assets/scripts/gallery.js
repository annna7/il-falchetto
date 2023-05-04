const lightbox = document.createElement('div');
const lightboxContent = document.createElement('div');
const lightboxImage = document.createElement('img');
const lightboxButtons = document.createElement('div');
const lightboxButtonLeft = document.createElement('button');
const lightboxButtonRight = document.createElement('button');

lightbox.classList.add('lightbox');
lightboxContent.classList.add('lightbox-content');
lightboxImage.classList.add('lightbox-media');
lightboxButtons.classList.add('lightbox-buttons');
lightboxButtonLeft.classList.add('lightbox-button')
lightboxButtonLeft.classList.add('left');
lightboxButtonRight.classList.add('lightbox-button');
lightboxButtonRight.classList.add('right');
lightboxButtonLeft.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" stroke="none" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/> </svg>';
lightboxButtonRight.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16"> <path fill-rule="evenodd" stroke="none" d="M4.646 1.646a.5.5 0 0 0 0 .708L10.293 8l-5.647 5.646a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708l-6-6a.5.5 0 0 0-.708 0z"/> </svg>';

lightboxButtons.appendChild(lightboxButtonLeft);
lightboxButtons.appendChild(lightboxButtonRight);
lightboxContent.appendChild(lightboxImage);
lightboxContent.appendChild(lightboxButtons);
lightbox.appendChild(lightboxContent);
document.body.appendChild(lightbox);

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

let isLightboxOpen = false;
let currentImageIndex;

const openLightbox = () => {
    isLightboxOpen = true;
    lightbox.style.pointerEvents = 'all';
    lightbox.style.opacity = '1';
}

const closeLightbox = () => {
    isLightboxOpen = false;
    lightbox.style.height = '0';
    lightbox.style.pointerEvents = 'none';
    lightbox.style.opacity = '0';
}

const modifyLightboxImage = (src) => {
    lightboxImage.src = src;
    currentImageIndex = galleryItems.indexOf(galleryItems.find(element => element.querySelector('img').src === src));
}

galleryItems.forEach(element => {
    element.addEventListener('click', (e) => {
        openLightbox();
        modifyLightboxImage(e.target.src);
    })
});

lightbox.addEventListener('click', (e) => {
    if (isLightboxOpen && e.target !== lightboxImage && e.target !== lightboxButtonLeft.querySelector('svg') && e.target !== lightboxButtonRight.querySelector('svg')) {
        e.stopPropagation();
        closeLightbox();
    }
});

const goLeft = () => {
    if (currentImageIndex === 0) {
        modifyLightboxImage(galleryItems[galleryItems.length - 1].querySelector('img').src);
    } else {
        modifyLightboxImage(galleryItems[currentImageIndex - 1].querySelector('img').src);
    }
}

const goRight = () => {
    if (currentImageIndex === galleryItems.length - 1) {
        modifyLightboxImage(galleryItems[0].querySelector('img').src);
    } else {
        modifyLightboxImage(galleryItems[currentImageIndex + 1].querySelector('img').src);
    }
}

lightboxButtonLeft.addEventListener('click', (e) => {
    if (isLightboxOpen) {
        e.stopPropagation();
        goLeft();
    }
});

lightboxButtonRight.addEventListener('click', (e) => {
    if (isLightboxOpen) {
        e.stopPropagation();
        goRight();
    }
});

window.addEventListener('keydown', (e) => {
    // check for left and right arrow keys
    if (!isLightboxOpen) return;
    switch (e.key) {
        case 'ArrowLeft': {
            goLeft();
            break;
        }
        case 'ArrowRight': {
            goRight();
            break;
        }
        case 'Escape': {
            closeLightbox();
        }
    }
})