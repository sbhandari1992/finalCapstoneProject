"use strict";
import { showOnlinePerson } from '../scripts/displayOnline.js';
import { displayProfile } from '../scripts/displayProfile.js';
import { displayPosts } from '../scripts/displayPosts.js';
import { collectAndSendData } from '../scripts/collectAndSubmitData.js'

const loginData = JSON.parse(window.localStorage.getItem("login-data"));

window.onload = () => {
    displayProfile();
    displayPosts();
    showOnlinePerson();

}
let profileForm = document.getElementById('profileForm');
profileForm.addEventListener('submit', collectAndSendData);

const $searchInput = document.getElementById('searchInput');
const $selectTag = document.getElementById('selectTag');


//this is for search post by listen a enter key event
// $searchInput.onkeydown = function searchPostById (event)  {
//         if(event.key === 'Enter') {  
//             let inputValue = $searchInput.value;  
//             console.log(inputValue);
//             $searchInput.value = '';
//             displayPosts(loginData.username);
//         }
// }