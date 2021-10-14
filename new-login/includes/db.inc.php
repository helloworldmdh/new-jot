<?php
$dbUser = "root";
$dbPassword = "";
$dbName = "userinfo";

$connect = new mysqli('localhost', $dbUser, $dbPassword, $dbName) or die("Unable to connect to database.");

echo "connection to database successful!";