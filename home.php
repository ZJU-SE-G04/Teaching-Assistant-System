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
		include 'connect1.php';
		$uid=$_POST['user_id'];
		$lesson_id=$_POST['lesson_id'];
		
		//$uid='3140102222';
		//$lesson_id='ABCDE1';
		if($uid=='null'){
			$result=$conn->query('select * from lesson_table where lesson_id="'.$lesson_id.'"');
			$row=mysqli_fetch_assoc($result);
			echo 'student/student_learn.html?lesson_id='.$lesson_id.'&lesson_name='.$row['lesson_name'];
			return;
		}
		$result=$conn->query('select * from user_table where id="'.$uid.'"');
		$row=mysqli_fetch_assoc($result);
		if($row!=null){
			$uname=$row['user_name'];
			switch($row['level']){
				case 1:{
				//echo 'Location:/student/student_learn.html?lesson_id='.$lesson_id;
					$result=$conn->query('select * from lesson_table where lesson_id="'.$lesson_id.'"');
					$row=mysqli_fetch_assoc($result);
					echo 'student/student_learn.html?lesson_id='.$lesson_id.'&lesson_name='.$row['lesson_name'];
					break;
				}
				case 2:{
					$result=$conn->query('select * from lesson_table where lesson_id="'.$lesson_id.'"');
					$row=mysqli_fetch_assoc($result);
					//echo 'Location:teacher/show_article.html?lesson_id='.$lesson_id.'&course_name='.$row['lesson_name'].'&user_name='.$uname.'&user_id='.$uid;
					echo 'teacher/show_article.html?lesson_id='.$lesson_id.'&course_name='.$row['lesson_name'].'&user_name='.$uname.'&user_id='.$uid.'&level=2';
					break;
				}
				case 3:{
					$result=$conn->query('select * from lesson_table where lesson_id="'.$lesson_id.'"');
					$row=mysqli_fetch_assoc($result);
					//echo 'Location:teacher/show_article.html?lesson_id='.$lesson_id.'&course_name='.$row['lesson_name'].'&user_name='.$uname.'&user_id='.$uid;
					echo 'teacher/show_article.html?lesson_id='.$lesson_id.'&course_name='.$row['lesson_name'].'&user_name='.$uname.'&user_id='.$uid.'&level=3';
					break;
				}
				case 4:{
					echo 'administrator/administrator.php';
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
		$pwd = md5($pwd);//md5加密
//		echo $pwd;

		//$uid='111111';
		//$pwd='1111';
		//echo 'select * from user_table where id="'.$uid.'" and pasword="'.$pwd.'";';
		include 'connect1.php';
		$result=$conn->query('select * from user_table where id="'.$uid.'" and password="'.$pwd.'";');
		$row=mysqli_fetch_assoc($result);
		if($row==null){
			echo false;
		}
		else{
			$_SESSION['user']=$uid;
            $_SESSION['level'] = $row['level'];
			echo $row['user_name'];
		}
	}
	function logout(){
		$_SESSION['user']=null;
		echo true;
	}
?>