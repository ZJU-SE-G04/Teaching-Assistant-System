<?php
	include 'connect.php';
    $result = $conn->query("select * from link_table;");
	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['linkId']=$row['id'];
		$x['linkName']=$row['link_name'];
		$x['linkAddress']=$row['link_address'];	
		$arr[] = $x;
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>