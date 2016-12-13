<?php
	include 'connect.php';
	//session_start();
	//$uid=$_SESSION['user'];
	//$teamID=(int)$_GET['teamID'];
	$uid='3140106666';
	$teamID=5;
	
	$state=0;
	$msg='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from orgnize_table where id="'.$uid.'" and flag>=1;');
	$row=mysqli_fetch_assoc($result);
	if($row!=null){
		$state=1;
		$msg='你已经加入队伍了！';
	}else{//添加入队请求
		$result=$conn->query('insert into orgnize_table values("'.$uid.'",'.$teamID.',0);');
		$state=0;
		$msg='入队申请已发送！等待队伍成员同意...';
	}

	$arr['state']=$state;
	$arr['msg']=$msg;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>