
// // Get the modal
var movie = document.getElementById("myMovie");

// // Get the button that opens the modal
const btn = document.getElementById("movieOpen");
const bombModal = document.querySelector("#bomb");
const interactive = document.querySelector(".interactive");

const modalCloseBtn = document.querySelector('#myMovie .modal-close-btn');

// close닫기
// x버튼 누르면 movie창 끄기
modalCloseBtn.onclick = function () {
  movie.style.display = "none";
  console.log(movie);
};

let bombCloseBtn = document.getElementById("bomb-close");
bombCloseBtn.addEventListener("click", () => {
  bombModal.style.display = "none";
});


// 모달이 띄워져있을때, 모달외의 다른 화면을 누르면 movie창이 꺼지게 하기
window.onclick = function (event) {
  if (event.target == movie) {
    movie.style.display = "none";
  }
};

// img 파일을 차례대로 불러오는 파일
function changeVideo(videoId) {
  var iframe = document.getElementById('one');
  console.log(iframe);
  console.log(iframe.src);
  iframe.src = "";
  iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
  console.log(iframe.src);
}

const imgSrcs = {
  img_src_: null,
  img_src_a: "ojXIYN1m6s8",
  img_src_b: "CX0aX7tT6tA",
  img_src_ba: "UcrSjU-ge50",
  img_src_bb: "sezZpMKu3C8",
  img_src_baa: "3OxzTio461I",
  img_src_bab: "Q0t9F9N1S_I",
  img_src_baaa: "PSodv-01-zk",
  img_src_baab: "ZHb_ukr6pDI",
  img_src_baaba: "P9biK3zNC_s",
  img_src_baabb: "m6EF9en2Hgc"
}

let currentLevel = "";

//let key = imgSrcs["img_src_" + currentLevel];
let current = document.getElementsByClassName(currentLevel);

// 원래 창이 꺼지고 새로운 창이 켜져야한다.
btna.onclick = function () {
  currentLevel += "a";
  changeVideo(imgSrcs["img_src_" + currentLevel]);

  let keyA = imgSrcs["img_src_" + currentLevel + "a"];
  let keyB = imgSrcs["img_src_" + currentLevel + "b"];

  const modalImgA = document.getElementById("imgA");
  const modalImgB = document.getElementById("imgB");

  modalImgA.src = `https://img.youtube.com/vi/${keyA}/0.jpg`;
  modalImgA.title = keyA;
  modalImgB.src = `https://img.youtube.com/vi/${keyB}/0.jpg`;
  modalImgB.title = keyB;

  // 모달창 끄기
  movie.style.display = 'none';
}

btnb.onclick = function () {
  currentLevel += "b";
  changeVideo(imgSrcs["img_src_" + currentLevel]);

  let keyA = imgSrcs["img_src_" + currentLevel + "a"];
  let keyB = imgSrcs["img_src_" + currentLevel + "b"];

  const modalImgA = document.getElementById("imgA");
  const modalImgB = document.getElementById("imgB");

  modalImgA.src = `https://img.youtube.com/vi/${keyA}/0.jpg`;
  modalImgA.title = keyA;
  modalImgB.src = `https://img.youtube.com/vi/${keyB}/0.jpg`;
  modalImgB.title = keyB;

  // 모달창 끄기
  movie.style.display = 'none';
}

btn.addEventListener("click", () => {
  let keyA = imgSrcs["img_src_" + currentLevel + "a"];
  let keyB = imgSrcs["img_src_" + currentLevel + "b"];

  if (keyA === undefined) {
    console.log("폭탄 여기서 뜨면 됩니다");
    // 폭탄창 뜨기
    bombModal.style.display = "flex";
  }
  else {
    // 무비 선택창 뜨기
    movie.style.display = "flex";
  }
});

var svgContainer = document.getElementById('svgContainer');
var animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: true,
  animationData: JSON.parse(animationData)
});