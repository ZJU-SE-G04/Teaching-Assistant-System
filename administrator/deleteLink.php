<?php
	include 'connect.php';
	$linkId=$_GET["linkId"];
    $result = $conn->query("delete from  link_table where id='".$linkId."';");
	$conn->close();
?>