<?php
	include 'connect.php';
	$teamName=$_GET['teamName'];
	//$teamName='T226';
	
	$state=0;
	$msg='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from team_table where team_name="'.$teamName.'";');
	$row=mysqli_fetch_assoc($result);
	if($row!=null){
		$state=1;
		$msg='队名重复！';
	}else{
		$state=0;
		$msg='队名可用！';
	}

	$arr['state']=$state;
	$arr['msg']=$msg;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>