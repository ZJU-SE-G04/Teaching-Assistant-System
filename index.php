<?php
	session_start();
	$action=$_POST['action'];
	//$action='login';
	if($action=='isLogin'){
		isLogin();
	}else if($action=='login'){
		login();
	}else if($action=='logout'){
		logout();
	}

	function isLogin(){
		$uid=$_SESSION['user'];
		if($uid==null)
			echo false;
		else
			echo true;
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
			echo true;
		}
	}
	function logout(){
		$_SESSION['user']=null;
		echo true;
	}
?>