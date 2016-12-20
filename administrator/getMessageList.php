<?php
	include 'connect.php';
    $result = $conn->query("select * from words_table ;");
	
	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['message_id']=(int)$row['id'];
		$x['name']=$row['name'];
		$x['content']=$row['content'];
		$x['read']=False;
		if($row['flag']==1);
		    $x['read']=TRUE;
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>