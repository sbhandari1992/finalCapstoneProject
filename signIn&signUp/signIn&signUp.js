

// import {  login } from "../scripts/auth.js";

// console.log(getLoginData().token);

//for signin ans signup 
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");
const container = document.querySelector(".container");
const form_btn = document.getElementById("form_btn");

signUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});


//to collect and send data for sign up form
const endPoint = "https://microbloglite.herokuapp.com";
document.querySelector('#signUpForm').addEventListener('submit', collectAndSendData);

let formJSON;


function collectAndSendData(evt) {
  evt.preventDefault();
 
  const data = new FormData(evt.target);
  formJSON = Object.fromEntries(data.entries());
  console.log(formJSON);
  sendData()
}

function sendData() {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formJSON)
  }
  fetch(endPoint +"/api/users",options)
   .then(res => res.json())
   .then(data => {
    console.log(data);
    window.localStorage.setItem("register-data",JSON.stringify(data));
    window.location.assign("./index.html"); // redirect
    signUpForm.registerBtn.disabled = true;


   })
}


///this is for login form

"use strict";

const loginForm = document.querySelector("#loginForm");
console.log(loginForm);

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }
    console.log(loginData);

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};
