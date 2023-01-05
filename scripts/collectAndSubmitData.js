//to send form data to server

import { displayPosts } from "./displayPosts.js";


const loginData = JSON.parse(window.localStorage.getItem("login-data"));
let postUrl = 'https://microbloglite.herokuapp.com/api/posts'

let formJSON;
export function collectAndSendData(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    formJSON = Object.fromEntries(data.entries());
    console.log(formJSON);
    setTimeout(postFormData, 300);
    setTimeout(() => {
        displayPosts()
    },500)

}
export function collectAndSendDataForSpecificUser(evt) {
    evt.preventDefault();
    const data = new FormData(evt.target);
    formJSON = Object.fromEntries(data.entries());
    console.log(formJSON);
    setTimeout(postFormData, 300);
    setTimeout(() => {
        displayPosts(loginData.username)
    },500)

}

function postFormData() {
    fetch(postUrl,{
        method: "POST",
        body: JSON.stringify(formJSON),
        headers:{"Content-type": "application/json; charset=UTF-8", Authorization: `Bearer ${loginData.token}`}

    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        console.log(error);
        'Unexpected Error';
    })

}
