<?php
	include '../../connect.php';
	$uid=$_GET['id'];
	$new=$_GET['new_pwd'];
	//$uid='3140101111';
	//$new='666666';

	$state=0;
	$msg='';
	$result=$conn->query('update user_table set password="'.$new.'" where id="'.$uid.'"');
	if($result==null){
		$arr['if_success']=0;
		$arr['err_message']='修改错误';
	}else{
		$arr['if_success']=1;
	}
	
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>