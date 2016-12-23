<?php
	include 'connect.php';
	session_start();
	$uid=$_SESSION['user'];
	$teamName=$_GET['teamName'];
	$pass=$_GET['pass'];
	//$uid='3140105555';
//	$teamName='T2226';
//	$pass='gogogo';
	
	$state=0;
	$msg='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from orgnize_table where id="'.$uid.'" and flag>=1;');
	$row=mysqli_fetch_assoc($result);
	if($row!=null){
		$state=1;
		$msg='你已经加入队伍了！';
	}else{//再判断队名是否存在
		$result=$conn->query('select * from team_table where team_name="'.$teamName.'";');
		$row=mysqli_fetch_assoc($result);
		if($row==null){
			$state=1;
			$msg='队名不存在！';
		}else{
			$realpass=$row['team_password'];
			$tid=$row['team_id'];
			if($realpass!=$pass){
				$state=1;
				$msg='密码错误！';//密码错误
			}else{
				//创队成功后，在组队表中添加相应记录
				$result=$conn->query('delete from orgnize_table where id="'.$uid.'";');//删除这人的其他组队申请
				$result=$conn->query('insert into orgnize_table values("'.$uid.'","'.$tid.'",1);');
				$state=0;
				$msg='加入成功！其他入队申请已自动撤销！';
			}
		}
	}

	$arr['state']=$state;
	$arr['msg']=$msg;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>