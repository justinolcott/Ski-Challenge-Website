function login() {
    const nameEl = document.querySelector("#userNameForm");
    localStorage.setItem("userName", nameEl.value);
    // const emailEl = document.querySelector("#exampleDropdownFormEmail1");
    // localStorage.setItem("email", emailEl.value);
    const passEl = document.querySelector("#exampleDropdownFormPassword1");
    localStorage.setItem("password", passEl.value);
    window.location.href = "challenges.html";
}

const pass = document.getElementById("exampleDropdownFormPassword1");
pass.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        login();
    }
});