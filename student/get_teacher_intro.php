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
	//$teacher_id=$_GET["teacher_ID"];//获取教师账号
	$teacher_id="111111";

	$result = $conn->query("select introduction from teacher_table where id='".$teacher_id."';");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$arr[] = $row;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>