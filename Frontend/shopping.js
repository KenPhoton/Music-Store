function getallproducts(productid , productname, fullprice, picname) {
	const xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		// Typical action to be performed when the document is ready:
		let response = JSON.parse(xmlhttp.responseText);
			if(response.error == '')  {
				for(i = 0; i < response.length; i++) {
					generateProduct(response[i].productid, response[i].productname, response[i].fullprice, response[i].picname);
				}
			}
			else{
				alert("populate failed");
			}
		}
		xmlhttp.open("POST", "getallproducts.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send();
	}
}



function generateProduct(productid , productname, fullprice, picname) {
//TODO generate product object here
}