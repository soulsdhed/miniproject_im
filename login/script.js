document.addEventListener("DOMContentLoaded", function () {
    var showSignupBtn = document.getElementsByClassName("show-signup")[0];
    var showSigninBtn = document.getElementsByClassName("show-signin")[0];
    var form = document.getElementsByClassName("form")[0];
    var submitBtn = document.getElementById("submit-btn");


    function resetClass(element, className) {
        element.classList.remove(className);
    }

    let submitBtnLogin = document.getElementById("submit-btn-login");

    if (showSignupBtn) {
        showSignupBtn.addEventListener("click", function () {
            resetClass(form, "signin");
            resetClass(form, "reset");
            form.classList.add("signup");
            submitBtn.style.display = "inline-block"; // submit-btn-login 버튼표시
            submitBtnLogin.style.display = "none"; // submit-btn-login 버튼숨기기
        });
    }

    if (showSigninBtn) {
        showSigninBtn.addEventListener("click", function () {
            resetClass(form, "signup");
            resetClass(form, "reset");
            form.classList.add("signin");
            submitBtn.style.display = "none"
            submitBtnLogin.style.display = "inline-block"; // submit-btn-login 표시
        });
    }
});

const phoneInput = document.getElementById('tel-input');

phoneInput.addEventListener('input', () => {
    let strippedValue = phoneInput.value.replace(/\D/g, '');

    if (strippedValue.length > 3 && strippedValue.length <= 7) {
        phoneInput.value = `${strippedValue.slice(0, 3)}-${strippedValue.slice(3)}`;
    } else if (strippedValue.length > 7) {
        phoneInput.value = `${strippedValue.slice(0, 3)}-${strippedValue.slice(3, 7)}-${strippedValue.slice(7, 11)}`;
    } else {
        phoneInput.value = strippedValue;
    }
});