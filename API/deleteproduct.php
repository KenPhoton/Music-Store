<?php
	$servername = "ec2-52-2-112-101.compute-1.amazonaws.com";
    $username = "testuser";
    $password = "jo42hn25yhf92cu";
    $dbname = "discount_db";

    // $_POST = json_decode(file_get_contents('test.json'), true);
	// productid/productname/fullprice/description/category/stocked
	$_POST = json_decode(file_get_contents('php://input'), true);
    $productid = $_POST["productid"];
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "DELETE FROM Product WHERE productid=" . $productid . "";
        if ($conn->query($sql) === TRUE) {
            $conn->close();
            returnWithInfo($productid);
        } else {
            $val = $conn->error;
            $conn->close();
            returnwithError( $val );
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