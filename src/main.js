import "./style.css";
import "./blog.js";

window.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // Slide-out Menu
  // ==========================
  const menuBtn = document.getElementById("menuBtn");
  const sideMenu = document.getElementById("sideMenu");
  const menuBackdrop = document.getElementById("menuBackdrop");

  if (menuBtn && sideMenu && menuBackdrop) {
    menuBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("translate-x-full");
      menuBackdrop.classList.toggle("opacity-0");
      menuBackdrop.classList.toggle("pointer-events-none");
    });

    menuBackdrop.addEventListener("click", () => {
      sideMenu.classList.add("translate-x-full");
      menuBackdrop.classList.add("opacity-0");
      menuBackdrop.classList.add("pointer-events-none");
    });
  }

// ==========================
// Infinite Hero Carousel
// ==========================
const images = document.querySelectorAll(".carousel-img");
const dotsContainer = document.getElementById("carouselDots");
const carousel = document.getElementById("carousel");

const carouselText = document.getElementById("carouselText");
const carouselTitle = document.getElementById("carouselTitle");
const carouselCaption = document.getElementById("carouselCaption");

let index = 0;
let interval;
let startX = 0;

// --------------------------
// Create dots
// --------------------------
images.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white transition";
  dot.addEventListener("click", () => {
    index = i;
    showSlide(index);
    resetCarousel();
  });
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

// --------------------------
// Show slide with text
// --------------------------
function showSlide(i) {
  const img = images[i];

  // Update images
  images.forEach((slide, idx) => {
    slide.style.opacity = idx === i ? "1" : "0";
  });

  // Update dots
  dots.forEach((dot, idx) => {
    dot.classList.toggle("bg-white", idx === i);
    dot.classList.toggle("bg-white/50", idx !== i);
  });

// Animate text
carouselText.classList.remove("show"); // fade out
setTimeout(() => {
  carouselTitle.textContent = img.dataset.title;
  carouselCaption.textContent = img.dataset.caption;
  carouselText.classList.add("show"); // fade in + slide up
}, 400);
}

// --------------------------
// Next slide (infinite)
// --------------------------
function nextSlide() {
  index = (index + 1) % images.length;
  showSlide(index);
}

// --------------------------
// Auto-play (every 15s)
// --------------------------
function startCarousel() {
  interval = setInterval(nextSlide, 15000);
}

function stopCarousel() {
  clearInterval(interval);
}

function resetCarousel() {
  stopCarousel();
  startCarousel();
}

// --------------------------
// Pause on hover
// --------------------------
carousel.addEventListener("mouseenter", stopCarousel);
carousel.addEventListener("mouseleave", startCarousel);

// --------------------------
// Touch swipe (mobile)
// --------------------------
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? nextSlide() : (index = (index - 1 + images.length) % images.length);
    showSlide(index);
    resetCarousel();
  }
});

// --------------------------
// Init
// --------------------------
showSlide(index);
startCarousel();


});

// =====================
// SIMPLE GALLERY LIGHTBOX
// =====================
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('lightboxPrev');
const nextBtn = document.getElementById('lightboxNext');

let currentIndex = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');

  // allow DOM to paint before fading in
  requestAnimationFrame(() => {
    lightbox.classList.remove('opacity-0');
  });

  lightboxImg.src = galleryImages[currentIndex].src;
}

lightboxImg.classList.add('scale-95');
requestAnimationFrame(() => {
  lightboxImg.classList.remove('scale-95');
});

function closeLightbox() {
  lightbox.classList.add('opacity-0');

  setTimeout(() => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  }, 300);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;

  lightboxImg.classList.remove('slide-left', 'slide-right');
  void lightboxImg.offsetWidth; // 🔥 force reflow

  lightboxImg.classList.add('slide-right');
  lightboxImg.src = galleryImages[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;

  lightboxImg.classList.remove('slide-left', 'slide-right');
  void lightboxImg.offsetWidth; // 🔥 force reflow

  lightboxImg.classList.add('slide-left');
  lightboxImg.src = galleryImages[currentIndex].src;
}

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});


const blogContent = document.getElementById('blogContent');
const blogList = document.getElementById('blogList');

function renderPost(post) {
  blogContent.innerHTML = `
    <div class="mb-6 opacity-70 text-sm">
      By ${post.author} · ${post.date}
    </div>

    <h1 class="text-4xl md:text-5xl font-bold mb-8 leading-tight"
        style="font-family: 'Playfair Display', serif;">
      ${post.title}
    </h1>

    <img src="${post.image}" class="w-full rounded-lg mb-10" />

    <div class="prose prose-invert prose-lg max-w-none">
      <p>${parseMarkdown(post.content)}</p>
    </div>
  `;
}

  // ==========================
// Subtle Parallax (About Image)
// ==========================
const aboutImage = document.getElementById("aboutImage");

if (aboutImage) {
  window.addEventListener("scroll", () => {
    const rect = aboutImage.getBoundingClientRect();
    const offset = rect.top * 0.08; // VERY subtle
    aboutImage.style.transform = `translateY(${offset}px)`;
  });
}




