<?php

	$action=$_POST["action"];//获取行为
	//$action="request_quiz_detail";
	if($action=='request_quiz_list'){
		work_list();
	}else if($action=='request_report_list'){
		report_list();
	}else if($action=='submit_report'){
		submit_report();
	}else if($action=='request_quiz_detail'){
		work_detail();
	}else if($action=='submit_quiz_result'){
		submit_work();
	}
	

	//行为函数
	
	function submit_work(){
		include '../connect.php';
		//按2分一题算
		$lesson_id=$_POST["lesson_id"];
		$class_id=$_POST["class_id"];
		$stu_id=$_POST["stu_id"];
		$work_id=$_POST["work_id"];
		//$lesson_id='ABCDE1';
		//$class_id=1;
		//$stu_id='3140102222';
		//$work_id=1;
		$result = $conn->query("select * from question_table where work_id=".$work_id.";");

		$arr = [];
		
		while($row = mysqli_fetch_assoc($result)) {
			$x["number"]=(int)$row["number"];
			$x["answer"]=$row["answer"];
			$arr[] = $x;
		}

		$score=0;
		foreach($arr as $a){
			if($a["answer"]==$_POST[$a["number"]]){
				$score+=2;
			}
		}

		$sqlsta='update score_table set score='.$score.',state=1 where id="'.$stu_id.'" and work_id='.$work_id.';';

		$result=$conn->query(sqlsta);
		if($result){
			echo "成功";
		}else{
			echo "失败";
		}

		$conn->close();
	}
	
	function work_detail(){
		include '../connect.php';
		$lesson_id=$_POST["lesson_id"];
		$class_id=$_POST["class_id"];
		$stu_id=$_POST["stu_id"];
		$work_id=$_POST["work_id"];
		//$lesson_id='ABCDE1';
		//$class_id=1;
		//$stu_id='3140102222';
		//$work_id=1;
		$result = $conn->query("select * from question_table where work_id=".$work_id.";");

		$arr = [];
		
		while($row = mysqli_fetch_assoc($result)) {
			$x["number"]=(int)$row["number"];
			$x["question_type"]="option";
			$x["question"]=$row["question"];
			$x["a"]=(int)$row["a"];
			$x["b"]=(int)$row["b"];
			$x["c"]=(int)$row["c"];
			$x["d"]=(int)$row["d"];
			$arr[] = $x;
		}
		$result = $conn->query("select * from ask_table where work_id=".$work_id.";");

		while($row = mysqli_fetch_assoc($result)) {
			$y["number"]=(int)$row["number"];
			$y["question_type"]="essay";
			$y["question"]=$row["question"];
			$arr[] = $y;
		}
		
		$result = $conn->query("select * from work_table where work_id=".$work_id.";");
		$row = mysqli_fetch_assoc($result);
		$work_name=$row['work_name'];
		$all['work_name']=$row['work_name'];
		echo '{"work_name":"'.$work_name.'","question":'.json_encode($arr, JSON_UNESCAPED_UNICODE).'}';
		//$all['question']=json_encode($arr, JSON_UNESCAPED_UNICODE);
		
		//echo json_encode($all, JSON_UNESCAPED_UNICODE);
		
		
		$conn->close();
	}

	function work_list(){
		include '../connect.php';
		$lesson_id=$_POST["lesson_id"];
		$class_id=$_POST["class_id"];
		$stu_id=$_POST["stu_id"];
		//$lesson_id='ABCDE1';
		//$class_id=1;
		//$stu_id='3140102222';
		$result = $conn->query("select work_table.work_id,work_name,ddl,score_table.state,score_table.score from work_table join score_table on work_table.work_id=score_table.work_id where lesson_id='".$lesson_id."' and class_id=".$class_id." and score_table.id='".$stu_id."';");

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$x["work_id"]=(int)$row["work_id"];
			$x["work_name"]=$row["work_name"];
			$x["ddl"]=$row["ddl"];
			$x["state"]=(int)$row["state"];
			$x["score"]=(float)$row["score"];
			$arr[] = $x;
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}

	function report_list(){
		include '../connect.php';
		$lesson_id=$_POST["lesson_id"];
		$class_id=$_POST["class_id"];
		$stu_id=$_POST["stu_id"];
		//$lesson_id='ABCDE1';
		//$class_id=1;
		//$stu_id='3140102222';
		$result = $conn->query("select report_table.report_id,report_name,ddl,commit_table.state,report_table.ddl,report_table.detail,report_table.file,commit_table.score,commit_table.comment from report_table join commit_table on report_table.report_id=commit_table.report_id where lesson_id='".$lesson_id."' and class_id=".$class_id." and commit_table.id='".$stu_id."';");

		$arr = [];
		while($row = mysqli_fetch_assoc($result)) {
			$x["report_id"]=(int)$row["report_id"];
			$x["report_name"]=$row["report_name"];
			$x["state"]=(int)$row["state"];
			$x["ddl"]=$row["ddl"];
			$x["detail"]=$row['detail'];
			$x['file']=$row['file'];
			$x["score"]=(float)$row["score"];
			$x['comment']=$row['comment'];
			$arr[] = $x;
		}
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		$conn->close();
	}

	function submit_report(){
	}

?>
