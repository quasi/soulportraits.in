// Global variables
let currentImageIndex = 0;
let shuffledImages = [];
let masonryInstance = null;

// Utility function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize the gallery
function initGallery() {
    const gallery = document.getElementById('gallery');
    
    // Show loading state
    gallery.innerHTML = '<div class="loading">Loading images...</div>';
    
    // Shuffle the images for random order
    shuffledImages = shuffleArray(imageList);
    
    // Create gallery items
    const galleryItems = shuffledImages.map((imageData, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = `images/${imageData.img}`;
        img.alt = imageData.desc || 'Portrait by Abhijit Rao';
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
        
        // Add description if available
        if (imageData.desc && imageData.desc.trim() !== '') {
            const description = document.createElement('div');
            description.className = 'gallery-item-description';
            description.textContent = imageData.desc;
            galleryItem.appendChild(description);
        }
        
        // Add click event for lightbox
        galleryItem.addEventListener('click', () => openLightbox(index));
        
        return galleryItem;
    });
    
    // Clear loading and add items
    gallery.innerHTML = '';
    galleryItems.forEach(item => gallery.appendChild(item));
    
    // Initialize Masonry after images are loaded
    initMasonry();
}

// Initialize Masonry layout
function initMasonry() {
    const gallery = document.getElementById('gallery');
    
    // Wait for images to load before initializing Masonry
    const images = gallery.querySelectorAll('img');
    let loadedImages = 0;
    
    const checkImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            masonryInstance = new Masonry(gallery, {
                itemSelector: '.gallery-item',
                columnWidth: '.gallery-item',
                percentPosition: true,
                gutter: 0
            });
        }
    };
    
    images.forEach(img => {
        if (img.complete) {
            checkImagesLoaded();
        } else {
            img.addEventListener('load', checkImagesLoaded);
            img.addEventListener('error', checkImagesLoaded);
        }
    });
}

// Lightbox functionality
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    const currentImage = shuffledImages[currentImageIndex];
    
    lightboxImage.src = `images/${currentImage.img}`;
    lightboxImage.alt = currentImage.desc || 'Portrait by Abhijit Rao';
    
    // Show description if available
    if (currentImage.desc && currentImage.desc.trim() !== '') {
        lightboxDescription.textContent = currentImage.desc;
        lightboxDescription.style.display = 'block';
    } else {
        lightboxDescription.style.display = 'none';
    }
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons
    updateNavigationButtons();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage();
    }
}

function showNextImage() {
    if (currentImageIndex < shuffledImages.length - 1) {
        currentImageIndex++;
        updateLightboxImage();
    }
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    const currentImage = shuffledImages[currentImageIndex];
    
    lightboxImage.src = `images/${currentImage.img}`;
    lightboxImage.alt = currentImage.desc || 'Portrait by Abhijit Rao';
    
    // Show description if available
    if (currentImage.desc && currentImage.desc.trim() !== '') {
        lightboxDescription.textContent = currentImage.desc;
        lightboxDescription.style.display = 'block';
    } else {
        lightboxDescription.style.display = 'none';
    }
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === shuffledImages.length - 1;
}

// Photographer modal functionality
function openPhotographerModal() {
    const photographerModal = document.getElementById('photographer-modal');
    photographerModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePhotographerModal() {
    const photographerModal = document.getElementById('photographer-modal');
    photographerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Keyboard navigation
function handleKeyPress(event) {
    const lightbox = document.getElementById('lightbox');
    const photographerModal = document.getElementById('photographer-modal');
    
    if (lightbox.style.display === 'block') {
        switch(event.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    } else if (photographerModal.style.display === 'block') {
        if (event.key === 'Escape') {
            closePhotographerModal();
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    initGallery();
    
    // Header click event for photographer modal
    const header = document.getElementById('header');
    header.addEventListener('click', openPhotographerModal);
    
    // Lightbox event listeners
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close button
    closeBtn.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Photographer modal event listeners
    const photographerModal = document.getElementById('photographer-modal');
    const photographerCloseBtn = document.querySelector('.photographer-close');
    
    // Close photographer modal when clicking outside the content
    photographerModal.addEventListener('click', function(event) {
        if (event.target === photographerModal) {
            closePhotographerModal();
        }
    });
    
    // Close button
    photographerCloseBtn.addEventListener('click', closePhotographerModal);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Handle window resize for Masonry
    window.addEventListener('resize', function() {
        if (masonryInstance) {
            masonryInstance.layout();
        }
    });
});

// Handle image loading errors
document.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        console.warn('Failed to load image:', event.target.src);
        // You could add a placeholder image here if needed
    }
}, true);
