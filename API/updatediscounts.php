<?php
    function calcFinalDiscount($buyers, $interval) {
        $j = 1;
        $sum = 0.0;
        for ($i = 0.0; $j <= ($buyers-1); $i = $i + $interval) {
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
        $sql = "SELECT a.discountid, a.productid, a.count, b.policyvalue FROM Discount a, Policy b WHERE active=1 and issuedate between '2020-01-01' and DATE_SUB('" . $date . "', INTERVAL 7 DAY)";
        $result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc()) {
                $discountid = $row["discountid"];
                $productid = $row["productid"];
                $count = $row["count"];
                $policyvalue = $row["policyvalue"];
                $value = calcFinalDiscount($count, $policyvalue);

                $sql = "UPDATE Discount SET active=0, finaldiscount='" . $value . "' WHERE discountid=" . $discountid . "";
                if ($conn->query($sql) === TRUE) {
                    echo "\r\n\r\nDiscount with ID " . $discountid . " expired. Final discount: " . $value . " percent.\r\n";
                    echo "This record is associated with the following product:\r\n";
                    $sql2 = "SELECT productname, fullprice FROM Product WHERE productid=" . $productid . "";
                    $result2 = $conn->query($sql2);
                    $row2 = $result2->fetch_assoc();
                    echo "\tProduct ID: " . $productid . "\tName: " . $row2['productname'] . "\tPrice: $" . $row2['fullprice'] . "\r\n";
                    echo "This record is associated with the following purchases:\r\n";
                    $sql3 = "SELECT * FROM Purchase WHERE discountid=" . $discountid . "";
                    $result3 = $conn->query($sql3);
                    if ($result3->num_rows > 0)
                    {
                        while($row3 = $result3->fetch_assoc()) {
                            echo "\tPurchase ID: " . $row3['purchaseid'] . "\tName: " . $row3['fname'] . " " . $row3['lname'] . "\tEmail: " . $row3['email'] . "\tAddress: " . $row3['address'] . "\tCredit#: " . $row3['creditnum'] . "\r\n";
                        }
                        echo "\r\n";
                    }
                } else {
                    echo "Error updating record: " . $conn->error;
                }
            } 
		}
		else
		{
            $output = "No records updated. ";
        } 
        
        $sql = "DELETE FROM Discount WHERE count=0";
        $result = $conn->query($sql);
		if ($conn->query($sql) === TRUE) {
            $conn->close();
        } else {
            $conn->close();
            $output += "Error deleting entries.";
            echo $output;
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