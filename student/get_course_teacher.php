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
	$course_id=$_GET["course_ID"];//获取课程号
	$course_id="ABCDE1";

	$result = $conn->query("select * from teacher_table join teach_table on teacher_table.id=teach_table.id where lesson_id='".$course_id."';");

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		if ($outp != "") {$outp .= ",";}
		$outp .= '{"id":"'  . $rs["id"] . '",';
		$outp .= '"name":"'   . $rs["name"]        . '"}';
	}
	$outp ='['.$outp.']';
	$conn->close();

	echo($outp);
?>