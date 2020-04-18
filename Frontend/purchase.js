function populate(productid, discountid, fname, lname, email, address, creditnum) {
let purchaseObj = {productid: productid, discountid: discountid, fname: fname, lname: lname, 
	email: email, address: address, creditnum: creditnum};

let jsonObj = json.stringify(purchaseObj);
const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
    	let response = JSON.parse(xmlhttp.responseText);
 		
 		if(response.error == '')  {
 			if(response.couponCode != '') alert('Your discount code is: ' + response.couponCode);
 		}
 			else alert("purchase failed error: " + response.error);
 			
   		}
	}

	xmlhttp.open("POST", "pointofpurchase.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(jsonObj);
}
