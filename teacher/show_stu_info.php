<?php
	include 'connect.php';
	$class_id=$_GET["class_id"];//获取教师账号
	//$class_id=1;
	

	//这里需要将每条记录进行判断，决定team_name是组名还是“未组队”
	$result = $conn->query("select * from student_table natural join study_table natural join orgnize_table natural join team_table where class_id=".$class_id.";");

	$arr = [];
	while($row = mysqli_fetch_assoc($result)) {
		$x['name']=$row['name'];
		$x['id']=$row['id'];
		$x['department']=$row['department'];
		$x['major']=$row['major'];
		if($row['flag']==1){
			$x['team_name']=$row['team_name'];
		}else{
			$x['team_name']='未组队';
		}
		$arr[] = $x;	
	}
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>