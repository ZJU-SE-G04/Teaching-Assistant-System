<?php
	//尚未测试
	include '../connect.php';
	$action=$_POST['release_quiz'];
	$detail=$_POST['quiz_detail'];
	session_start();
	$uid=$_SESSION['user'];
	//$lesson_id=$_POST['lesson_id'];
	//$class_id=(int)$_POST['class_id'];
	//$ddl=$_POST['ddl'];
	//$work_detail=$_POST['the_work_detail'];
	//$uid='111111';
	$lesson_id='ABCDE1';
	$class_id=1;
	$ddl=date("Y-m-d",strtotime("+1 week"));
	$work_detail='请按时完成本次作业。';

	/*$detail='{"option_num":"2","essay_num":"2","quiz_name":"002",
"option_question":
[{"title":"111","a":"11","b":"12","c":"13","d":"14","answer":"c"},
{"title":"222","a":"21","b":"22","c":"23","d":"24","answer":"b"}],
"essay_question":[{"title":"333"},{"title":"444"}]} ';*/

	$work=json_decode($detail,true);
	//成功获取并解析json

	$work_name=$work['quiz_name'];
	
	$result=$conn->query('insert into work_table values(null,"'.$work_name.'","'.$lesson_id.'",'.$class_id.',"'.$uid.'","'.$ddl.'","'.$work_detail.'");');
	if($result==null){
		echo false;
		return 0;
	}
	
	//插入作业
	$result=$conn->query('select * from work_table where work_name="'.$work_name.'";');
	$row=mysqli_fetch_assoc($result);
	$wid=$row['work_id'];
	//echo $wid;

	$qarr=$work['option_question'];
	for($i=0;$i<$work['option_num'];$i++){
		$result=$conn->query('insert into question_table values('.$wid.','.($i+1).',"'.$qarr[$i]['title'].'","'.$qarr[$i]['a'].'","'.$qarr[$i]['b'].'","'.$qarr[$i]['c'].'","'.$qarr[$i]['d'].'","'.$qarr[$i]['answer'].'");');
		if($result==null){
			echo false;
			return 0;
		}
	}

	$qarr=$work['essay_question'];
	for($i=0;$i<$work['essay_num'];$i++){
		$result=$conn->query('insert into ask_table values('.$wid.','.($i+1).',"'.$qarr[$i]['title'].'");');
		if($result==null){
			echo false;
			return 0;
		}
	}
	echo true;
	$conn->close();
?>