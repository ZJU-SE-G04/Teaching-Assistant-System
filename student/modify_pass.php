<?php
	include '../connect.php';
	session_start();
	$uid=$_SESSION['user'];
	$oldpass=$_GET['oldpass'];
	$newpass=$_GET['newpass'];
	$oldpass=md5($oldpass);
	$newpass=md5($newpass);
	//$uid='3140101111';
//	$oldpass='1111';
//	$newpass='1234';

	$state=0;
	$msg='';



	$result = $conn->query('select * from user_table where id="'.$uid.'";');
	$row=mysqli_fetch_assoc($result);
	$realpass=$row['password'];

	if($oldpass==$realpass){
		if(preg_match("/^[A-Za-z0-9]+$/", $newpass)){
			$result=$conn->query('update user_table set password="'.$newpass.'" where id="'.$uid.'";');
			if($result){
				$state=0;
				$msg='修改成功';
			}else{
				$state=2;
				$msg='修改失败！请检查新密码是否格式正确！';
			}
		}else{
			$state=1;
			$msg='密码不能包括非法字符！请使用26位字母和数字组成密码！';
		}
	}else{
		$state=1;
		$msg='修改失败！请检查密码是否正确！';
	}
	
	$arr['state']=$state;
	$arr['msg']=$msg;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>