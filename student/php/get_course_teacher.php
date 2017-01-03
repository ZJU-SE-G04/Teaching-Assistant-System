<?php
	include 'connect.php';


	$course_id=$_GET["courseID"];//获取教师账号
	//$courseID="ABCDE1";

	$result = $conn->query("select distinct teach_table.id,name from teacher_table join teach_table on teacher_table.id=teach_table.id where lesson_id='".$course_id."';");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$arr[] = $row;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>


	