const popup_button = document.getElementById('popup-button')
var modal = document.getElementById('popup-modal')
const userid_box = document.getElementById('userinfo-box');
const username_tiantian = localStorage.getItem('tiantian-username')
const logout = document.getElementById('logout-box');

userid_box.innerHTML = `Username : ${username_tiantian}`

popup_button.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
    if (!(event.target.closest(".popup-button")) && !(event.target.closest(".popup-modal")))
    {
        modal.style.display = "none"
    }
  } 

logout.onclick = function(){
  logout_user();
}

function logout_user() {
    localStorage.removeItem("tiantian-userkey");
    localStorage.removeItem("tiantian-username");
    window.location.replace('/TianTian/login/');
  }
  