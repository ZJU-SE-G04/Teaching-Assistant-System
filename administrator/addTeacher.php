<?php
	include 'connect.php';
	$teacherId=$_POST["teacherId"];
	$teacherName=$_POST["teacherName"];
	$teacherName=$teacherName.'老师';
	$teacherIntroduction=$_POST["teacherIntroduction"];
	$pwd=md5($teacherId);
    $result = $conn->query('insert into teacher_table values("'.$teacherId.'","'.$teacherName.'","'.$teacherIntroduction.'");');
	$result = $conn->query('insert into user_table values("'.$teacherId.'","'.$pwd.'","'.$teacherName.'",3,NULL,NULL,NULL);');
	$conn->close();
?>