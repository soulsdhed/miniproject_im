// script.js
// document.getElementById("enter-btn").addEventListener("click", () => {
//   window.location.href = "./about.html"; // 팀원 소개 페이지로 이동
// });


document.querySelector(".intro-content a").addEventListener("mouseover", () => {
  var overlay = document.getElementById('intro-overlay');
  overlay.classList.add('expanded');

  setTimeout(() => {
    VANTA.BIRDS({
      el: "#intro-overlay",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: 0xfefefe,
      color1: 0x8aaae5,
    });
  }, 750);
}, { once: true });