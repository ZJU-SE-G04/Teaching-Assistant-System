<?php
	include '../connect.php';
	$topic_id=$_GET["topic_id"];//获取教师账号
	//$topic_id=1;
	//$lesson_id='ABCDE1';
	//$post_kind=1;

	$result = $conn->query("select count(*) from response_table where topic_id=".$topic_id.";");
	$row=mysqli_fetch_assoc($result);
	$arr['num']=$row['count(*)'];
	
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>