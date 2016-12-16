<?php
	include 'connect.php';
	$article_id=(int)$_GET["article_id"];//获取教师账号
	$id=$_GET['id'];
	$time=$_GET['time'];
	$content=$_GET['content'];
	$ofloor=$_GET['floor'];
	$rid=$_GET['re_id'];

	//$article_id=2;
	//$id='3140104444';
	//$time='2016-6-8 12:02:20';
	//$content='Hail hydra!';
	//$ofloor=3;
	//$rid='111111';

	$floor=1;
	$result=$conn->query('select * from re_comment_table where article_id='.$article_id.' and floor='.$ofloor.' order by re_floor DESC');
	if($result){
		$row=mysqli_fetch_assoc($result);
		$floor=(int)$row['re_floor'];
	}
	$floor++;
	
	$su=1;
	$erm='null';

	$result=$conn->query('insert into re_comment_table values('.$article_id.',"'.$id.'","'.$time.'","'.$content.'",'.$ofloor.','.$floor.',"'.$rid.'");');
	if(!$result){ $su=0;$erm=mysql_error();}

	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>