<?php
	include 'connect.php';
	$article_id=$_POST["articleId"];
	$floor=$_POST["floor"];
    $result = $conn->query("delete from  comment_table where article_id='".$article_id."' and floor = '".$floor."';");
	$conn->close();
?>