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
        $policyvalue = $_POST["policyvalue"];
        if (!is_numeric($policyvalue) || $policyvalue <= 0)
            returnWithError("Invalid input");
        else {
			$policyvalue = number_format((float)$policyvalue, 2, '.', '');
			if (strlen($policyvalue) > 5)
				returnWithError("Invalid input");
			else {
				$sql = "UPDATE Policy SET policyvalue='" . $policyvalue . "'";
				if ($conn->query($sql) === TRUE) {
					$conn->close();
					returnWithInfo($policyvalue);
				} else {
					$conn->close();
					returnWithError($conn->error);
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
		$retValue = '{"policyvalue":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $policyvalue )
	{
		$retValue = '{"policyvalue":"' . $policyvalue . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>