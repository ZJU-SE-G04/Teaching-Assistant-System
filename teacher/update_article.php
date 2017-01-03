<?php
	include '../connect.php';
	error_reporting(E_ERROR|E_WARNING);

	$su=1;
	$erm='null';

	for($i=0;$i<1;$i++){
		$old_id=(int)$_GET['article_id'];

		$title=$_GET['title'];
		//$title='测试时间';
		if($title==null){
			$su=0;
			$erm='请输入文章标题';
			break;
		}
		$content=$_GET['content'];
		$content=htmlspecialchars(stripcslashes($content));
		
		//$content='时间应该是对的';
		if($content==null){
			$su=0;
			$erm='文章内容不能为空';
			break;
		}

		$result=$conn->query('update article_table set title="'.$title.'",content="'.$content.'"where article_id='.$old_id.';');
		
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