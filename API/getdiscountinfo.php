<?php
	$servername = "ec2-52-2-112-101.compute-1.amazonaws.com";
    $username = "testuser";
    $password = "jo42hn25yhf92cu";
    $dbname = "discount_db";

	// $_POST = json_decode(file_get_contents('test.json'), true);
	$_POST = json_decode(file_get_contents('php://input'), true);
    $discountid = $_POST["discountid"];
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM Discount where discountid='" . $discountid . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
            $discountid = $row["discountid"];
            $productid = $row["productid"];
            $discountcode = $row["discountcode"];
            $issuedate = $row["issuedate"];
            $count = $row["count"];
            $active = $row["active"];
            $finalprice = $row["finalprice"];
            $conn->close();
            returnWithInfo($discountid, $productid, $discountcode, $issuedate, $count, $active, $finalprice);
		}
		else
		{
            $conn->close();
            returnWithError( "No Records Found" );
		}
	}
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	function returnWithError( $err )
	{
		$retValue = '{"discountid":"","productid":"","discountcode":"","issuedate":"","count":"","active":"","finalprice":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $discountid, $productid, $discountcode, $issuedate, $count, $active, $finalprice )
	{
		$retValue = '{"discountid":"' . $discountid . '","productid":"' . $productid . '","discountcode":"' . $discountcode . '","issuedate":"' . $issuedate . '","count":"' . $count . '","active":"' . $active . '","finalprice":"' . $finalprice . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>