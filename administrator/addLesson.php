<?php
	include 'connect.php';
	$lessonId=$_POST["lessonId"];
	$lessonName=$_POST["lessonName"];
	$lessonInfo=$_POST["lessonInfo"];
    $result = $conn->query('insert into lesson_table values("'.$lessonId.'","'.$lessonName.'","'.$lessonInfo.'");');
	$conn->close();
?>