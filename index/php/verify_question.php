<?php

	include '../../connect.php';
	$uid=$_GET['id'];
	$answer=$_GET['answer'];
	//$uid='3140101111';
	//$answer='home';

	$state=0;
	$msg='';
	$result=$conn->query('select * from user_table where id="'.$uid.'"');
	$row=mysqli_fetch_assoc($result);
	if($row['answer']!=$answer){
		$arr['if_success']=0;
		$arr['err_message']='回答错误,请返回上一步重新输入答案或联系网站管理员';
	}else{
		$arr['if_success']=1;
	}
	
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>