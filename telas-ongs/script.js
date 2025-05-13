// Declare variables in global scope
window.currentIndex = 0;
window.images = [];
window.mainImage = null;

// Initialize carousel after dynamic content is loaded
window.initializeCarousel = function () {
  // Reset carousel variables
  window.currentIndex = 0;
  window.images = document.querySelectorAll(".thumbnail");
  window.mainImage = document.getElementById("mainImage");

  // Update main image if elements exist
  if (window.images.length > 0 && window.mainImage) {
    updateMainImage();
  }
};

// Function to change main image when clicking thumbnail
window.selectImage = function (index) {
  window.currentIndex = index;
  updateMainImage();
};

// Function to move slides with arrows
window.moveSlide = function (step) {
  const totalImages = window.images.length;
  window.currentIndex += step;

  if (window.currentIndex < 0) {
    window.currentIndex = totalImages - 1;
  } else if (window.currentIndex >= totalImages) {
    window.currentIndex = 0;
  }

  updateMainImage();
};

// Function to update main image based on current index
function updateMainImage() {
  const selectedImage = window.images[window.currentIndex];
  if (selectedImage && window.mainImage) {
    window.mainImage.src = selectedImage.src;
  }
}
