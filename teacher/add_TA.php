<?php
	//尚未测试
	include '../connect.php';
	$class_id=$_GET["class_id"];//获取班级号
	//$class_id=1;
	if($class_id==null) echo 'SHIT';
	$result=$conn->query('select * from class_table where class_id='.$class_id);
	$row=mysqli_fetch_assoc($result);
	$lesson_id=$row['lesson_id'];

	$su=1;
	$erm='null';
	for ($i=0;$i<sizeof($_GET['id']);$i++){
		$id=$_GET['id'][$i];
		if($id==null){
			$su=0;
			$erm='ID不能为空!';
			break;
		}
		$name=$_GET['name'][$i];
		if($name==null){
			$su=0;
			$erm='姓名不能为空!';
			break;
		}
		$dep=$_GET['department'][$i];
		$maj=$_GET['major'][$i];
		//echo 'insert into assit_talbe values("'.$id.'","'.$lesson_id.'",'.$class_id.');';
		//如果没有这个账号就先在USER表中增加该账号
		$pwd=md5($id);
		$result=$conn->query('insert into user_table values("'.$id.'","'.$pwd.'","'.$name.'",2,null,null,null);');
		$result=$conn->query('insert into assitant_table values("'.$id.'","'.$name.'","'.$dep.'","'.$maj.'");');
		$result=$conn->query('insert into assit_table values("'.$id.'","'.$lesson_id.'",'.$class_id.');');
		if($result==null){
			$su=0;
			$erm='插入错误，请检查是否已经存在该学号！';
		}
	}


	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>