<?php
$servername = "ec2-52-2-112-101.compute-1.amazonaws.com";
$username = "testuser";
$password = "jo42hn25yhf92cu";
$dbname = "discount_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "hello";
}

// // sql to create table
// $sql = "CREATE TABLE User (
// userid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// username VARCHAR(30) NOT NULL, /* admin username */
// password VARCHAR(30) NOT NULL /* admin password */
// )";

// if ($conn->query($sql) === TRUE) {
//     echo "Table User created successfully";
// } else {
//     echo "Error creating table: " . $conn->error;
// }

// // sql to create table
// $sql = "CREATE TABLE Policy (
// policyid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, /* apparently necessary */
// policyvalue FLOAT(4,2) /* just the value for calculating discounts */
// )";

// if ($conn->query($sql) === TRUE) {
//     echo "Table Policy created successfully";
// } else {
//     echo "Error creating table: " . $conn->error;
// }

// // sql to create table
// $sql = "CREATE TABLE Product (
// productid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// productname VARCHAR(50) NOT NULL, /* name of product */
// fullprice FLOAT(7,2) NOT NULL, /* full price of product */
// description TEXT NOT NULL, /* description of product */
// category VARCHAR(30) NOT NULL, /* for admin purposes, product insertion includes category */
// stocked BOOLEAN NOT NULL, /* whether product is available or not (yes -> appears in search results) */
// picname VARCHAR(50) /* admin has access to repo to add images, this field helps retrieve them, should probably add default pic for when no image is on file */
// )";

// if ($conn->query($sql) === TRUE) {
//     echo "Table Product created successfully";
// } else {
//     echo "Error creating table: " . $conn->error;
// }

// // sql to create table
// $sql = "CREATE TABLE Discount (
// discountid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// productid INT NOT NULL REFERENCES Product(productid),
// discountcode VARCHAR(10) NOT NULL, /* discount string itself */
// issuedate DATE NOT NULL, /* date it was created */
// count INT NOT NULL, /* number of purchases assoc w/discount; could be found w/query on Purchases too but eh */
// active BOOLEAN NOT NULL, /* whether discount is valid or not */
// finaldiscount VARCHAR(20) /* final total discount */
// )";

// if ($conn->query($sql) === TRUE) {
//     echo "Table Discount created successfully";
// } else {
//     echo "Error creating table: " . $conn->error;
// }

// // sql to create table
// $sql = "CREATE TABLE Purchase (
// purchaseid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// productid INT NOT NULL REFERENCES Product(productid),
// discountid INT NOT NULL REFERENCES Discount(discountid),
// fname VARCHAR(25) NOT NULL, /* first name of customer */
// lname VARCHAR(25) NOT NULL, /* last name of customer */
// email VARCHAR(70) NOT NULL, /* customer email */
// address VARCHAR(80) NOT NULL, /* customer street address */
// creditnum VARCHAR(20) NOT NULL /* customer credit placeholder basically */
// )";

// if ($conn->query($sql) === TRUE) {
//     echo "Table Purchase created successfully";
// } else {
//     echo "Error creating table: " . $conn->error;
// }

$conn->close();
?> 