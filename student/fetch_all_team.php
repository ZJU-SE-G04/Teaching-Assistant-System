<?php
	include '../connect.php';

	$result = $conn->query("select * from team_table;");
	
	$arr = [];

	while($row = mysqli_fetch_assoc($result)) {
		$x['teamID']=(int)$row['team_id'];
		$x['teamName']=$row['team_name'];
		$x['max']=$row['max'];
		$x['joined']=$row['now'];
		$arr[]=$x;
	}
	
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>