<?php
	include 'connect.php';
	//$article_id=$_GET["article_id"];
	$article_id=2;
    $result = $conn->query("select * from article_table where article_id = '".$article_id."';");
	while($row = mysqli_fetch_assoc($result)) {
		$x['article_id']=(int)$row['article_id'];
		$x['title']=$row['title'];		
		$a=$conn->query("SELECT user_name FROM user_table where id = '".$row['id']."';");
	    $row1 = mysqli_fetch_assoc($a);
		$x['author']=$row1['user_name'];
		$x['time']=$row['time'];
		$x['body']=$row['content'];	
	}
	
	echo json_encode($x, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>