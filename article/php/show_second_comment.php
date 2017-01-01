<?php
	include 'myconnect.php';
	$article_id=(int)$_GET['article_id'];
	$floor=(int)$_GET['floor'];
//	$article_id=2;
//	$floor=2;

	$arr = [];
	//获取二级评论数量
	$result=$conn->query("select count(*) from re_comment_table where article_id=".$article_id." and floor=".$floor.";");
	$row=mysqli_fetch_assoc($result);
	$arr['second_comment_number']=$row['count(*)'];

	$ar=[];
	$result=$conn->query("select * from re_comment_table natural join user_table where article_id=".$article_id." and floor=".$floor." order by re_floor;");
	while($row = mysqli_fetch_assoc($result)) {
		$x['time']=$row['time'];
		$x['id']=$row['id'];
		$x['user_name']=$row['user_name'];
		$x['re_floor']=$row['re_floor'];
		$x['re_id']=$row['re_id'];
		$resu=$conn->query("select user_name from user_table where id='".$x['re_id']."';");
		$ro=mysqli_fetch_assoc($resu);
		$x['re_user_name']=$ro['user_name'];
		$x['content']=$row['content'];
		$ar[] = $x;
	}
	$arr['second_comment']=$ar;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>