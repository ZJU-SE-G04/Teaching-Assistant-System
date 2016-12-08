<?php
	include 'connect.php';
	$lesson_id=$_GET["lesson_id"];//获取教师账号
//	$lesson_id='ABCDE1';

	$result = $conn->query("select * from article_table natural join teacher_table where lesson_id='".$lesson_id."' order by article_id DESC;");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['article_id']=(int)$row['article_id'];
		$x['title']=$row['title'];
		$x['id']=$row['id'];
		$x['user_name']=$row['name'];
		$x['short_content']=substr($row['content'],0,400)."...";
		$x['time']=$row['time'];
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>