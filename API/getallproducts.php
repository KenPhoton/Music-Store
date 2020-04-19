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
        $sql = "SELECT * FROM Product";
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
				$results .= '{"productid": "' . $row["productid"] . '","productname": "' . $row["productname"] . '","fullprice": "' . $row["fullprice"] . '","description": "' . $row["description"] . '","category": "' . $row["category"] . '","stocked": "' . $row["stocked"] . '","picname": "' . $row["picname"] . '"}';
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
		$retValue = '{"productid":"","productname":"","fullprice":"","picname":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $results )
	{
		$retValue = '{"results":[' . $results . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>