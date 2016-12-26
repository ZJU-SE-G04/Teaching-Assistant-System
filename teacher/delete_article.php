<?php
	//尚未测试
	include '../connect.php';
	$article_id=$_GET["article_id"];//获取教师账号
	//$article_id=4;
	$su=1;
	$erm='null';

	$result=$conn->query('delete from article_table where article_id='.$article_id.';');
	if(!$result){ $su=0;$erm=mysql_error();}
	
	
	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>