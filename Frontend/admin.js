var APIRoot = "http://52.2.112.101";
var fileExtension = ".php";

function logout() {
	localStorage.removeItem("userid");
	location.href = 'http://52.2.112.101/';
}

function verifyLogin() {
    if (!localStorage.hasOwnProperty("userid"))
        window.location.assign("index.html");
}

function hideOrShow (elementId, showState) {
    var vis = "visible";
    var dis = "block";
    if ( !showState)
    {
        vis = "hidden";
        dis = "none";
    }
    document.getElementById(elementId).style.visibility=vis;
    document.getElementById(elementId).style.display=dis;
}

function setUpdateId(val)
{
    localStorage.setItem("updateid",val);
}

function adminSearchProducts() 
{
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./adminsearchproducts.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        var jsonPayload = '{"search" : "' + search + '"}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    hideOrShow( "productList", true );
                    var jsonObject = JSON.parse( xhr.responseText );
                    var table = document.getElementById("productList");
                    table.deleteTHead();
                    var newProduct = table.createTHead();
                    newProduct.outerHTML='<thead class="thead-light"><colgroup><col style="width: 3%;" span="1"><col style="width: 17%;" span="1"><col style="width: 10%;" span="1"><col style="width: 30%;" span="1"><col style="width: 10%;" span="1"><col style="width: 10%;" span="1"><col style="width: 10%;" span="1"><col style="width: 10%;" span="1"></colgroup></>';
                    
                    for (var i = jsonObject.results.length - 1; i >= 0; i--)
                    {
                        //var opt = document.createElement("option");
                        var jsonObjectTwo = jsonObject.results[i];
                        var productname = jsonObjectTwo.productname;
                        var newProductinfo = table.getElementsByTagName('thead').insertRow();
                        newProductinfo.scope = "row";
						newProductinfo.value = "1";
                        newProductinfo.insertCell(0).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.productid+"</th>";
						newProductinfo.insertCell(1).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.productname+"</th>";
						newProductinfo.insertCell(2).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.fullprice+"</th>";
                        newProductinfo.insertCell(3).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.description+"</th>";
						newProductinfo.insertCell(4).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.category+"</th>";
						newProductinfo.insertCell(5).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.stocked+"</th>";
                        var productid = jsonObjectTwo.productid;
                        newProductinfo.insertCell(6).outerHTML = '<th style="font-size: x-small" scope="col"><button type="button" value="'+jsonObjectTwo.productid+'" onclick="setUpdateId(this.value)" class="btn btn-primary btn" data-toggle="modal" data-target="#EditProductModal">Edit</button></th>';
                        newProductinfo.insertCell(7).outerHTML = '<th style="font-size: x-small" scope="col"><button type="button" value="'+jsonObjectTwo.productid+'" class="btn btn-primary btn" onclick="deleteThis(this, this.value)">Delete</button></th>';
                        thead.outerHTML
                    }
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            document.getElementById("productSearchResult").innerHTML = err.message;
            alert("BIG ERROR BRO");
        }
    }
    else 
    {
        window.location.assign("index.html");
    }
}

function editProduct() {
	var productname = document.getElementById("productname2").value;
	var fullprice = document.getElementById("fullprice2").value;
	var description = document.getElementById("description2").value;
	var category = document.getElementById("category2").value;
	var stocked = document.getElementById("stocked2").value;
		
	document.getElementById("productname2").value = "";
	document.getElementById("fullprice2").value = "";
	document.getElementById("description2").value = "";
	document.getElementById("category2").value = "";
	document.getElementById("stocked2").value = "";
		
	if(productname == "" || fullprice == "" || description == "" || category == "" || stocked == "")
	{
		alert("Product not edited. Missing information");
	}
	else
	{
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "./editproduct.php", false);
		xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
		var id = localStorage.getItem("userid");
		var productid = localStorage.getItem("updateid");

		var jsonPayload = '{"productid" : "' + productid + '", "productname" : "' + productname + '", "fullprice" : "' + fullprice + '", "description" : "' + description + '", "category" : "' + category + '", "stocked" : "' + stocked + '"}';
		
		try
		{
			xhr.send(jsonPayload);
			var jsonObject = JSON.parse( xhr.responseText );
			var error = jsonObject.error;
			if (error != "")
				{
					confirm("Error editing product: " + error);
				}
			window.location.reload();
		}
		catch(err)
		{
			alert(err.message);
		}
	}
}

function addProduct() {
	// let newObj = {productname: productname, fullprice: fullprice, description: description, category: category, stocked: stocked};
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

	var jsonPayload = '{"productname" : "' + productname + '", "fullprice" : "' + fullprice + '", "description" : "' + description + '", "category" : "' + category + '", "stocked" : "' + stocked + '"}';
	var url = APIRoot + '/insertproduct' + fileExtension;
	
	if(productname == "" || fullprice == "" || description == "" || category == "" || stocked == "")
	{
		alert("Product not added. Missing information");
	}
	else
	{
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.send(jsonPayload);
			var jsonObject = JSON.parse( xhr.responseText );
			if( jsonObject.error != '' )
			{
				alert(jsonObject.error);
				return;
			}
			else
			{
				alert("Successful insertion!");
				window.location.reload();
			}
		}
		catch(err)
		{
			alert(err.message);
		}
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

function searchPurchaseHistory() 
{
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./searchpurchasehistory.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        var jsonPayload = '{"search" : "' + search + '"}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    hideOrShow( "purchaseList", true );
                    var jsonObject = JSON.parse( xhr.responseText );
                    var table = document.getElementById("purchaseList");
					table.deleteTHead();
                    
                    for (var i = jsonObject.results.length - 1; i >= 0; i--)
                    {
                        //var opt = document.createElement("option");
                        var jsonObjectTwo = jsonObject.results[i];
                        var newPurchase = table.createTHead(localStorage.getItem("userid"));
                        var newPurchaseinfo = newPurchase.insertRow(0);
                        newPurchaseinfo.scope = "row";
						newPurchaseinfo.value = "1";
						var namestring = jsonObjectTwo.fname + " " + jsonObjectTwo.lname;
                        newPurchaseinfo.insertCell(0).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.purchaseid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(1).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.productid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(2).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.discountid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        newPurchaseinfo.insertCell(3).outerHTML = '<th style="font-size: small" scope="col">'+namestring+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(4).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.email+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(5).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.address+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        newPurchaseinfo.insertCell(6).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.creditnum+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        //var newRow = table.rows[0];
                        //table.parent.insertBefore(newRow, table.rows[1]);
                        //alert(ContactName);
                        //opt.text = ContactName;
                        //opt.value = "";
                        //contactList.options.add(opt);
                    }
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            document.getElementById("purchaseSearchResult").innerHTML = err.message;
            alert("BIG ERROR BRO");
        }
    }
    else 
    {
        window.location.assign("index.html");
    }
}

function editPolicy() {
	if (localStorage.hasOwnProperty("userid"))
    {
		var policyvalue = document.getElementById("inlineFormInputName").value;
		var xhr= new XMLHttpRequest();
        xhr.open("POST","./editpolicy.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        var jsonPayload = '{"policyvalue" : "' + policyvalue + '"}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
					var jsonObject = JSON.parse( xhr.responseText );
					if (jsonObject.error == "") 
					{
						document.getElementById("discountPolicy").innerHTML = jsonObject.policyvalue;
					}
					else
					{
						alert("Failed to update policy: " + jsonObject.error);
					}
				}
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            alert("BIG ERROR BRO: " + err);
		}
	}
	else
	{
		window.location.assign("index.html");
	}
}

function getDiscounts() 
{
    if (localStorage.hasOwnProperty("userid"))
    {
		var xhr2= new XMLHttpRequest();
        xhr2.open("POST","./getpolicy.php",false);
        xhr2.setRequestHeader("Content-type","application/json; charset=UTF-8");
        var jsonPayload2 = '{}';
        
        try
        {
            xhr2.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
					var jsonObject2 = JSON.parse( xhr2.responseText );
					if (jsonObject2.error == '')
					{
						document.getElementById("discountPolicy").innerHTML = " " + jsonObject2.policyvalue + " ";
					}
					else
					{
						document.getElementById("discountPolicy").innerHTML = jsonObject2.error;
					}
                }
            };
            xhr2.send(jsonPayload2);
        }
        catch(err)
        {
            alert("BIG ERROR BRO: " + err);
        }

        var xhr= new XMLHttpRequest();
        xhr.open("POST","./getalldiscounts.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        var jsonPayload = '{}';
        
        try
        {
            xhr.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    hideOrShow( "discountList", true );
                    var jsonObject = JSON.parse( xhr.responseText );
                    var table = document.getElementById("discountList");
					table.deleteTHead();
                    
                    for (var i = jsonObject.results.length - 1; i >= 0; i--)
                    {
                        //var opt = document.createElement("option");
                        var jsonObjectTwo = jsonObject.results[i];
                        var newPurchase = table.createTHead(localStorage.getItem("userid"));
                        var newPurchaseinfo = newPurchase.insertRow(0);
                        newPurchaseinfo.scope = "row";
						newPurchaseinfo.value = "1";
                        newPurchaseinfo.insertCell(0).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.discountid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(1).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.productid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(2).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.discountcode+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        newPurchaseinfo.insertCell(3).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.issuedate+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(4).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.count+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newPurchaseinfo.insertCell(5).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.active+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        newPurchaseinfo.insertCell(6).outerHTML = '<th style="font-size: small" scope="col">'+jsonObjectTwo.finaldiscount+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        //var newRow = table.rows[0];
                        //table.parent.insertBefore(newRow, table.rows[1]);
                        //alert(ContactName);
                        //opt.text = ContactName;
                        //opt.value = "";
                        //contactList.options.add(opt);
                    }
                }
            };
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            alert("BIG ERROR BRO: " + err);
        }
    }
    else 
    {
        window.location.assign("index.html");
    }
}

// Deletes a table entry.
function deleteThis(id, val){
    if(confirm("Are you sure you would like to delete this product?")){
        id.parentNode.parentNode.parentNode.removeChild(id.parentNode.parentNode);
        
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./deleteproduct.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");

        var jsonPayload = '{"productid" : "' + val + '"}';

        try
        {
            xhr.send(jsonPayload);
            var jsonObject = JSON.parse( xhr.responseText );
            var error = jsonObject.error;
            if (error != "")
            {
                confirm("Error deleting product.");
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
}

// Edits a table data entry. Sets all the fields to an editable text box. 
function editThis(el){
    // Replace 'edit' button with a 'save' button
    var row = el.parentNode.parentNode;
    row.getElementByClassName
	var editButton = row.childNodes[13].childNodes[0];
	var productid = row.childNode[1];
    var productname = row.childNodes[3];
    var fullprice = row.childNodes[5];
    var description = row.childNodes[7];
	var category = row.childNodes[9];
	var stocked = row.childNodes[11];

    if (editButton.innerHTML == "Edit") {
		editButton.innerHTML = "Save";

		// Make all fields for this row editable
		productid.contentEditable = "true";
		productname.contentEditable = "true";
		fullprice.contentEditable = "true";
		description.contentEditable = "true";
		category.contentEditable = "true";
		stocked.contentEditable = "true";
		productid.style.backgroundColor = "white";
		productname.style.backgroundColor = "white";
		fullprice.style.backgroundColor = "white";
		description.style.backgroundColor = "white";
		category.style.backgroundColor = "white";
		stocked.style.backgroundColor = "white";
		productid.style.border = "thin solid #2db2ff";
		productname.style.border = "thin solid #2db2ff";
		fullprice.style.border = "thin solid #2db2ff";
		description.style.border = "thin solid #2db2ff";
		category.style.border = "thin solid #2db2ff";
		stocked.style.border = "thin solid #2db2ff";
    }

    // Wait for user to click 'save' button
    else {
		// Upon clicking 'save' button, change all the fields back to html, but with new values.
		editButton.innerHTML = "Edit";

		productid.contentEditable = "false";
		productname.contentEditable = "false";
		fullprice.contentEditable = "false";
		description.contentEditable = "false";
		category.contentEditable = "false";
		stocked.contentEditable = "false";
		productid.style.backgroundColor = "initial";
		productname.style.backgroundColor = "initial";
		fullprice.style.backgroundColor = "initial";
		description.style.backgroundColor = "initial";
		category.style.backgroundColor = "initial";
		stocked.style.backgroundColor = "initial";
		productid.style.border = "initial";
		productname.style.border = "initial";
		fullprice.style.border = "initial";
		description.style.border = "initial";
		category.style.border = "initial";
		stocked.style.border = "initial";
    }
}