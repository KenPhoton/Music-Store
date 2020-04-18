

document.getElementById("form").addEventListener('submit', () => {
	console.log("works");
	createAccount(document.getElementById("username").value, document.getElementById("email").value, document.getElementById("password").value);
});

function createAccount(name, pass) {
	let createAccount = {name: username, pass: pass};
	let jsonObj = JSON.stringify(createAccount);
const xmlhttp = new HMLHttpRequest();

xmlhttp.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) {
		let response = JSON.parse(xmlhttp.responseText);
		Cookies.set("userId", name, {expires: 7});
		(response.error == '') ? window.location.href = 'home.html' : alert("createAccount fail!");
	}
	
	}
	xmlhttp.open("POST", "createAccount.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(jsonObj);
}