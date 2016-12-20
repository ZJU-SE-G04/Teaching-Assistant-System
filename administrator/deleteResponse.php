<?php
	include 'connect.php';
	$topic_id=$_GET["topic_id"];
	$floor=$_GET["floor"];
    $result = $conn->query("delete from  response_table where topic_id='".$topic_id."' and floor = '".$floor."';");
	$conn->close();
?>