<?php
	include 'connect.php';
	session_start();
	$uid=$_SESSION['user'];
	//$uid='3140102222';
	$result = $conn->query("select * from private_msg_table where id='".$uid."' and state=0;");
	
	$arr = [];

	while($row = mysqli_fetch_assoc($result)) {
		$x['msg']=$row['content'];
		$x['time']=$row['time'];
		$arr[]=$x;
	}
	
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>