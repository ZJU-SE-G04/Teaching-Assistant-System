<?php
	include 'connect.php';
	$teacherId=$_POST["teacherId"];
	$teacherName=$_POST["teacherName"];
	$teacherIntroduction=$_POST["teacherIntroduction"];
    $result = $conn->query('insert into teacher_table values("'.$teacherId.'","'.$teacherName.'","'.$teacherIntroduction.'");');
    echo 'insert into teacher_table values("'.$teacherId.'","'.$teacherName.'","'.$teacherIntroduction.'");';
	$conn->close();
?>