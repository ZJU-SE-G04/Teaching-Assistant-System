<?php
	include 'connect.php';
	session_start();
	$uid=$_SESSION['user'];
	$teamName=$_GET['teamName'];
	$pass=$_GET['pass'];
	$capa=$_POST['capacity'];
	//$uid='3140102222';
	//$teamName='T2226';
	//$pass='gogogo';
	//$capa=5;
	
	$state=0;
	$msg='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from orgnize_table where id="'.$uid.'" and flag>=1;');
	$row=mysqli_fetch_assoc($result);
	if($row!=null){
		$state=1;
		$msg='你已经加入队伍了！';
	}else{//再判断队名是否重复
		$result=$conn->query('insert into team_table values(null,"'.$teamName.'","'.$pass.'",'.$capa.',1);');
		//$row=mysqli_fetch_assoc($result);
		if($result==null){
			$state=1;
			$msg='队名重复！';
		}else{
			//创队成功后，在组队表中添加相应记录
			$result=$conn->query('delete from orgnize_table where id="'.$uid.'";');
			$result=$conn->query('select * from team_table where team_name="'.$teamName.'";');
			$row=mysqli_fetch_assoc($result);
			$tid=(int)$row['team_id'];
			//2表示队长吧
			$result=$conn->query('insert into orgnize_table values("'.$uid.'","'.$tid.'",2);');
			$state=0;
			$msg='创建成功！他人直接使用密码即可直接加入本团队！';
		}
	}

	$arr['state']=$state;
	$arr['msg']=$msg;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>