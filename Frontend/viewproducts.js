function setPurchaseId(val)
{
    localStorage.setItem("purchaseid",val);
}

function searchProducts() 
{
    var search = document.getElementById("inlineFormInputName").value;
    var xhr= new XMLHttpRequest();
    xhr.open("POST","./searchproducts.php",false);
    xhr.setRequestHeader("Content-type","application/json; charset=UTF-8");
    var jsonPayload = '{"search" : "' + search + '"}';
    
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                var jsonObject = JSON.parse( xhr.responseText );
                var section = document.getElementById("productsection");
                section.innerHTML="";
                
                for (var i = jsonObject.results.length - 1; i >= 0; i--)
                {
                    var jsonObjectTwo = jsonObject.results[i];
                    section.innerHTML += '<div class="product-card"><div class="product-image"><img src="'+jsonObjectTwo.picname+'" height = "250" width = "250" /></div><div class="product-info"><h5>'+jsonObjectTwo.productname+'</h5><h6>$'+jsonObjectTwo.fullprice+'</h6><button type="button" value="'+jsonObjectTwo.productid+'" onclick="setPurchaseId(this.value)" class="btn btn-primary btn" data-toggle="modal" data-target="#PurchaseProductModal">Checkout</button></div></div>';
                    
                    if ((jsonObject.results.length - i)%3 == 0)
                        section.innerHTML += "<br></br>";
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        alert(err.message);
    }
}

function purchaseProduct() 
{
    var fname = document.getElementById("fname").value;
	var lname = document.getElementById("lname").value;
	var email = document.getElementById("email").value;
	var address = document.getElementById("address").value;
    var creditnum = document.getElementById("creditnum").value;
    var discountcode = document.getElementById("discountcode").value;
    var productid = localStorage.getItem("purchaseid");

	var jsonPayload = '{"productid" : "' + productid + '", "discountcode" : "' + discountcode + '"}';
	
	if(fname == "" || lname == "" || email == "" || address == "" || creditnum == "")
	{
		alert("Checkout not finalized. Missing information.");
	}
	else
	{
        var alerttext = "";
        var xhr2 = new XMLHttpRequest();
		xhr2.open("POST", './verifyretrievediscount.php', false);
		xhr2.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr2.send(jsonPayload);
			var jsonObject2 = JSON.parse( xhr2.responseText );
			if( jsonObject2.error != '' )
			{
				alert("Failed to verify/retrieve discount code: " + jsonObject2.error);
				return;
			}
			else
			{
                if (jsonObject2.discountcode == discountcode)
                    alerttext += "Successfully verified discount code: " + jsonObject2.discountcode + ". ";
                else
                    alerttext += "Generated a new discount code: " + jsonObject2.discountcode + ". ";

                var jsonPayload2 = '{"productid":"'+productid+'","discountid":"'+jsonObject2.discountid+'","fname":"'+fname+'","lname":"'+lname+'","email":"'+email+'","address":"'+address+'","creditnum":"'+creditnum+'"}'; 

                var xhr = new XMLHttpRequest();
                xhr.open("POST", './completepurchase.php', false);
                xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
                xhr.send(jsonPayload2);
                var jsonObject = JSON.parse( xhr.responseText );
                if( jsonObject.error != '' )
                {
                    alert("Failed to finalize checkout: " + jsonObject.error);
                    return;
                }
                else
                {
                    var count = parseInt(jsonObject2.count) + 1;
                    var d = new Date(jsonObject2.issuedate);
                    d.setDate(d.getDate() + 8);
                    var dd = d.getDate();
                    var mm = d.getMonth() + 1;
                    var y = d.getFullYear();
                    var someFormattedDate = mm + '/'+ dd + '/'+ y;
                    alert(alerttext + "Successfully finalized purchase! Your discount code expires at 11:59 PM on " + someFormattedDate + ". The current number of purchases associated with this discount is " + count + ".");
                    window.location.reload();
                }
            }
		}
		catch(err)
		{
			alert(err.message);
		}
	}
}