<?php
	include 'myconnect.php';
	error_reporting(E_ERROR|E_WARNING);
	$lesson_id=$_POST["lesson_id"];//获取班级号
	//$lesson_id='ABCDE1';

	$su=1;
	$erm='null';

	for($i=0;$i<1;$i++){
		$id=$_POST['id'];
		//$id='111111';
		if($id==null){
			$su=0;
			$erm='发帖人ID不能为空';
			break;
		}
		$title=$_POST['title'];
		//$title='test';
		if($title==null){
			$su=0;
			$erm='请输入文章标题';
			break;
		}
		$content=$_POST['content'];
		$content=htmlspecialchars(stripcslashes($content));

		if($content==null){
			$su=0;
			$erm='文章内容不能为空';
			break;
		}
		$datetime=date('Y-m-d H:i:s');

		$result=$conn->query('insert into article_table values(null,"'.$lesson_id.'","'.$id.'","'.$title.'","'.$content.'","'.$datetime.'");');
		$result=$conn->query('select article_id from article_table where time ="'.$datetime.'";');

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$erm=(int)$row['article_id'];
		}


		if($result==null){
			$su=0;
			$erm='发布失败,或许是网络连接问题';
		}
	}

	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>