console.log("firebase file");

// Firebase 설정객체 : 내 firebase 에대한 정보
const firebaseConfig = {
  apiKey: "AIzaSyBjPPPPhjM1zdSWRJs0TKYrlne0nTFKb8M",
  authDomain: "fir-test-2941b.firebaseapp.com",
  databaseURL: "https://fir-test-2941b-default-rtdb.firebaseio.com",
  projectId: "fir-test-2941b",
  storageBucket: "fir-test-2941b.appspot.com",
  messagingSenderId: "57174928866",
  appId: "1:57174928866:web:584e0568dd9f9e235a9dbb",
};

// Firebase 앱 초기화
const app = firebase.initializeApp(firebaseConfig);

// Firebase 의 실시간 데이터베이스
const database = firebase.database();

// 회원가입 폼 데이터 검증 및 Firebase 저장
const writeUserData = (id, pw, name, tel, email) => {
  return database.ref("users/" + id).set({
    id: id,
    pw: pw,
    name: name,
    tel: tel,
    email: email,
  });
};

const submitBtn = document.getElementById("submit-btn");
const frm = document.frm.elements;

submitBtn.addEventListener("click", async () => {
  const id = frm[0].value;
  const pw = frm[1].value;
  const confirmPw = frm[2].value;
  const name = frm[3].value;
  const tel = frm[4].value;
  const email = frm[5].value;

  // 데이터 검증
  let missingFields = [];
  if (!id) missingFields.push("아이디");
  if (!pw) missingFields.push("비밀번호");
  if (!confirmPw) missingFields.push("비밀번호 확인");
  if (!name) missingFields.push("이름");
  if (!tel) missingFields.push("전화번호");
  if (!email) missingFields.push("이메일");

  if (missingFields.length > 0) {
    // let message = "다음 항목들이 입력되지 않았습니다:\n\n";
    // missingFields.forEach((field) => {
    //   message += "- " + field + "\n";
    // });
    // message += "\n다시 시도해주세요.";
    // alert(message);
    Swal.fire({
      title: await getLanguage("register_success_title"),
      text: await getLanguage("register_error_msg"),
      icon: "error",
    });
    return;
  }

  if (pw !== confirmPw) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  writeUserData(id, pw, name, tel, email)
    .then(async () => {
      Swal.fire({
        title: await getLanguage("success_title"),
        text: await getLanguage("register_success_msg"),
        icon: "success",
      });

      // alert("회원가입 성공!");

      // 로그인으로 넘어가게
      let showSigninBtn = document.getElementsByClassName("show-signin")[0];
      showSigninBtn.click();
    })
    .catch((error) => {
      console.error("Error writing data to Firebase: ", error);
    });
});

// 회원정보 읽어오기(loginBtn 이벤트에서 id,pw 받아옴)
const readUserData = (id, pw) => {
  return database
    .ref("users/" + id)
    .once("value")
    .then(async (res) => {
      const logindata = res.val(); // 서버에서 받아온 값 담아주기
      console.log(logindata); // 잘 담아왔는지 확인
      if (logindata.id == id && logindata.pw == pw) {
        // id,pw 일치하는지 확인
        // alert("로그인 성공");

        // alert(`${logindata.name}님 환영합니다!`);
        sessionStorage.setItem("id", logindata.id); // 세션에 id 담아주기
        sessionStorage.setItem("name", logindata.name); // 세션에 name 담아주기

        Swal.fire({
          title: await getLanguage("success_title"),
          text: logindata.name + await getLanguage("login_success_msg"),
          icon: "success",
        }).then(result => {
          window.location.href = "about.html";
        });
      } else {
        // alert("로그인 실패");
        Swal.fire({
          title: await getLanguage("failed_title"),
          text: await getLanguage("login_failed_msg"),
          icon: "error",
        });
      }
    })
    .catch(async (error) => {
      // console.log(error);
      // alert("로그인 실패");
      Swal.fire({
        title: await getLanguage("failed_title"),
        text: await getLanguage("login_failed_msg"),
        icon: "error",
      });
    });
};

const loginBtn = document.getElementById("submit-btn-login"); // 로그인 버튼 속성 가져오기
loginBtn.addEventListener("click", () => {
  const id = frm[0].value; // input태그에서 입력받은 id값
  const pw = frm[1].value; // input태그에서 입력받은 pw값
  readUserData(id, pw); // input태그에서 받은 값들 readUserData로 넘기고 함수실행
});

// let getUserBtn = document.getElementById("getUserBtn")
// getUserBtn.addEventListener('click',()=>{
//     console.log('유저가져오기 ck');
//     readUserData('yim7595');
// })
