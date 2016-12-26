<?php
	include '../connect.php';
	session_start();
	$uid=$_SESSION['user'];
	$did=$_GET['uid'];
	$agree=(int)$_GET['agree'];
	//$uid='3140102222';
	//$did='3140108888';
	//$agree=1;
	
	$state=0;
	$msg='';
	
	//先判断这人是不是已经有队伍了
	$result=$conn->query('select * from orgnize_table where id="'.$uid.'" and flag>1;');
	$row=mysqli_fetch_assoc($result);
	if($row==null){
		$state=1;
		$msg='你不是队长！';
	}else{//处理
		if($agree==0){
			$tid=$row['team_id'];
			$result=$conn->query('update orgnize_table set flag=-1 where team_id='.$tid.' and id="'.$did.'";');
			$state=0;
			$msg='成功拒绝！';
			include 'submit_msg.php';
			send($did,'队伍'.$tid.'拒绝了你的申请！');
		}else{
			$tid=$row['team_id'];
			//允许入队
			$result=$conn->query('update orgnize_table set flag=1 where team_id='.$tid.' and id="'.$did.'";');
			//删除其他申请记录
			$result=$conn->query('delete from orgnize_table where id="'.$did.'" and flag!=1;');
			$state=0;
			$msg='成功允许！';
			include 'submit_msg.php';
			send($did,'成功加入队伍'.$tid);
		}
	}

	$arr['state']=$state;
	$arr['msg']=$msg;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>