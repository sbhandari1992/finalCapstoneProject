
// const loginData = JSON.parse(window.localStorage.getItem("login-data"));
// console.log(loginData);
// console.log(loginData.username);

let sec3 = document.getElementById("section3");
// console.log(sec3);
let sec4 = document.getElementById("section4");
// console.log(sec4);

{/* <div id="profileDiv">
<img id="profileImg" src="../images/image.jpeg"; alt="cdhsbci" >
<p id="userName">Clever Husky </p>
<p id="bio">Physical Therapist</p>
<!-- <img id="onlineGreen" src="../images/online-green.jpeg"; alt="cdhsbci"> -->
</div> */}

export  function displayProfile() {
    const loginData = JSON.parse(window.localStorage.getItem("login-data"));
    // console.log(loginData);
    const endpoint = `https://microbloglite.herokuapp.com/api/users/${loginData.username}`;


    const options = { 
        method: "GET",
        headers: {Authorization: `Bearer ${loginData.token}`},
    };

    fetch(endpoint, options)
    .then(results => results.json())
    .then(data => {
        // console.log(data);
        // const profileDiv = document.createElement("div");
        // profileDiv.id = 'profileDiv';
        // console.log(profileDiv);

        // const imgTag = document.createElement('img');
        // imgTag.id = 'profileImg';
        // console.log(imgTag);
        // imgTag.src = `../images/image.jpeg`;
        // profileDiv.appendChild(imgTag);
        // const pTagUsername = document.createElement('p');
        // pTagUsername.id = 'userName';
        // console.log(pTagUsername);
        // pTagUsername.innerText = loginData.username;
        // profileDiv.appendChild(pTagUsername);
        // const pTagBio = document.createElement('p');
        // pTagBio.id = 'bio';
        // console.log(pTagBio);
        // pTagBio.innerText = loginData.bio;
        // profileDiv.appendChild(pTagBio);
        // const pTagOnline = document.createElement('p');
        // pTagOnline.id = 'onlineGreen';
        // console.log(pTagOnline);


        // sec3.appendChild(profileDiv);
        // // sec3.appendChild(profileDiv);





        const userName = document.querySelector('#userName');
        userName.innerText = data.username;
        const bio = document.querySelector('#bio');
        bio.innerText = data.bio;

        // const p2 = document.createElement('p');
        // p2.id = 'onlineProfile';
        // console.log(p2);
        // p2.innerText = ` xksk kxs ks `;
        // profileDiv.appendChild(p2);
        // const p3 = document.createElement('p');
        // p3.id = 'onlineProfile';
        // console.log(p3);
        // p3.innerText = ` xksk kxs ks `;
        // profileDiv.appendChild(p3);


    })

}