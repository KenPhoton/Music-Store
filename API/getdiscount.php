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
        $_POST = json_decode(file_get_contents('php://input'), true);
        $val = $_POST["search"];
        if ($val !== '')
            $sql = "SELECT * FROM Discount where discountid=" . $val . "";
        else
            $sql = "SELECT * FROM Discount";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $resultcount > 0 )
				{
					$results .= ",";
				}
                $resultcount++;
				$results .= '{"discountid": "' . $row["discountid"] . '","productid": "' . $row["productid"] . '","discountcode": "' . $row["discountcode"] . '","issuedate": "' . $row["issuedate"] . '","count": "' . $row["count"] . '","active": "' . $row["active"] . '","finaldiscount": "' . $row["finaldiscount"] . '"}';
            }
            $conn->close();
            returnWithInfo( $results );
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
		$retValue = '{"discountid":"","productid":"","discountcode":"","issuedate":"","count":"","active":"","finaldiscount":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $results )
	{
		$retValue = '{"results":[' . $results . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>