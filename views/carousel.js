// script.js
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const slides = document.querySelectorAll('.carousel-slide');
    const container = document.querySelector('.carousel-container');
    
    let currentIndex = 0;

    function showSlide(index) {
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        container.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Optional: Automatic sliding
    // i might remove this 
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 3000); // Change slide every 3 seconds
});
