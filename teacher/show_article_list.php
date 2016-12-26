<?php
	include '../connect.php';
	error_reporting(E_ERROR|E_WARNING);
	$lesson_id=$_GET["lesson_id"];//获取教师账号
	$search=$_GET['needed_title'];
	//$lesson_id='ABCDE1';
	//$search='';

	$result = $conn->query("select * from article_table natural join teacher_table where lesson_id='".$lesson_id."' and title like '%".$search."%' order by article_id DESC;");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['article_id']=(int)$row['article_id'];
		$x['title']=$row['title'];
		$x['id']=$row['id'];
		$x['user_name']=$row['name'];
		$x['short_content']=mb_substr(htmlspecialchars_decode($row['content']),0,60,'utf-8')."...";
		$x['time']=$row['time'];
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>