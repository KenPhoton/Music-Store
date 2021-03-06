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

        if ($stocked != 0 && $stocked != 1)
            returnWithError("Stocked must be 0 or 1.");
        else if (!is_numeric($fullprice) || $fullprice <= 0) {
            returnWithError("Price must be numeric.");
        }
        else {
            $fullprice = number_format((float)$fullprice, 2, '.', '');
			if (strlen($fullprice) > 8)
				returnWithError("Invalid input");
			else {
                $sql = "UPDATE Product SET productname='" . $productname . "', fullprice='" . $fullprice . "', description='" . $description . "', category='" . $category . "', stocked='" . $stocked . "', picname='" . $picname . "'  WHERE productid='" . $productid . "'";
                if ($conn->query($sql) != TRUE)
                {
                    $conn->close();
                    returnWithError( "Error updating product" );
                }
                else
                {
                    $conn->close();
                    $message = '{"error":"", "result":"edited product"}';
                    sendResultInfoAsJson($message);
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
