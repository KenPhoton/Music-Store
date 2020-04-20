<?php
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
        $_POST = json_decode(file_get_contents('php://input'), true);
        $productid = $_POST['productid'];
        $productname = $_POST["productname"];
        $fullprice = $_POST["fullprice"];
        $description = $_POST["description"];
        $category = $_POST["category"];
        $stocked = $_POST["stocked"];
        $picname = $_POST["picname"];

        $sql = "UPDATE Product SET productname='" . $productname . "', fullprice='" . $fullprice . "', description='" . $description . "', category='" . $category . "', stocked='" . $stocked . "' WHERE productid='" . $productid . "'";
        if ($conn->query($sql) != TRUE)
        {
            $conn->close();
            returnWithError( "Error updating product" );
        }
        else
        {
            if (!($picname == "")) {
                $sql = "UPDATE Product SET picname='" . $picname . "' WHERE productid='" . $productid . "'";
                if ($conn->query($sql) != TRUE)
                {
                    $conn->close();
                    $message = '{"error":"", "result":"edited product"}';
                    sendResultInfoAsJson($message);
                }
                else
                {
                    $conn->close();
                    returnWithError( "Error updating product" );
                }
            }
            $conn->close();
            $message = '{"error":"", "result":"edited product"}';
            sendResultInfoAsJson($message);
        }
    }

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
