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
	for ($i=0;$i<sizeof($_GET['id']);$i++){
		$id=$_GET['id'][$i];
		$name=$_GET['name'][$i];
		$dep=$_GET['department'][$i];
		$maj=$_GET['major'][$i];
		//如果没有这个账号就先在USER表中增加该账号
		$result=$conn->query('insert into user_table values("'.$id.'","'.$id.'","'.$mame.'",1,null,null,null);');
		$result=$conn->query('insert into student_table values("'.$id.'","'.$mame.'","'.$dep.'","'.$maj.'");');
		$result=$conn->query('insert into study_talbe values("'.$id.'","'.$lesson_id.'",'.$class_id.');');
		if(!$result){
			$su=0;
			$erm=mysql_error();
		}
	}


	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>