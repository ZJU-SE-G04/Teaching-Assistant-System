<?php
	include 'connect.php';
	$article_id=(int)$_GET['article_id'];
	//$article_id=2;

	$result = $conn->query("select * from article_table where article_id=".$article_id.";");
	$row=mysqli_fetch_assoc($result);
	$arr = [];
	//获取文章内容
	$arr['article_content']=$row['content'];
	//获取评论数量
	$result=$conn->query("select count(*) from comment_table where article_id=".$article_id.";");
	$row=mysqli_fetch_assoc($result);
	$arr['comment_number']=$row['count(*)'];

	$ar=[];
	$result=$conn->query("select * from comment_table natural join user_table where article_id=".$article_id.";");
	while($row = mysqli_fetch_assoc($result)) {
		$x['id']=$row['id'];
		$x['floor']=$row['floor'];
		$x['user_name']=$row['user_name'];
		$x['time']=$row['time'];
		$x['content']=$row['content'];
		$ar[] = $x;
	}
	$arr['comment']=$ar;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>