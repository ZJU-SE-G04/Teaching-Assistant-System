<?php
	session_start();
	$action=$_POST['action'];
	//$action='jump_to_lesson';
	if($action=='isLogin'){
		isLogin();
	}else if($action=='login'){
		login();
	}else if($action=='logout'){
		logout();
	}else if($action=='jump_to_lesson'){
		jumpto();
	}

	function jumpto(){
		include 'connect.php';
		$uid=$_SESSION['user'];
		$lesson_id=$_POST['lesson_id'];
		if($uid=='null'){
			header('Location:/student/student_learn.html?lesson_id='.$lesson_id);
			return;
		}
		//$uid='111111';
		//$lesson_id='ABCDE1';
		$result=$conn->query('select * from user_table where id="'.$uid.'"');
		$row=mysqli_fetch_assoc($result);
		if($row!=null){
			$uname=$row['user_name'];
			switch($row['level']){
				case 1:{
				//echo 'Location:/student/student_learn.html?lesson_id='.$lesson_id;
				header('Location:/student/student_learn.html?lesson_id='.$lesson_id);
				break;
			}
				case 3:{
					$result=$conn->query('select * from lesson_table where lesson_id="'.$lesson_id.'"');
					$row=mysqli_fetch_assoc($result);
					//echo 'Location:teacher/show_article.html?lesson_id='.$lesson_id.'&course_name='.$row['lesson_name'].'&user_name='.$uname.'&user_id='.$uid;
					header('Location:teacher/show_article.html?lesson_id='.$lesson_id.'&course_name='.$row['lesson_name'].'&user_name='.$uname.'&user_id='.$uid);
					break;
				}
			}
		}
	}

	function isLogin(){
		if(isset($_SESSION['user']))
			if($_SESSION['user']==null)
				echo false;
			else
				echo true;
		else
			echo false;
	}
	function login(){
		$uid=$_POST['user_id'];
		$pwd=$_POST['password'];
		//$uid='111111';
		//$pwd='1111';
		//echo 'select * from user_table where id="'.$uid.'" and pasword="'.$pwd.'";';
		include 'connect.php';
		$result=$conn->query('select * from user_table where id="'.$uid.'" and password="'.$pwd.'";');
		$row=mysqli_fetch_assoc($result);
		if($row==null){
			echo false;
		}
		else{
			$_SESSION['user']=$uid;
			echo $row['user_name'];
		}
	}
	function logout(){
		$_SESSION['user']=null;
		echo true;
	}
?>