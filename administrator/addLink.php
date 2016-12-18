<?php
	include 'connect.php';
	$linkName=$_POST["linkName"];
	$linkAddress=$_POST["linkAddress"];
    $result = $conn->query('insert into link_table values(NULL,"'.$linkName.'","'.$linkAddress.'");');
	$conn->close();
?>