//to send form data to server

import { displayPosts } from "./displayPosts.js";


const loginData = JSON.parse(window.localStorage.getItem("login-data"));
let postUrl = 'https://microbloglite.herokuapp.com/api/posts'

let formJSON;
export function collectAndSendData(evt) {
    // browser.history.deleteAll()
    evt.preventDefault();
    const data = new FormData(evt.target);
    formJSON = Object.fromEntries(data.entries());
    console.log(formJSON);
    setTimeout(postFormData, 300);
    setTimeout(() => {
        window.location.reload(true);
        displayPosts()
    },500)
    // window.location.reload(true);

}
export function collectAndSendDataForSpecificUser(evt) {


    evt.preventDefault();
    const data = new FormData(evt.target);
    formJSON = Object.fromEntries(data.entries());
    console.log(formJSON);
    setTimeout(postFormData, 300);
    // window.location.replace('/');
    setTimeout(() => {
        // browser.history.deleteAll()
        window.location.reload(true);
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
