let videoStream;
let selectedFrame = "./photozone/imgs/frames/1.png";

const video = document.getElementById("webcam");
const overlay = document.getElementById("overlay");
const canvas = document.getElementById("photo-canvas");
const startButton = document.getElementById("start-button");
const takePhotoButton = document.getElementById("take-photo-button");
const downloadButton = document.getElementById("download-button");

// 프레임 이미지 생성
const frameSelector = document.getElementById("frame-selector");
let htmlText = "";
for (let i = 0; i < 12; i++) {
    htmlText += `<img class="frame-thumbnail" src="./photozone/imgs/frames/${
        i + 1
    }.png">`;
}
frameSelector.innerHTML = htmlText;
document.querySelector(".frame-thumbnail").classList.add("selected");

// 스티커 이미지 생성
const stickerContent = document.getElementById("stickers-content");
htmlText = "";
for (let i = 0; i < 53; i++) {
    htmlText += `<img src="./photozone/imgs/stickers/${
        i + 1
    }.png" class="sticker">`;
}
stickerContent.innerHTML = htmlText;

async function startWebCam() {
    // 존재하는 비디오 스트림이 있다면 종료
    if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
    }
    // 사진 캔버스 숨기기
    canvas.classList.add("hide");
    // 다운로드 버튼 숨기기
    downloadButton.classList.add("hide");
    // 비디오(오버레이) 숨기기
    overlay.classList.remove("hide");

    // 비디오 스트림을 카메라로부터 가져오기
    videoStream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: 640,
            height: 480,
        },
    });
    video.srcObject = videoStream;

    // 오버레이 이미지 가져오기
    const overlayImage = new Image();
    overlayImage.src = selectedFrame;

    // Ensure the overlay image is loaded before starting to draw
    overlayImage.onload = function () {
        // When the video metadata is loaded, set up the canvas
        video.onloadedmetadata = function () {
            overlay.width = 640;
            overlay.height = 480;
            overlay.classList.remove("hide");

            // Function to draw the video frame and overlay image
            function drawFrame() {
                const context = overlay.getContext("2d");
                context.drawImage(video, 0, 0, overlay.width, overlay.height);
                context.drawImage(
                    overlayImage,
                    0,
                    0,
                    overlay.width,
                    overlay.height
                );
                requestAnimationFrame(drawFrame);
            }

            // Start drawing frames
            drawFrame();
        };
    };

    // 사진 찍기 버튼 활성화
    takePhotoButton.classList.remove("hide");
}

// 웹캠 스타트 버튼
startButton.addEventListener("click", async () => {
    try {
        await startWebCam();
    } catch (e) {
        // alert("Webcam이 존재하지 않습니다.");
        Swal.fire({
            title: await getLanguage("error_title"),
            text: await getLanguage("webcam_error_msg"),
            icon: "error",
        });
    }
});

// 사진 찍기 버튼
takePhotoButton.addEventListener("click", () => {
    // 비디오 오브젝트가 없으면 시작하지 않는다
    if (video.srcObject === null) {
        return;
    }
    // console.log(videoStream);
    // console.log(video.srcObject);

    const context = canvas.getContext("2d");
    let width = 640;
    let height = 480;

    const frameImage = new Image();
    frameImage.src = selectedFrame;

    frameImage.onload = function () {
        // const frameWidth = frameImage.width;
        // const frameHeight = frameImage.height;

        // 캔버스 크기를 사진틀 크기에 맞춤
        // 스티커를 위해서 사진 사이즈를 프레임 사이즈에 맞추지 않고 스케일링 하기로 함
        // canvas.width = frameWidth;
        // canvas.height = frameHeight;
        canvas.width = width;
        canvas.height = height;

        // 웹캠 사진을 캔버스 크기에 맞춰 그림
        // context.drawImage(video, 0, 0, frameWidth, frameHeight);
        context.drawImage(video, 0, 0, width, height);

        // 사진틀을 웹캠 사진 위에 그림
        // context.drawImage(frameImage, 0, 0, frameWidth, frameHeight);
        context.drawImage(frameImage, 0, 0, width, height);

        // 비디오 스트림 종료
        if (videoStream) {
            videoStream.getTracks().forEach((track) => track.stop());
            video.srcObject = null;
        }

        // 사진 캔버스 보이기
        canvas.classList.remove("hide");
        // 다운로드 버튼 보이기
        downloadButton.classList.remove("hide");
        // 비디오(오버레이) 숨기기
        overlay.classList.add("hide");
    };
});

// 다운로드 버튼
downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "photo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

// 사진 프레임 선택
document.querySelectorAll(".frame-thumbnail").forEach((img) => {
    img.addEventListener("click", async () => {
        // selected 클래스 부여
        document
            .querySelectorAll(".frame-thumbnail")
            .forEach((img) => img.classList.remove("selected"));
        img.classList.add("selected");
        selectedFrame = img.src;
        // console.log(img.src);

        await startWebCam();
    });
});

// 사진 프레임 스크롤링 (좌우 -> 상하)
const scrollContainer = document.querySelector("#frame-selector");
scrollContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
});

// 스티커 붙이기
const stickers = document.querySelectorAll(".sticker");
const cursorSticker = document.getElementById("cursor-sticker");
let selectedSticker = null;

// 스티커 선택 (커서 변경)
stickers.forEach((sticker) => {
    sticker.addEventListener("click", () => {
        selectedSticker = sticker;
        cursorSticker.src = sticker.src;
        // cursorSticker.style.display = "block";

        // selected 클래스 부여
        document
            .querySelectorAll(".sticker")
            .forEach((img) => img.classList.remove("selected"));
        sticker.classList.add("selected");
    });
});

// 캔버스에 마우스 이동하면 스티커 커서가 이동
canvas.addEventListener("mousemove", (e) => {
    if (selectedSticker) {
        // 스티커 보이기
        if (cursorSticker.classList.contains("hide")) {
            cursorSticker.classList.remove("hide");
        }

        // 위치 계산
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - cursorSticker.clientWidth / 2;
        const y = e.clientY - rect.top - cursorSticker.clientHeight / 2;

        cursorSticker.style.left = `${x}px`;
        cursorSticker.style.top = `${y}px`;
    }
});

// 캔버스에서 빠지면 스티커 커서 다시 안보이게
canvas.addEventListener("mouseout", (e) => {
    // 스티커 숨기기
    if (!cursorSticker.classList.contains("hide")) {
        cursorSticker.classList.add("hide");
    }
});

// 캔버스를 클릭하면 그대로 스티커 찍히게
canvas.addEventListener("click", (e) => {
    if (selectedSticker) {
        const context = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        context.drawImage(
            selectedSticker,
            x - selectedSticker.width / 2,
            y - selectedSticker.height / 2
        );
    }
});

// 캔버스 이외를 클릭하면 다시 hide 굳이?
// document.addEventListener("click", (e) => {
//     if (!canvas.contains(e.target) && selectedSticker) {
//         cursorSticker.classList.add("hide");
//         selectedSticker = null;
//     }
// });
