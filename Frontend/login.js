//  import Cookies from '/path/to/js.cookie.mjs'


// const form = document.getElementById("form");
// form.addEventListener('submit', ()=>{
// 	login(document.getElementById("user").value, document.getElementById("pass").value);
// });

// function login(username, password) {
// 	let loginInfo = {username: username, password: password};
// 	let jsonObj = JSON.stringify(loginInfo);
// const xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//        let response = JSON.parse(xmlhttp.responseText);
//  		Cookies.set("userId", name, {expires: 7});
//  		(response.error == '') ? window.location.href = 'index.html' : alert("login failed");
//     }


// xmlhttp.open("POST", "login.php", true);
// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xmlhttp.send(jsonObj);
// 	}
// }

var APIRoot = "http://52.2.112.101";
var fileExtension = ".php";

function login()
{
	var login = document.getElementById("user").value;
	var password = document.getElementById("pass").value;

	var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
	var url = APIRoot + '/login' + fileExtension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse( xhr.responseText );
		userId = jsonObject.userid;
		if( userId < 1 )
		{
			return;
		}
		location.href = 'http://52.2.112.101/Music-Store/Frontend/Admin.html';
	}
	catch(err)
	{
		alert(err.message);
	}
}