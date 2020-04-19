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
        // product has productid/productname/fullprice/description/category/stocked/picname
		// BUT only return id/name/price/picname, and only search thru name/descript/category
		$_POST = json_decode(file_get_contents('php://input'), true);
		$sql = "SELECT * from Product where productname like '%" . $_POST["search"] . "%' or category like '%" . $_POST["search"] . "%' or description like '%" . $_POST["search"] . "%'";
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
                if ($row["picname"]=="")
                    $row["picname"] = "NULL NO PICTURE";
				$searchResults .= '{"productid": "' . $row["productid"] . '","productname": "' . $row["productname"] . '","fullprice": "' . $row["fullprice"] . '","description": "' . $row["description"] . '","category": "' . $row["category"] . '","stocked": "' . $row["stocked"] . '","picname": "' . $row["picname"] . '"}';
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
		$retValue = '{"productid":"","productname":"","fullprice":"","picname":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>