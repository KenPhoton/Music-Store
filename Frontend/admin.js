var APIRoot = "http://52.2.112.101";
var fileExtension = ".php";

function logout() {
	localStorage.setItem("userid",-1);
	location.href = 'http://52.2.112.101/';
}

function searchProducts() {
	document.getElementById("productUI").style.visibility = 'visible';
	document.getElementById("purchaseUI").style.visibility = 'hidden';
	document.getElementById("discountUI").style.visibility = 'hidden';
	document.getElementById("policyUI").style.visibility = 'hidden';
}

function addProduct() {
	// let newObj = {productname: productname, fullprice: fullprice, description: description, category: category, stocked: stocked, picname: picname};
	// let jsonObj = json.stringify(newObj);
	// const xmlhttp = new XMLHttpRequest();

	// xmlhttp.onreadystatechange = function() {
	// 	if (this.readyState == 4 && this.status == 200) {
	// 	// Typical action to be performed when the document is ready:
	// 		let response = JSON.parse(xmlhttp.responseText);
			
	// 		if(response.error == '')
	// 			alert("item successfully added!");
	// 		else 
	// 			alert("product add error: " + response.error);
	// 	}
	// 	xmlhttp.open("POST", "insertproduct.php", true);
	// 	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// 	xmlhttp.send(jsonObj);
	// }

	var productname = document.getElementById("productname").value;
	var fullprice = document.getElementById("fullprice").value;
	var description = document.getElementById("description").value;
	var category = document.getElementById("category").value;
	var stocked = document.getElementById("stocked").value;
	var picname = document.getElementById("picname").value;

	var jsonPayload = '{"productname" : "' + productname + '", "fullprice" : "' + fullprice + '", "description" : "' + description + '", "category" : "' + category + '", "stocked" : "' + stocked + '", "picname" : "' + picname + '"}';
	var url = APIRoot + '/insertproduct' + fileExtension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse( xhr.responseText );
		userId = jsonObject.userid;
		if( jsonObject.error != '' )
		{
			alert(jsonObject.error);
			return;
		}
		else
		{
			alert("Successful insertion!");
		}
	}
	catch(err)
	{
		alert(err.message);
	}
}

function deleteProduct(productname) {
	let newObj = {productname: productname};
	let jsonObj = json.stringify(newObj);
	const xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		// Typical action to be performed when the document is ready:
			let response = JSON.parse(xmlhttp.responseText);
			
			if(response.error == '')
				alert("item successfully delete!");
			else
				alert("delete error: " + response.error);
		}
		xmlhttp.open("POST", "deleteproduct.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(jsonObj);
	}
}