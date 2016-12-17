<?php
	$action=$_GET["action"];//获取行为
	//$action="submitPost";
	if($action=='fetchAll'){
		fetchAll();
	}else if($action=='fetchDetail'){
		fetchDetail();
	}else if($action=='fetchRe'){
		fetchRe();
	}else if($action=='fetchReRe'){
		fetchReRe();
	}else if($action=='submitRe'){
		submitRe();
	}else if($action=='submitReRe'){
		submitReRe();
	}else if($action=='fetchNum'){
		fetchNum();
	}else if($action=='submitPost'){
		submitPost();
	}

//发布帖子
	function submitPost(){
		include 'connect.php';
		error_reporting(E_ERROR|E_WARNING);
		$border_type=(int)$_POST['border_type'];
		$title=$_POST['title'];
		$content=htmlspecialchars(stripcslashes($_POST['content']));
		//$uid=$_SESSION['user'];
		//$lesson_id=$_SESSION['lesson_id'];
		$lesson_id='ABCDE1';
		$uid='3140102222';
		//$border_type=1;
		//$title='发表测试';
		//$content='万一能行呢';

		$datetime=date('Y-m-d H:i:s');
		$state=0;
		$msg='发表成功！';

		//echo 'insert into topic_table values(null,"'.$lesson_id.'",'.$border_type.',"'.$uid.'","'.$datetime.'","'.$title.'","'.$content.'");';

		$result=$conn->query('insert into topic_table values(null,"'.$lesson_id.'",'.$border_type.',"'.$uid.'","'.$datetime.'","'.$title.'","'.$content.'");');
		if($result==null){
			$state=1;
			$msg='发表失败！';
		}
		$arr['state']=$state;
		$arr['msg']=$msg;
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	}

//获取帖子总数
	function fetchNum(){
		include 'connect.php';
		$lesson_id=$_GET["courseID"];//获取教师账号
		$post_kind=(int)$_GET['post_kind'];
		//$lesson_id='ABCDE1';
		//$post_kind=1;

		$result = $conn->query("select count(*) from topic_table where lesson_id='".$lesson_id."' and topic_kind=".$post_kind.";");
		$row=mysqli_fetch_assoc($result);
		$arr['num']=$row['count(*)'];
		
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}


//提交二级回复
	function submitReRe(){
		include 'connect.php';
		$topic_id=(int)$_POST['topic_id'];
		$content=$_POST['content'];
		$ofloor=(int)$_POST['floor'];
		$reid=$_POST['id_be_re'];
		//$uid=$_SESSION['user'];
		$uid='3140103333';
		//$topic_id=1;
		//$content='层主说得对';
		//$reid='3140102222';
		//$ofloor=4;

		$datetime=date('Y-m-d H:i:s');
		$state=0;
		$msg='发表成功！';
		$result=$conn->query('select * from re_response_table where topic_id='.$topic_id.' and floor='.$ofloor.' order by floor DESC;');
		$row=mysqli_fetch_assoc($result);
		$floor=(int)$row['re_floor'];
		$floor++;
		$result=$conn->query('insert into re_response_table values('.$topic_id.',"'.$uid.'","'.$datetime.'","'.$content.'",'.$ofloor.','.$floor.',"'.$reid.'");');
		$row=mysqli_fetch_assoc($result);
		if($result==null){
			$state=1;
			$msg='发表失败！';
		}
		$arr['state']=$state;
		$arr['msg']=$msg;
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	}

//提交一级回复
	function submitRe(){
		include 'connect.php';
		error_reporting(E_ERROR|E_WARNING);
		$topic_id=(int)$_POST['topic_id'];
		$content=htmlspecialchars(stripcslashes($_POST['content']));
		//$uid=$_SESSION['user'];
		$uid='3140102222';
		//$topic_id=1;
		//$content='顶楼主';
		$datetime=date('Y-m-d H:i:s');
		$state=0;
		$msg='发表成功！';
		$floor=1;
		$result=$conn->query('select * from response_table where topic_id='.$topic_id.' order by floor DESC;');
		$row=mysqli_fetch_assoc($result);
		if($row!=null)
			$floor=(int)$row['floor'];
		$floor++;
		$result=$conn->query('insert into response_table values('.$topic_id.',"'.$uid.'","'.$datetime.'","'.$content.'",'.$floor.');');
		$row=mysqli_fetch_assoc($result);
		if($result==null){
			$state=1;
			$msg='发表失败！';
		}
		$arr['state']=$state;
		$arr['msg']=$msg;
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	}

//显示帖子列表
	function fetchAll(){
		include 'connect.php';
		$lesson_id=$_GET["courseID"];//获取教师账号
		$post_kind=(int)$_GET['post_kind'];
		$offset=(int)$_GET['offset'];
		$count=(int)$_GET['count'];
		$search=$_GET['search'];
		//$lesson_id='ABCDE1';
		//$post_kind=1;
		//$offset=0;
		//$count=10;
		//$search='';

		$result = $conn->query("select * from topic_table natural join user_table where lesson_id='".$lesson_id."' and topic_kind=".$post_kind." and title like '%".$search."%' order by topic_id DESC;");

		$arr = [];
		$i=0;
		$j=0;
		while($row = mysqli_fetch_assoc($result)) {
			if($i>=$offset){
				$x['topic_id']=(int)$row['topic_id'];
				$x['title']=$row['title'];
				$x['datetime']=$row['time'];
				$x['publisher']=$row['user_name'];
				$arr[] = $x;
				$j++;
			}
			$i++;
			if($j>=$count)
				break;
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}
	

//显示一个帖子的内容
	function fetchDetail(){
		include 'connect.php';
		error_reporting(E_ERROR|E_WARNING);
		$topic_id=(int)$_GET['topic_id'];
		//$topic_id=1;


		$result = $conn->query("select * from topic_table natural join user_table where topic_id=".$topic_id.";");

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$arr['title']=$row['title'];
			$arr['content']=htmlspecialchars_decode($row['content']);
			$arr['datetime']=$row['time'];
			$arr['publisher']=$row['user_name'];
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}


//一级回复
	function fetchRe(){
		include 'connect.php';
		error_reporting(E_ERROR|E_WARNING);
		$topic_id=(int)$_GET['topic_id'];
		$offset=(int)$_GET['offset'];
		$count=(int)$_GET['count'];
		//$topic_id=1;
		//$offset=1;
		//$count=1;

		$result = $conn->query("select * from response_table natural join user_table where topic_id=".$topic_id.";");

		$arr = [];
		$i=0;$j=0;
		while($row = mysqli_fetch_assoc($result)) {
			if($i>=$offset){
				$x['username']=$row['user_name'];
				$x['userid']=$row['id'];
				$x['content']=htmlspecialchars_decode($row['content']);
				$x['time']=$row['time'];
				$x['floor']=(int)$row['floor'];
				$arr[] = $x;
				$j++;
			}
			$i++;
			if($j>=$count)
				break;
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}


//二级回复
	function fetchReRe(){
		include 'connect.php';
		$topic_id=(int)$_GET['topic_id'];
		$floor=(int)$_GET['floor'];
		//$topic_id=1;
		//$floor=2;

		$result = $conn->query("select * from re_response_table natural join user_table where topic_id=".$topic_id." and floor=".$floor.";");

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$x['userid']=$row['id'];
			$x['username']=$row['user_name'];
			if($row['re_id']!='0'){
				$resu=$conn->query("select user_name from user_table where id='".$row['re_id']."';");
				$ro=mysqli_fetch_assoc($resu);
				$x['username_of_be_re']=$ro['user_name'];
				$x['id_of_be_re']=$row['re_id'];
			}else{
				$x['username_of_be_re']='0';
				$x['id_of_be_re']='0';
			}
			$x['re_content']=$row['content'];
			$x['re_time']=$row['time'];
			$x['re_floor']=(int)$row['re_floor'];
			$arr[] = $x;
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}

?>