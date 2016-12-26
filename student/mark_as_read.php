<?php
	include '../connect.php';
	$mid=$_GET['msg_id'];
	//$mid=1;
	$result = $conn->query("update private_msg_table set state=1 where msg_id=".$mid.";");

	$arr['state']=0;
	$arr['msg']='已读！';
	
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>