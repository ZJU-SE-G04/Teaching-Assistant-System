<?php
	$action=$_POST['action'];
	//$action='edit';
	if($action=='add'){
		add();
	}else if($action=='request'){
		request();
	}else if($action=='delete'){
		deleteOne();
	}else if($action=='edit'){
		edit();
	}



	function edit(){
		include '../connect.php';
		//$lesson_id=$_POST['lesson_id'];
		$notice_id=$_POST['notice_id'];
		//$class_id=$_POST['class_id'];
		$title=$_POST['title'];
		$content=$_POST['content'];

		/*
		$lesson_id='ABCDE1';
		$title='通知1';
		$content='好好学习天天向上';
		$notice_id=1;
		*/

		$result=$conn->query('update notice_table set title="'.$title.'",content="'.$content.'" where notice_id='.$notice_id.';');

		if($result==null){
			echo false;
		}else{
			echo true;
		}

	}

	function deleteOne(){
		include '../connect.php';
		$notice_id=$_POST['notice_id'];
		//$notice_id=4;
		$result = $conn->query("delete from notice_table where notice_id='".$notice_id."';");
		if($result==null){
			echo false;
		}else{
			echo true;
		}
	}

	function request(){
		include '../connect.php';
		$lesson_id=$_POST['lesson_id'];
		//$lesson_id='ABCDE1';
		$result = $conn->query("select * from notice_table where lesson_id='".$lesson_id."';");

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$x['notice_id']=$row['notice_id'];
			$x['title']=$row['title'];
			$x['content']=$row['content'];
			$arr[]=$x;
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	}

	function add(){
		include '../connect.php';
		$lesson_id=$_POST['lesson_id'];
		//$class_id=$_POST['class_id'];
		$title=$_POST['title'];
		$content=$_POST['content'];
		session_start();
		$uid=$_SESSION['user'];
		$datetime=date('Y-m-d H:i:s');

		//$lesson_id='ABCDE1';
		//$title='发布的通知';
		//$content='啦啦啦啦啦啦啦啦啦啦噜噜噜噜啦啦啦啦啦啦啦啦啦啦噜噜噜噜';
		//$uid='111111';

		$result=$conn->query('insert into notice_table values(null,"'.$lesson_id.'","'.$uid.'","'.$title.'","'.$content.'","'.$datetime.'");');

		if($result==null){
			echo false;
		}else{
			echo true;
		}
	}

?>