
console.log('i am profile js');
import { displayPosts } from '../scripts/displayPosts.js';
import { displayProfile } from '../scripts/displayProfile.js'
import { collectAndSendDataForSpecificUser } from '../scripts/collectAndSubmitData.js'

const loginData = JSON.parse(window.localStorage.getItem("login-data"));
console.log(loginData);

window.onload = () => {
    displayProfile();
    displayPosts(loginData.username);
}

"use strict";
let profileForm = document.getElementById('profileForm');
let feedBtn = document.getElementById('feedBtn');
console.log(feedBtn);
feedBtn.onclick = () => {
    console.log('feedBtn clicked');
    window.location.replace("../posts");


}
profileForm.addEventListener('submit', collectAndSendDataForSpecificUser);










