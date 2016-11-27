<?php
	include 'connect.php';
	$teacher_id=$_GET["teacherID"];//获取教师账号
	//$teacher_id="111111";

	$result = $conn->query("select introduction from teacher_table where id='".$teacher_id."';");

	//$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$arr = $row;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>