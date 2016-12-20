<?php
	include 'connect.php';
	$lessonId=$_POST["lessonId"];
	$teacherId=$_POST["teacherId"];
	$beginTime1=$_POST["beginTime1"];
	$beginTime2=$_POST["beginTime2"];
    $beginTime=$beginTime1.";".$beginTime2;
	$lessonAddress1=$_POST["lessonAddress1"];
	$lessonAddress2=$_POST["lessonAddress2"];
	$lessonAddress=$lessonAddress1.";".$lessonAddress2;
    $result = $conn->query('insert into class_table values(NULL,"'.$lessonId.'","'.$beginTime.'","'.$lessonAddress.'");');
	$conn->close();
	/*$st1="abc";
	$st2="def";
	$st=$st1.";".$st2;
	echo $st;*/
?>