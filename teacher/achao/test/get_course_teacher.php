<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	$servername = "120.77.34.254";
	$username = "zjuseG04";
	$password = "exciting";
	$dbname='teaching_db';
		 
	// 创建连接
$con = mysqli_connect("120.77.34.254", "root", "016833", "teaching_db", "3306");
if (!$con)
{
	die('Could not connect: ' . mysqli_error());
}	

	//$course_id=$_GET["course_ID"];//获取教师账号
	

	$result = mysqli_query($con, "select * from lesson_table");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$arr[] = $row;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>


	