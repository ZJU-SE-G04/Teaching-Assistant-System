<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname='teaching_db';
		 
	// 创建连接
	$conn = new mysqli($servername, $username, $password,$dbname);
	$conn->query("set names utf8;");
	//$course_id=$_GET["course_ID"];//获取教师账号
	$course_id="ABCDE1";

	$result = $conn->query("select teach_table.id,name from teacher_table join teach_table on teacher_table.id=teach_table.id where lesson_id='".$course_id."';");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$arr[] = $row;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>


	