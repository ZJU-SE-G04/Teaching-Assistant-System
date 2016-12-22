<?php
	include 'connect.php';
	//session_start();
	//$uid=$_SESSION['user'];
	$uid='3140104444';
	
	$state=0;
	$tname='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from orgnize_table natural join team_table where id="'.$uid.'" and flag>=1;');
	$row=mysqli_fetch_assoc($result);
	if($row!=null){
		$state=0;
		$tname=$row['team_name'];
	}else{//再判断队名是否重复
		$state=1;
	}

	$arr['state']=$state;
	$arr['teamName']=$tname;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>