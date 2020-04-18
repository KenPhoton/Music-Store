<?php
    function calcFinalDiscount($buyers, $interval) {
        $j = 1;
        $sum = 0.0;
        for ($i = 0.0; $j <= $buyers; $i = $i + $interval) {
            $sum = $sum + $i;
            if ($i >= 49.99) {
                $i = $interval;
            }
            $j = $j + 1;
        }
        $total = $buyers * 1.0;
        return ($sum/$total);
    }

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
        $date = date('Y-m-d', time());
        $sql = "SELECT a.discountid, a.count, b.policyvalue FROM Discount a, Policy b WHERE active=1 and issuedate between '2020-01-01' and DATE_SUB('" . $date . "', INTERVAL 8 DAY)";
        $result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc()) {
                $discountid = $row["discountid"];
                $count = $row["count"];
                $policyvalue = $row["policyvalue"];
                $value = calcFinalDiscount($count, $policyvalue);

                $sql = "UPDATE Discount SET active=0, finaldiscount='" . $value . "' WHERE discountid=" . $discountid . "";
                if ($conn->query($sql) === TRUE) {
                    echo "Record updated successfully";
                } else {
                    echo "Error updating record: " . $conn->error;
                }
            }  
            $conn->close();
		}
		else
		{
            $conn->close();
            echo "No records updated";
		}  
	}
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	function returnWithError( $err )
	{
		$retValue = '{"discountid":"","productid":"","discountcode":"","issuedate":"","count":"","active":"","finalprice":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	function returnWithInfo( $discountid, $productid, $discountcode, $issuedate, $count, $active, $finalprice )
	{
		$retValue = '{"discountid":"' . $discountid . '","productid":"' . $productid . '","discountcode":"' . $discountcode . '","issuedate":"' . $issuedate . '","count":"' . $count . '","active":"' . $active . '","finalprice":"' . $finalprice . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>