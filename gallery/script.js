// panorama gallery
// section
const Boxlayout = (() => {
    const wrapper = document.body,
        sections = [...document.querySelectorAll(".section")],
        closeButtons = [...document.querySelectorAll(".close-section")],
        expandedClass = "is-expanded",
        hasExpandedClass = "has-expanded-item";

    const initEvents = () => {
        sections.forEach((element) => {
            element.addEventListener("click", () => openSection(element));
        });
        closeButtons.forEach((element) => {
            element.addEventListener("click", (event) => {
                event.stopPropagation();
                closeSection(element.parentElement);
            });
        });
    };

    const openSection = (element) => {
        if (element.classList.contains(expandedClass)) return;
        element.classList.add(expandedClass);
        wrapper.classList.add(hasExpandedClass);
    };

    const closeSection = (element) => {
        if (!element.classList.contains(expandedClass)) return;
        element.classList.remove(expandedClass);
        wrapper.classList.remove(hasExpandedClass);
    };

    return { init: initEvents };
})();

Boxlayout.init();

// sectionn blur
const panoramas = document.getElementsByClassName("panorama");
let currentSelectedPanorama = 0;
for (let i = 0; i < panoramas.length; i++) {
    panoramas[i].addEventListener("mouseover", (event) => {
        // 마우스가 들어가면
        // 블러 제거
        panoramas[i].classList.remove("blur");
        // 현재 선택된 화면을 설정
        currentSelectedPanorama = i;

        // 해당 번호를 제외한 나머지 panorama에 blur확인 후 추가
        for (let j = 0; j < panoramas.length; j++) {
            if (i === j) continue;
            if (!panoramas[j].classList.contains("blur")) {
                panoramas[j].classList.add("blur");
            }
        }
        // console.log(i);
    });
}

// panorama setting
const panoramaDivs = document.getElementsByClassName("panorama");
const imgSources = [
    "angra.jpg",
    "b.jpg",
    "c.jpg",
    "d.jpg",
    "hong-kong-7361979.jpg",
    "e.jpg",
];
for (let i = 0; i < panoramaDivs.length; i++) {
    // Create viewer.
    var viewer = new Marzipano.Viewer(panoramaDivs[i]);

    // Create source.
    var source = Marzipano.ImageUrlSource.fromString(
        "./gallery/panorama/imgs/" + imgSources[i]
    );

    // Create geometry.
    var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

    // Create view.
    var limiter = Marzipano.RectilinearView.limit.traditional(
        1024,
        (100 * Math.PI) / 180
    );
    var view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

    // Create scene.
    var scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true,
    });

    // Display scene.
    scene.switchTo();
}

// user panorama
const fileInput = document.querySelector(".input-file");
const inputbutton = document.querySelector(".input-file-trigger");
const embedWrapper = document.querySelector(".gallery-wrapper");
const userPanoramaContainer = document.querySelector(
    ".user-panorama-container"
);
const userPanorama = document.getElementById("user-panorama");
const userPanoramaClose = document.getElementById("user-panorama-close");

inputbutton.addEventListener("click", (event) => {
    fileInput.focus();
    return false;
});
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // 선택한 파일 가져오기
    if (file) {
        const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성

        // 파일 읽기가 완료되면 실행될 콜백 함수
        reader.onload = (e) => {
            // user-panorama-container hide 삭제
            if (userPanoramaContainer.classList.contains("hide"))
                userPanoramaContainer.classList.remove("hide");

            // emded-container hide 추가
            if (!embedWrapper.classList.contains("hide"))
                embedWrapper.classList.add("hide");

            // 파노라마 실행
            // Create viewer.
            var viewer = new Marzipano.Viewer(userPanorama);
            // Create source.
            let source = Marzipano.ImageUrlSource.fromString(e.target.result);
            // Create geometry.
            var geometry = new Marzipano.EquirectGeometry([{ width: "4000" }]);
            // Create view.
            var limiter = Marzipano.RectilinearView.limit.traditional(
                1024,
                (100 * Math.PI) / 180
            );
            var view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);
            let scene = viewer.createScene({
                source: source,
                geometry: geometry,
                view: view,
                pinFirstLevel: true,
            });
            scene.switchTo();
        };

        // 파일을 읽기 (실제 읽기 동작)
        reader.readAsDataURL(file);
    }
});

// 유저 파노라마 종료 버튼
userPanoramaClose.addEventListener("click", () => {
    // user-panorama-container hide 추가
    if (!userPanoramaContainer.classList.contains("hide"))
        userPanoramaContainer.classList.add("hide");

    // embed-container hide 삭제
    if (embedWrapper.classList.contains("hide"))
        embedWrapper.classList.remove("hide");
});
