<?php
	include 'connect.php';
	$lesson_id=$_GET["lesson_id"];//获取教师账号
	//$lesson_id='ABCDE1';

	$result = $conn->query("select * from article_table where lesson_id='".$lesson_id."';");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['article_id']=(int)$row['article_id'];
		$x['title']=$row['title'];
		$x['id']=$row['id'];
		$x['short_content']=substr($row['content'],0,140);
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>