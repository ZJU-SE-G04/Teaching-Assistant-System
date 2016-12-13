<?php
	$action=$_GET["action"];//获取行为
	//$action="fetchReRe";
	if($action=='fetchAll'){
		fetchAll();
	}else if($action=='fetchDetail'){
		fetchDetail();
	}else if($action=='fetchRe'){
		fetchRe();
	}else if($action=='fetchReRe'){
		fetchReRe();
	}
//显示帖子列表
	function fetchAll(){
		include 'connect.php';
		$lesson_id=$_GET["courseID"];//获取教师账号
		$post_kind=(int)$_GET['post_kind'];
		//$lesson_id='ABCDE1';
		//$post_kind=1;


		$result = $conn->query("select * from topic_table natural join user_table where lesson_id='".$lesson_id."' and topic_kind=".$post_kind." order by topic_id DESC;");

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$x['topic_id']=(int)$row['topic_id'];
			$x['title']=$row['title'];
			$x['datetime']=$row['time'];
			$x['publisher']=$row['user_name'];
			$arr[] = $x;
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}
	

//显示一个帖子的内容
	function fetchDetail(){
		include 'connect.php';
		//$topic_id=(int)$_GET['topic_id'];
		$topic_id=1;


		$result = $conn->query("select * from topic_table natural join user_table where topic_id=".$topic_id.";");

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$arr['title']=$row['title'];
			$arr['content']=$row['content'];
			$arr['datetime']=$row['time'];
			$arr['publisher']=$row['user_name'];
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}


//一级回复
	function fetchRe(){
		include 'connect.php';
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
				$x['content']=$row['content'];
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