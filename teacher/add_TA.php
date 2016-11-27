<?php
	//尚未测试
	include 'connect.php';
	$class_id=$_GET["class_id"];//获取教师账号
	//$class_id=1;
	
	$result=$conn->query('select * from class_table where class_id='.$class_id);
	$row=mysqli_fetch_assoc($result);
	$lesson_id=$row['lesson_id'];

	$su=1;
	$erm='null';
	for ($i=0;$i<sizeof($_POST['TA_id']);$i++){
		$id=$_POST['TA_id'][$i];
		$name=$_POST['TA_name'][$i];
		$dep=$_POST['department'][$i];
		$maj=$_POST['major'][$i];
		$result=$conn->query('insert into assitant_table values("'.$id.'","'.$mame.'","'.$dep.'","'.$maj.'");');
		$result=$conn->query('insert into assit_talbe values("'.$id.'","'.$lesson_id.'",'.$class_id.');');
		if(!$result){
			$su=0;
			$erm=mysql_error();
		}
	}


	$arr['success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>