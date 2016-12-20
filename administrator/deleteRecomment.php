<?php
	include 'connect.php';
	$article_id=$_POST["article_id"];
	$floor=$_POST["floor"];
	$reFloor=$_POST["reFloor"];
    $result = $conn->query("delete from  re_comment_table where article_id='".$article_id."' and floor = '".$floor."' and re_floor= '".$reFloor."';");
	$conn->close();
?>