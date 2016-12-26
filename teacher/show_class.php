<?php
	include '../connect.php';
	$lesson_id=$_GET["lesson_id"];//获取教师账号
	//$lesson_id='ABCDE1';

	$result = $conn->query("select class_id,begin_time from class_table where lesson_id='".$lesson_id."';");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['class_id']=(int)$row['class_id'];
		$x['begin_time']=$row['begin_time'];
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>