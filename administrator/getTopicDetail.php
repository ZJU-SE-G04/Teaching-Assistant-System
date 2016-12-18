<?php
//stop
	include 'connect.php';
	$topic_id=$_GET["topicId"];
	//$topic_id=1;
    $a=$conn->query("select * from topic_table where topic_id = '".$topic_id."';");
	$row = mysqli_fetch_assoc($a);
    $x['title']=$row['title'];
	$b=$conn->query("select user_name from  user_table where id = '".$row['id']."';");
    $row2 = mysqli_fetch_assoc($b);
	$x['author']=$row2['user_name'];
	$x['content']=$row['content'];
	$x['lesson']=$row['topic_id'];
	$x['kind']="非答疑";
	if($row['topic_kind']==1)
		$x['kind']="答疑";
	$x['time']=$row['time'];
	echo json_encode($x, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>