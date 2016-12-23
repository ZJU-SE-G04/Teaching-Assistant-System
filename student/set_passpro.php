<?php
	include 'connect.php';
	session_start();
	$uid=$_SESSION['user'];
	$question=$_POST['question'];
	$answer=$_POST['answer'];
	//$uid='3140101111';
	//$question='鹅鹅鹅';
	//$answer='曲项向天歌';

	$state=0;
	$msg='';

	$result = $conn->query('select * from user_table where id="'.$uid.'";');
	$row=mysqli_fetch_assoc($result);
	$flag=$row['question'];
	if($flag==null){
		$result=$conn->query('update user_table set question="'.$question.'",answer="'.$answer.'" where id="'.$uid.'"');
		$state=0;
		$msg='设置成功';
	}
	else{
		$state=1;
		$msg='设置失败，已存在密保问题！';
	}
	
	$arr['state']=$state;
	$arr['msg']=$msg;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>