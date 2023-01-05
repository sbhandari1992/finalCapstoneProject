export function showOnlinePerson() {
    // window.location.onload(true);
  let allOnlineUsers = [];
  const endpoint = "https://microbloglite.herokuapp.com/api/";
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${loginData.token}` },
  };
  fetch(endpoint + `posts?limit=1000`, options)
    .then((results) => results.json())
    .then((data) => {
      data.forEach((arrItem) => {
        let hourToShowOnline = 4;
        let actualPostTime = arrItem.createdAt;
        let postTimeMilSec = new Date(actualPostTime).getTime();
        let increasePostTime = postTimeMilSec + hourToShowOnline * 60 * 60 * 1000;
        let currentTime = new Date();
        let currentTimeMiliSec = currentTime.getTime();
        // postSection2.style.display = "none";
        if (increasePostTime > currentTimeMiliSec) {
          if (!allOnlineUsers.includes(arrItem.username)) {
            console.log("yes");
            allOnlineUsers.push(arrItem.username);
            const childElement = document.createElement("div");
            childElement.classList.add("child");
            const imgElement = document.createElement("img");
            imgElement.id = "onlineProfile";
            imgElement.src = "../images/User-user.svg";
            imgElement.alt = "profile picture";
            childElement.appendChild(imgElement);
            const pElement = document.createElement("p");
            pElement.innerText = `${arrItem.username}`;
            childElement.appendChild(pElement);
            const imgTagOnline = document.createElement("img");
            imgTagOnline.id = "onlineIcon";
            imgTagOnline.src = "../images/online-green.jpeg";
            imgTagOnline.alt = "green-online-picture";

            childElement.appendChild(imgTagOnline);
            postSection2.appendChild(childElement);
            postSection2.style.display = "flex";
        //    window.location.reload(true);

          }
        }
      });
    });
}

