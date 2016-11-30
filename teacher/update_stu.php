<?php
	//尚未测试
	include 'connect.php';
	$class_id=$_GET["class_id"];//获取教师账号
	$old_id=$_GET['old_id'];
	//$old_id='3140107777';

	$su=1;
	$erm='null';
	$i=0;
	for(;$i<1;$i++){
		$id=$_GET['id'];
		if($id==null){
			$su=0;
			$erm='ID不能为空!';
			break;
		}
		$name=$_GET['name'];
		if($name==null){
			$su=0;
			$erm='姓名不能为空!';
			break;
		}
		$dep=$_GET['department'];
		$maj=$_GET['major'];

		//echo 'insert into assit_talbe values("'.$id.'","'.$lesson_id.'",'.$class_id.');';
		//先更新账号信息，助教表的ID会级联更新
		//echo 'update user_table set id="'.$id.'",password="'.$id.'" where id="'.$old_id.'";';
		$result=$conn->query('update user_table set id="'.$id.'",password="'.$id.'" where id="'.$old_id.'";');
		//再更新助教表信息，助课信息会级联更新
		$result=$conn->query('update student_table set name="'.$name.'",department="'.$dep.'",major="'.$maj.'" where id="'.$id.'";');
		//echo 'update assitant_table set name="'.$name.'",department="'.$dep.'",major="'.$maj.'" where id="'.$id.'";';
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