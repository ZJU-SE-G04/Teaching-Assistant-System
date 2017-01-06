<?php
	include '../connect.php';
	$course_id=$_GET['courseID'];//获取教师账号
	//$courseID="ABCDE1";


	//这里注意，需要提醒管理员处将课程介绍处理成对应格式
	$result = $conn->query("select lesson_info from lesson_table where lesson_id='".$course_id."';");

	//$arr = [];
	
	while($row = mysqli_fetch_assoc($result)) {
		$arr = $row["lesson_info"];
	}
	echo $arr;
	$conn->close();

?>