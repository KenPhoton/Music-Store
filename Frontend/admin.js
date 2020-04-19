var APIRoot = "http://52.2.112.101";
var fileExtension = ".php";

function logout() {
	localStorage.setItem("userid",-1);
	location.href = 'http://52.2.112.101/';
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

function loadProducts() {
	document.getElementById("inlineFormInputName").innerHTML = "";
	document.getElementById("productUI").style.visibility = 'visible';
	document.getElementById("purchaseUI").style.visibility = 'hidden';
	document.getElementById("discountUI").style.visibility = 'hidden';
	document.getElementById("policyUI").style.visibility = 'hidden';
	searchProducts();
}

function searchProducts() 
{
    var search = document.getElementById("inlineFormInputName").value;
    
    if (localStorage.hasOwnProperty("userid"))
    {
        var xhr= new XMLHttpRequest();
        xhr.open("POST","./getallproducts.php",false);
        xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
        var jsonPayload = '{"Search" : "' + search + '"}';
        
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
                    
                    for (var i = 0; i < jsonObject.results.length; i++)
                    {
                        //var opt = document.createElement("option");
                        var jsonObjectTwo = jsonObject.results[i];
                        var productname = jsonObjectTwo.productname;
                        var newProduct = table.createTHead(localStorage.getItem("userid"));
                        var newProductinfo = newProduct.insertRow(0);
                        newProductinfo.scope = "row";
                        newProductinfo.value = "1";
                        newProductinfo.insertCell(0).outerHTML = '<th scope="col">'+(jsonObject.results.length - i)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        newProductinfo.insertCell(1).outerHTML = '<th scope="col">'+jsonObjectTwo.productname+"&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        newProductinfo.insertCell(2).outerHTML = '<th scope="col">'+jsonObjectTwo.fullprice+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>";
                        newProductinfo.insertCell(3).outerHTML = '<th scope="col">'+jsonObjectTwo.description+"&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newProductinfo.insertCell(4).outerHTML = '<th scope="col">'+jsonObjectTwo.category+"&nbsp;&nbsp;&nbsp;&nbsp;</th>";
						newProductinfo.insertCell(5).outerHTML = '<th scope="col">'+jsonObjectTwo.stocked+"<&nbsp;&nbsp;&nbsp;&nbsp;/th>";
						newProductinfo.insertCell(5).outerHTML = '<th scope="col">'+jsonObjectTwo.picname+"<&nbsp;&nbsp;&nbsp;&nbsp;/th>";
                        var productid = jsonObjectTwo.productid;
                        newProductinfo.insertCell(7).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.productid+'" onclick="setUpdateId(this.value)" class="btn btn-primary btn" data-toggle="modal" data-target="#EditProductModal">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>';
                        newProductinfo.insertCell(8).outerHTML = '<th scope="col"><button type="button" value="'+jsonObjectTwo.productid+'" class="btn btn-primary btn" onclick="deleteThis(this, this.value)">Delete</button></th>';
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
            document.getElementById("contactSearchResult").innerHTML = err.message;
            alert("BIG ERROR BRO");
        }
    }
    else 
    {
        window.location.assign("index.html");
    }
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