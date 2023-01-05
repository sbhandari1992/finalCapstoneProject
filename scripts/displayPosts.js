
"use strict";
import { displayProfile } from '../scripts/displayProfile.js';
window.onload = () => {
    displayProfile();
    displayPosts();
}
const logOut = document.getElementById('logOut');
logOut.addEventListener('click', logout);
export function displayPosts(specificUser) {
    let section4 = document.getElementById('section4');
    const endpoint = "https://microbloglite.herokuapp.com/api/";
    const loginData = JSON.parse(window.localStorage.getItem("login-data"));
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${loginData.token}` },
    };
    fetch(endpoint +`posts?limit=1000`, options)
      .then((results) => results.json())
      .then((data) => {
        if (specificUser) data = data.filter(arItm => specificUser ===  arItm.username );
        data.forEach(arrItem => {
            // console.log(arrItem);
            let timeArray = arrItem.createdAt.split( '-' );
            console.log(timeArray[2]);
            let splitDay = timeArray[2].split('T')
            console.log(splitDay);
            let splitHour = splitDay[1].split(':');
            console.log(splitHour);



            let likeArray = arrItem.likes;
            let blockquote = document.createElement('blockquote');
            let q = document.createElement("q");
            q.innerHTML = arrItem.text;
            blockquote.appendChild(q);
            section4.appendChild(blockquote);
            let userInfoDiv = document.createElement('div');
            userInfoDiv.id = 'secChild'
            let pTag = document.createElement('p');
            pTag.innerHTML = `&mdash; ${arrItem.username}`;
            let imgTag = document.createElement('img');
            imgTag.id = 'postProfileImg';
            imgTag.src = '../images/User-user.svg';
            userInfoDiv.appendChild(pTag);
            userInfoDiv.appendChild(imgTag);
            blockquote.appendChild(userInfoDiv);

            let iconsDiv = document.createElement('div');
            iconsDiv.id = 'postProfileIcons';
            let iconsDiv1 = document.createElement('div');
            iconsDiv1.id = 'iconsDiv1';
            let iconsDiv2 = document.createElement('div');
            iconsDiv2.id = 'iconsDiv2';
            iconsDiv.appendChild(iconsDiv1);
            iconsDiv.appendChild(iconsDiv2);

            let thumbIcon = document.createElement('span');
            thumbIcon.id = 'thumbIconId';
             let countSpan = document.createElement('span');
             thumbIcon.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>';
            countSpan.innerText = '0 likes';

            let heartIcon = document.createElement('span');
            heartIcon.id = 'heartIconId';
            let  timeSpan = document.createElement('span');
            timeSpan.id = 'timeSpanId';
            timeSpan.innerText = `Posted on ${timeArray[0]}/${timeArray[1]}/${splitDay[0] }  ${splitHour[0]}:${splitHour[1]}`
            // heartIcon.innerHTML = '<i class="fa-regular fa-heart"></i>';
            // countSpanHeart.innerText = '0 lovers';
            // <i class="fa fa-trash" aria-hidden="true"></i>

            let deleteIcon = document.createElement('span');
            deleteIcon.id = 'deleteIconId';
            // let countSpanHeart = document.createElement('span');
            deleteIcon.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
            // countSpanHeart.innerText = '0 lovers';


            likeArray.forEach(item => {
                if (item.postId == arrItem._id ) {
                    countSpan.textContent = `${ likeArray.length } likes`;
                    if( loginData.username == item.username) {
                        thumbIcon.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
                    }
                }
            })
            thumbIcon.addEventListener('click', () =>{
                let myLikeId;
                console.log(likeArray);
                likeArray.forEach((likeItems) =>{
                    if (likeItems.username == getLoginData().username) {
                        myLikeId = likeItems._id;
                    }
                });
                if (thumbIcon.innerHTML === '<i class="fa-regular fa-thumbs-up"></i>'){
                    fetch(endpoint+`likes`,{
                        method: "POST",
                        body: JSON.stringify(
                            { postId:  arrItem._id }
                        ),
                        headers:{"Content-type": "application/json; charset=UTF-8", Authorization: `Bearer ${loginData.token}`}
                    })
                    .then(response=> response)
                    .then(data=> {
                        console.log(data);
                        //  window.location.reload(true);
                        
                    })
                    .catch(error => {
                            console.log(error);
                            'Unexpected Error';
                    })
                    thumbIcon.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
                    countSpan.innerText = `${++likeArray.length } likes`;
                    // window.location.reload(true);
                }
                else if (thumbIcon.innerHTML === '<i class="fa-solid fa-thumbs-up"></i>') {
                    console.log('yes it is blacked');
                    fetch(endpoint+`likes`+ '/' + myLikeId,{
                        method: "DELETE",
                        headers:{"Content-type": "application/json; charset=UTF-8", Authorization: `Bearer ${loginData.token}`}
                    })
                    thumbIcon.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>'
                    countSpan.innerText = `${--likeArray.length} likes`;
                }
                // window.location.reload(true);


            });
            iconsDiv1.appendChild(thumbIcon);
            iconsDiv1.appendChild(countSpan);
            // heartIcon.addEventListener('click', () =>{
            //     console.log('it is clicked');
            //     console.log(arrItem._id);
            //     fetch(endpoint+`posts`+ '/' + arrItem._id,{
            //         method: "DELETE",
            //         headers:{"Content-type": "application/json; charset=UTF-8", Authorization: `Bearer ${loginData.token}`}
            //     })
            //     // let count = 0;
            //     // if (heartIcon.innerHTML === '<i class="fa-regular fa-heart"></i>'){
            //     //     heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
            //     //     countSpanHeart.innerText = `${++count} lovers`;
            //     // }
            //     // else{
            //     //     heartIcon.innerHTML = '<i class="fa-regular fa-heart"></i>';
            //     //     countSpanHeart.innerText = `${count--} lovers`;
            //     // }
            // });




            deleteIcon.addEventListener('click', () =>{
                console.log('it is clicked');
                console.log(arrItem._id);
                fetch(endpoint+`posts`+ '/' + arrItem._id,{
                    method: "DELETE",
                    headers:{"Content-type": "application/json; charset=UTF-8", Authorization: `Bearer ${loginData.token}`}
                })
                // let count = 0;
                // if (heartIcon.innerHTML === '<i class="fa-regular fa-heart"></i>'){
                //     heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
                //     countSpanHeart.innerText = `${++count} lovers`;
                // }
                // else{
                //     heartIcon.innerHTML = '<i class="fa-regular fa-heart"></i>';
                //     countSpanHeart.innerText = `${count--} lovers`;
                // }
            });
            // iconsDiv.appendChild(heartIcon);
            iconsDiv1.appendChild(deleteIcon);
            iconsDiv2.appendChild(timeSpan);
            blockquote.appendChild(iconsDiv);

            section4.insertBefore(blockquote, section4.firstChild);
        });
      });
}


