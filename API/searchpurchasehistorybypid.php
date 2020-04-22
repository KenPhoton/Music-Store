<?php
	$searchResults = "";
	$searchCount = 0;

	$servername = "ec2-52-2-112-101.compute-1.amazonaws.com";
    $username = "testuser";
    $password = "jo42hn25yhf92cu";
    $dbname = "discount_db";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        //purchaseid,productid,discountid,fname,lname,email,address,creditnum
        $_POST = json_decode(file_get_contents('php://input'), true);
        $val = $_POST["search"];
        if ($val !== '')
            $sql = "SELECT * FROM Purchase where productid=" . $val . "";
        else
            $sql = "SELECT * FROM Purchase";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '{"purchaseid": "' . $row["purchaseid"] . '","productid": "' . $row["productid"] . '","discountid": "' . $row["discountid"] . '","fname": "' . $row["fname"] . '","lname": "' . $row["lname"] . '","email": "' . $row["email"] . '","address": "' . $row["address"] . '","creditnum": "' . $row["creditnum"] . '"}';
            }
            $conn->close();
            returnWithInfo( $searchResults );
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
		$retValue = '{"purchaseid":"","productid":"","discountid":"","fname":"","lname":"","email":"","address":"","creditnum":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>