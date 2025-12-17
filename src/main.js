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
  // Manual Carousel
  // ==========================
  const images = document.querySelectorAll(".carousel-img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let index = 0;

  function showImage(i) {
    images.forEach((img, idx) => {
      img.style.opacity = idx === i ? "1" : "0";
    });
  }

  if (prevBtn && nextBtn && images.length > 0) {
    prevBtn.addEventListener("click", () => {
      index = Math.max(0, index - 1); // Stops at first image
      showImage(index);
    });

    nextBtn.addEventListener("click", () => {
      index = Math.min(images.length - 1, index + 1); // Stops at last image
      showImage(index);
    });
  }

  showImage(index);
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




