(async () => {
    let authenticated = false;
    const userName = localStorage.getItem('userName');
    console.log("userName", userName);
    if (userName) {
      const user = await getUser(userName);
      authenticated = user?.authenticated;
    }
  
    if (authenticated) {
        console.log("Authenticated");
        window.location.href = 'challenges.html';
    } else {
      // do nothing
    }
  })();


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

async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userNameForm')?.value;
    const password = document.querySelector('#exampleDropdownFormPassword1')?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: userName, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const body = await response.json();
  
    if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        window.location.href = 'challenges.html';
    } else {
        console.log("Error logging in or creating");
        // const modalEl = document.querySelector('#msgModal');
        // modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        // const msgModal = new bootstrap.Modal(modalEl, {});
        // msgModal.show();
    }
}

// function setDisplay(controlId, display) {
//     const playControlEl = document.querySelector(`#${controlId}`);
//     if (playControlEl) {
//       playControlEl.style.display = display;
//     }
// }





async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}

async function createUser() {
    loginOrCreate(`/api/auth/create`);
}

async function getUser(username) {
    let scores = [];
    // See if we have a user with the given username.
    const response = await fetch(`/api/user/${username}`);
    if (response.status === 200) {
        return response.json();
    }
  
    return null;
}

function logout() {
fetch(`/api/auth/logout`, {
    method: 'delete',
}).then(() => (window.location.href = '/'));
}