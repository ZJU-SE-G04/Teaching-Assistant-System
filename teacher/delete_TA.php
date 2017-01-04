<?php
	//尚未测试
	include '../connect.php';
	$class_id=$_GET["class_id"];//获取教师账号
	$id=$_GET['id'];
	//$class_id=1;
	$su=1;
	$erm='null';

	$result=$conn->query('delete from user_table where id='.$id.';');//级联删除助教表

	if(!$result){ $su=0;$erm=mysql_error();}
	
	
	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>