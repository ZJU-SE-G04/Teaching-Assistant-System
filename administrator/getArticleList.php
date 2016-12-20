<?php
	include 'connect.php';
    $result = $conn->query("select * from article_table;");
	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['article_id']=(int)$row['article_id'];
		$x['title']=$row['title'];
		$content=$row['content'];
		$x['articleDigest']=substr($content,0, 20);
		$x['time']=$row['time'];
		$a=$conn->query("SELECT COUNT(*) FROM comment_table where article_id = '".$x['article_id']."';");
	    $row2 = mysqli_fetch_assoc($a);
		$x['commentNum']=$row2['COUNT(*)'];	
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>