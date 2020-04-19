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

function login()
{
  var login = document.getElementById("user").value;
  var password = document.getElementById("pass").value;
  document.getElementById("loginresult").innerHTML = "";
  
  var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php", false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);
    var jsonObject = JSON.parse( xhr.responseText );
    userId = jsonObject.id;
    if( userid < 1 )
    {
      document.getElementById("loginresult").innerHTML = "User/Password combination incorrect";
      return;
	}
	(response.error == '') ? window.location.href = 'index.html' : alert("login failed");
  }
  catch(err)
  {
    document.getElementById("loginresult").innerHTML = err.message;
  }
}