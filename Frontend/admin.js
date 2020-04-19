function addProduct(productname, fullprice, description, category, stocked, picname) {
	let newObj = {productname: productname, fullprice: fullprice, description: description, category: category, stocked: stocked, picname: picname};
	let jsonObj = json.stringify(newObj);
	const xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		// Typical action to be performed when the document is ready:
			let response = JSON.parse(xmlhttp.responseText);
			
			if(response.error == '')
				alert("item successfully added!");
			else 
				alert("product add error: " + response.error);
		}
		xmlhttp.open("POST", "insertproduct.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(jsonObj);
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