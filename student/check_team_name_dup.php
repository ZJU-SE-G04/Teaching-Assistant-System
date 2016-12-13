<?php
	include 'connect.php';
	$teamName=$_GET['teamName'];
	//$teamName='T1226';
	
	$state='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from team_table where team_name="'.$teamName.'";');
	$row=mysqli_fetch_assoc($result);
	if($row!=null){
		$state='false';
	}else{
		$state='true';
	}
	echo $state;
	$conn->close();

?>