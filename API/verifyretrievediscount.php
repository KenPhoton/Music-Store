<?php
    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

	$servername = "ec2-52-2-112-101.compute-1.amazonaws.com";
    $username = "testuser";
    $password = "jo42hn25yhf92cu";
    $dbname = "discount_db";

    // $_POST = json_decode(file_get_contents('test.json'), true);
    $_POST = json_decode(file_get_contents('php://input'), true);
    $productid = $_POST["productid"];
    $possiblediscount = $_POST["discountcode"];
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM Discount where productid='" . $productid . "' and discountcode='" . $possiblediscount . "' and active='" . 1 . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
            $discountid = $row["discountid"];
            $discountcode = $row["discountcode"];
            $count = $row["count"];
            $issuedate = $row["issuedate"];
            $conn->close();
            returnWithInfo($discountid, $discountcode, $issuedate, $count);
		}
		else
		{
            $discountcode = generateRandomString();
            $sql = "SELECT discountid FROM Discount where discountcode='" . $discountcode . "' ";
            $result = $conn->query($sql);
		    while ($result->num_rows > 0) {
                $discountcode = generateRandomString();
                $sql = "SELECT discountid FROM Discount where discountcode='" . $discountcode . "' ";
                $result = $conn->query($sql);
            }
            
            $issuedate = date('Y-m-d', time());
            $count = 0;
            $active = 1;

            $sql = "INSERT INTO Discount (productid, discountcode, issuedate, count, active) VALUES (" . $productid . ",'" . $discountcode . "','" . $issuedate . "'," . $count . "," . $active . ")";

            if ($conn->query($sql) === TRUE) {
                $discountid = $conn->insert_id;
                $conn->close();
			    returnWithInfo($discountid, $discountcode, $issuedate, $count);
            } else {
                $conn->close();
			    returnWithError( "Failed to create discount code" );
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
		$retValue = '{"discountid":"","discountcode":"","issuedate":"","count":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $discountid, $discountcode, $issuedate, $count)
	{
		$retValue = '{"discountid":' . $discountid . ',"discountcode":"' . $discountcode . '","issuedate":"' . $issuedate . '","count":' . $count . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>