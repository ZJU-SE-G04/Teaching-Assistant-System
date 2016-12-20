<?php
	include 'connect.php';
	$topic_id=$_POST["topicId"];
	$floor=$_POST["floor"];
    $result = $conn->query("delete from  response_table where topic_id='".$topic_id."' and floor = '".$floor."';");
	$conn->close();
?>