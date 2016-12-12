<?php
	//尚未测试
	include 'connect.php';
	$article_id=(int)$_GET["article_id"];//获取教师账号
	$floor=(int)$_GET['floor'];
	$re_floor=(int)$_GET['re_floor'];
	//$article_id=2;
	//$floor=2;
	//$re_floor=1;

	$su=1;
	$erm='null';

	$result=$conn->query('delete from re_comment_table where article_id='.$article_id.' and floor='.$floor.' and re_floor='.$re_floor.';');
	if(!$result){ $su=0;$erm=mysql_error();}
	
	
	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>