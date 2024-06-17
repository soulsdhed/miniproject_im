let slideIndex = 1;
let slides = document.getElementsByClassName("slideshow");
let dots = document.getElementsByClassName("dot");
let currentSlideIndex = 0;
let isAnimating = false;

document.addEventListener("DOMContentLoaded", function () {
  showSlides(slideIndex); // 첫 번째 슬라이드를 표시
});

// 다음/이전 컨트롤
function plusSlides(n) {
  if (isAnimating) return;
  isAnimating = true;
  showSlides((slideIndex += n), n);
}

// 현재 슬라이드 제어
function currentSlide(n) {
  if (isAnimating) return;
  isAnimating = true;
  showSlides((slideIndex = n), n - currentSlideIndex);
}

function showSlides(n, direction) {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove(
      "slide-in-left",
      "slide-in-right",
      "slide-out-left",
      "slide-out-right"
    );
  }

  let nextSlideIndex = slideIndex - 1;
  let nextSlide = slides[nextSlideIndex];
  let currentSlide = slides[currentSlideIndex];

  if (direction > 0) {
    currentSlide.classList.add("slide-out-left");
    nextSlide.classList.add("slide-in-right");
  } else if (direction < 0) {
    currentSlide.classList.add("slide-out-right");
    nextSlide.classList.add("slide-in-left");
  }

  nextSlide.style.display = "flex";
  dots[currentSlideIndex].classList.remove("active");
  dots[nextSlideIndex].classList.add("active");

  nextSlide.addEventListener(
    "animationend",
    function () {
      currentSlideIndex = nextSlideIndex;
      isAnimating = false;
    },
    { once: true }
  );
}
