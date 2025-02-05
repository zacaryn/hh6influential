// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");
  
    if (menuIcon && navLinks) {
      menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
  });
  
  // Slideshow Functionality
  let slideIndex = 0;
  function showSlides() {
    let slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => (slide.style.display = "none"));
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slides[slideIndex - 1]) slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    showSlides();
  });
  
  // Email Link Confirmation
  document.addEventListener("DOMContentLoaded", () => {
    const emailLink = document.querySelector(".contact a");
    if (emailLink) {
      emailLink.addEventListener("click", (e) => {
        const confirmSend = confirm("Do you want to send an email?");
        if (!confirmSend) e.preventDefault();
      });
    }
  });
  