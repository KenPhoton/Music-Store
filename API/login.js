 import Cookies from '/path/to/js.cookie.mjs'


const form = document.getElementById("form");
form.addEventListener('submit', ()=>{
	login(document.getElementById("username").value, document.getElementById("password").value);
});

function login(username, password) {
	let loginInfo = {username: username, password: password};
	let jsonObj = JSON.stringify(loginInfo);
const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let response = JSON.parse(xmlhttp.responseText);
 		Cookies.set("userId", name, {expires: 7});
 		(response.error == '') ? window.location.href = 'home.html' : alert("login failed");
    }


xmlhttp.open("POST", "login.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(jsonObj);
}
}
