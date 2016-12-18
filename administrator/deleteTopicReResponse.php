<?php
	include 'connect.php';
	$topic_id=$_POST["topicId"];
	$floor=$_POST["floor"];
	$reFloor=$_POST["reFloor"];
    $result = $conn->query("delete from  re_response_table where topic_id='".$topic_id."' and floor ='".$floor."' and re_floor ='".$reFloor."';");
	$conn->close();
?>