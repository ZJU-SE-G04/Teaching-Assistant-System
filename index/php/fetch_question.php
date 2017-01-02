<?php

	include '../../connect.php';
	$uid=$_GET['id'];
	//$uid='3140102222';

	$state=0;
	$msg='';
	$result=$conn->query('select * from user_table where id="'.$uid.'"');
	$row=mysqli_fetch_assoc($result);
	if($row==null){
		$arr['if_success']=0;
		$arr['err_message']='不存在此用户,返回上一步重新输入';
	}else{
		if($row['question']==null){
			$arr['if_success']=0;
			$arr['err_message']='您未设置密码问题,请回忆您的初始密码或者联系网站管理员';
		}else{
			$arr['if_success']=1;
			$arr['question']=$row['question'];
		}
	}
	
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>