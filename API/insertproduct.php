<?php
	$servername = "ec2-52-2-112-101.compute-1.amazonaws.com";
    $username = "testuser";
    $password = "jo42hn25yhf92cu";
    $dbname = "discount_db";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// $_POST = json_decode(file_get_contents('test.json'), true);
		// productid/productname/fullprice/description/category/stocked
		$_POST = json_decode(file_get_contents('php://input'), true);
		$productname = $_POST["productname"];
		$fullprice = $_POST["fullprice"];
		$description = $_POST["description"];
		$category = $_POST["category"];
		$stocked = $_POST["stocked"];

		if ($stocked != 0 && $stocked != 1)
            returnWithError("Stocked must be 0 or 1.");
        else if (!is_numeric($fullprice)) {
            returnWithError("Price must be numeric.");
		}
		else {
			$sql = "INSERT INTO Product (productname, fullprice, description, category, stocked) VALUES ('" . $productname . "'," . $fullprice . ",'" . $description . "','" . $category . "'," . $stocked . ")";
			if ($conn->query($sql) === TRUE) {
				$productid = $conn->productid;
				$conn->close();
				returnWithInfo($productid);
			} else {
				$val = $conn->error;
				$conn->close();
				returnWithError($val);
			}
		}
	}
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	function returnWithError( $err )
	{
		$retValue = '{"productid":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $productid )
	{
		$retValue = '{"productid":"' . $productid . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>