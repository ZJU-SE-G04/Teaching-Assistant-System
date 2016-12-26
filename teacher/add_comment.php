<?php
	include '../connect.php';
	$article_id=(int)$_GET["article_id"];//获取教师账号
	$id=$_GET['id'];
	$time=$_GET['time'];
	$content=$_GET['content'];
	//$article_id=33;
	//$id='3140105555';
	//$time='2016-6-8 12:02:20';
	//$content='Hail hydra!';

	$floor=1;
	$result=$conn->query('select * from comment_table where article_id='.$article_id.' order by floor DESC');
	if($result){
		$row=mysqli_fetch_assoc($result);
		$floor=(int)$row['floor'];
	}
	$floor++;
	
	$su=1;
	$erm='null';

	$result=$conn->query('insert into comment_table values('.$article_id.',"'.$id.'","'.$time.'","'.$content.'",'.$floor.');');
	if(!$result){ $su=0;$erm=mysql_error();}

	$arr['if_success']=$su;
	$arr['error_message']=$erm;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();

?>