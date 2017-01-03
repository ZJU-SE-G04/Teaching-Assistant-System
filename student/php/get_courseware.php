<?php
	include 'connect.php';


	$course_id=$_GET["courseID"];//获取教师账号
	//$courseID="ABCDE1";

	$result = $conn->query("select courseware_name,courseware_info,courseware_kind from courseware_table where lesson_id='".$course_id."';");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$arr[] = $row;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>
