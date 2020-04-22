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
		$picname = $_POST["picname"];

		if ($stocked != 0 && $stocked != 1)
            returnWithError("Stocked must be 0 or 1.");
		else if (!is_numeric($fullprice) || $fullprice <= 0) {
				returnWithError("Price must be numeric.");
		}
		else {
			$fullprice = number_format((float)$fullprice, 2, '.', '');
			if (strlen($fullprice) > 8)
				returnWithError("Invalid input");
			else {
				$sql = "INSERT INTO Product (productname, fullprice, description, category, stocked, picname) VALUES ('" . $productname . "'," . $fullprice . ",'" . $description . "','" . $category . "'," . $stocked . ",'" . $picname . "')";
				if ($conn->query($sql) === TRUE) {
					$productid = $conn->insert_id;
					$conn->close();
					returnWithInfo($productid);
				} else {
					$val = $conn->error;
					$conn->close();
					returnWithError($val);
				}
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