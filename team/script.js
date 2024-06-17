// Define team members (empty placeholders for now)
const teamMembers = [
  {
    name: "신정욱",
    name_i18n: "shin-jeonguk",
    role: "파노라마 이미지 갤러리",
    role_i18n: "shin-role",
    photo: "./team/images/images.jpg",
  },
  {
    name: "손준수",
    name_i18n: "son-junsu",
    role: "게임",
    role_i18n: "son-role",
    photo: "./team/images/images1.jpg",
  },
  {
    name: "최호준",
    name_i18n: "choi",
    role: "글 소개 / 사이드 네비",
    role_i18n: "choi-role",
    photo: "./team/images/image2.jpg",
  },
  {
    name: "임지후",
    name_i18n: "lim",
    role: "회원가입 / 로그인",
    role_i18n: "lim-role",
    photo: "./team/images/image3.jpg",
  },
  {
    name: "송가람",
    name_i18n: "song",
    role: "서브 및 자료조사",
    role_i18n: "song-role",
    photo: "./team/images/image4.jpg",
  },
  {
    name: "안수현",
    name_i18n: "ahn",
    role: "ppt 자료 / 발표",
    role_i18n: "ahn-role",
    photo: "./team/images/image5.jpg",
  },
  {
    name: "김정현",
    name_i18n: "kim",
    role: "인트로 / 팀원 소개",
    role_i18n: "kim-role",
    photo: "./team/images/image6.jpg",
  },
  {
    name: "임정윤",
    name_i18n: "im",
    role: "인터랙티브 무비",
    role_i18n: "im-role",
    photo: "./team/images/image7.jpg",
  },
];

// Function to introduce team members
function introduceTeam(members) {
  const container = document.getElementById("team-wrapper");
  let currentRow = null;

  members.forEach((member, index) => {
    if (index % 4 === 0) {
      // Start a new row for every 4 members
      currentRow = document.createElement("div");
      currentRow.classList.add("team-row");
      container.appendChild(currentRow);
    }

    const memberDiv = document.createElement("div");
    memberDiv.classList.add("team-member");
    memberDiv.innerHTML = `
          <img src="${member.photo}" alt="${member.name}">
          <h2 data-i18n='${member.name_i18n}'>${member.name}</h2>
          <p data-i18n='${member.role_i18n}'>역할 : ${member.role}</p>
        `;
    currentRow.appendChild(memberDiv);
  });
}

// Call introduceTeam function with teamMembers array
introduceTeam(teamMembers);
