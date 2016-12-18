<?php
	include 'connect.php';
	$topic_id=$_GET["topicId"];
    $result = $conn->query("delete from  topic_table where topic_id='".$topic_id."';");
	$conn->close();
?>