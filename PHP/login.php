<?php
	$Username = "";
    $Userid = 0;
    
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
		$passwordFromFront = $_POST["password"];
		$sql = "SELECT * FROM User where username='" . $_POST["username"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$passwordFromDB = $row["password"];
			if (!($passwordFromFront === $passwordFromDB)) { // no security we die like men
				$conn->close();
				//echo "1";
				returnWithError( "Invalid Password" );
			}
			else
			{
				$username = $row["username"];
				$userid = $row["userid"];
				$conn->close();
				//echo "0";
				returnWithInfo($username, $userid );
			}
		}
		else
		{
			$conn->close();
			//echo "2";
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
		$retValue = '{"username":"","userid":"0","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $username, $userid )
	{
		$retValue = '{"username":"' . $username . '","userid":"' . $userid . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>