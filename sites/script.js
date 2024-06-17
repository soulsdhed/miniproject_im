// Flower
var flower = document.getElementById("flower");
var flowerPng = document.getElementById("Flower_png");

flower.addEventListener("mouseenter", () => {
  flowerPng.src = "./sites/img/Nomadic_Tribe.gif";
});

flower.addEventListener("mouseleave", () => {
  flowerPng.src = "./sites/img/Nomadic_tribe.PNG";
});

// HumanMade
var humanMade = document.getElementById("humanMade");
var humanMadePng = document.getElementById("HumanMade_png");

humanMade.addEventListener("mouseenter", () => {
  humanMadePng.src = "./sites/img/Human_Made.gif";
});

humanMade.addEventListener("mouseleave", () => {
  humanMadePng.src = "./sites/img/Human_made.PNG";
});

// Google
var google = document.getElementById("google");
var googlePng = document.getElementById("Google_png");

google.addEventListener("mouseenter", () => {
  googlePng.src = "./sites/img/Google_game.gif";
});

google.addEventListener("mouseleave", () => {
  googlePng.src = "./sites/img/Google_game.PNG";
});

// Salvator
var salvator = document.getElementById("salvator");
var salvatorPng = document.getElementById("Salvator_png");

salvator.addEventListener("mouseenter", () => {
  salvatorPng.src = "./sites/img/Salvator.gif";
});

salvator.addEventListener("mouseleave", () => {
  salvatorPng.src = "./sites/img/Salvator.PNG";
});