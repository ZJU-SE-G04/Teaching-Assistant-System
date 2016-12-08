<?php
	include 'connect.php';
	$lesson_id=$_GET["lesson_id"];//获取班级号

	$su=1;
	$erm='null';

	for($i=0;$i<1;$i++){
		$id=$_GET['id'];
		if($id==null){
			$su=0;
			$erm='发帖人ID不能为空';
			break;
		}
		$title=$_GET['title'];
		if($title==null){
			$su=0;
			$erm='请输入文章标题';
			break;
		}
		$content=$_GET['content'];
		if($content==null){
			$su=0;
			$erm='文章内容不能为空';
			break;
		}
		$datetime=date('Y-m-d H:i:s');

		$result=$conn->query('insert into article_table values(null,"'.$lesson_id.'","'.$id.'","'.$title.'","'.$content.'","'.$datetime.'");');
		
		if($result==null){
			$su=0;
			$erm='发布失败，请检查网络连接后重试';
		}
	}

	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>