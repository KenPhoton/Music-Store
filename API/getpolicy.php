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
		$sql = "SELECT * FROM Policy WHERE policyid=1";
        $result = $conn->query($sql);
        if ($result === TRUE) {
            if ($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $policyvalue = $row["policyvalue"];
                $conn->close();
                returnWithInfo( $policyvalue );
            }
            else
            {
                $conn->close();
                returnWithError( "No Records Found" );
            }
        }
        else
        {
            $conn->close();
            returnWithError($conn->error);
        }
	}
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	function returnWithError( $err )
	{
		$retValue = '{"policyvalue":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $policyvalue )
	{
		$retValue = '{"policyvalue":"' . $policyvalue . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>