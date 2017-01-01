<?php
	//尚未测试
	include 'myconnect.php';
	$article_id=(int)$_GET["article_id"];//获取教师账号
	$floor=(int)$_GET['floor'];
	//$article_id=2;
	//$floor=2;
	
	$su=1;
	$erm='null';

	//这里因为floor不是主键，无法将二级回复直接设置级联删除，所以只能手动删除相关的二级回复
	$result=$conn->query('delete from comment_table where article_id='.$article_id.' and floor='.$floor.';');
	if(!$result){ $su=0;$erm=mysql_error();}
	$result=$conn->query('delete from re_comment_table where article_id='.$article_id.' and floor='.$floor.';');
	if(!$result){ $su=0;$erm=mysql_error();}
	
	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>