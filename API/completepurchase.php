<?php
	$servername = "ec2-52-2-112-101.compute-1.amazonaws.com";
    $username = "testuser";
    $password = "jo42hn25yhf92cu";
    $dbname = "discount_db";

    // $_POST = json_decode(file_get_contents('test.json'), true);
    $_POST = json_decode(file_get_contents('php://input'), true);
    $productid = $_POST["productid"];
    $discountid = $_POST["discountid"];
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $creditnum = $_POST["creditnum"];
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $sql = "INSERT INTO Purchase (productid, discountid, fname, lname, email, address, creditnum) VALUES (" . $productid . ", " . $discountid . ", '" . $fname . "', '" . $lname . "', '" . $email . "', '" . $address . "', '" . $creditnum . "')";
        if ($conn->query($sql) === TRUE) {
            $purchaseid = $conn->insert_id;
            $sql = "UPDATE Discount SET count=count+1 WHERE discountid='" . $discountid . "' ";
            if ($conn->query($sql) === TRUE) {
                $conn->close();
                returnWithInfo($purchaseid);
            } else {
                $conn->close();
                returnWithError( "Failed to update discount code use count" );
            }
        } else {
            $err = $conn->error();
            $conn->close();
            returnWithError( $err );
        }     
	}
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	function returnWithError( $err )
	{
		$retValue = '{"purchaseid":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $purchaseid )
	{
		$retValue = '{"purchaseid":"' . $purchaseid . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>