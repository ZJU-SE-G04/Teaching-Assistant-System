<?php
	include '../connect.php';
	$class_id=$_GET["class_id"];//获取教师账号
	//$class_id=1;

	$result = $conn->query(" select assit_table.id,name,department,major from assitant_table join assit_table on assitant_table.id=assit_table.id where class_id=".$class_id.";");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$arr[] = $row;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>