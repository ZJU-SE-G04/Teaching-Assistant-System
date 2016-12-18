<?php
//stop
	include 'connect.php';
    $result = $conn->query("select * from topic_table;");
	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['topicId']=$row['topic_id'];
		$a=$conn->query("select lesson_name from lesson_table where lesson_id = '".$row['lesson_id']."';");
	    $row2 = mysqli_fetch_assoc($a);
		$x['lesson']=$row2['lesson_name'];
		$x['kind']="非答疑";
		if($row['topic_kind']==1)
            $x['kind']="答疑";
		//$x['sight']=
        $a=$conn->query("select user_name from  user_table where id = '".$row['id']."';");
	    $row2 = mysqli_fetch_assoc($a);
		$x['author']=$row2['user_name'];	
		$x['time']=$row['time'];
		$x['title']=$row['title'];
        $b=$conn->query("select count(*) from response_table where topic_id = '".$x['id']."';");
	    $row3 = mysqli_fetch_assoc($b);
		$x['responseCnt']=$row3['count(*)'];
		
		
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>