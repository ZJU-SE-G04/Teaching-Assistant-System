<?php
	include 'connect.php';
	session_start();
	$uid=$_SESSION['user'];
	$teamID=(int)$_GET['teamID'];
	//$uid='3140101111';
	$tid=-1;

	$state=0;
	$msg='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from orgnize_table where id="'.$uid.'" and flag=2;');
	$row=mysqli_fetch_assoc($result);
	if($row==null){
		$state=1;
		$msg='你不是队长！';
		$res=null;
	}else{//添加入队请求
		$tid=(int)$row['team_id'];
		$result=$conn->query('select * from orgnize_table natural join user_table where team_id='.$tid.' and flag=0;');
		
		while($row = mysqli_fetch_assoc($result)) {
			$x['uid'] = $row['id'];
			$x['username']=$row['user_name'];
			$res[]=$x;
		}
		
		$state=0;
		$msg='队长你好。申请入队列表如下：';
	}

	$arr['state']=$state;
	$arr['msg']=$msg;
	$arr['result']=$res;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>