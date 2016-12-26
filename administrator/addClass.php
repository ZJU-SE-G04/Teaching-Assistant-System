<?php
	include 'connect.php';
	$lessonId=$_POST["lessonId"];
	$teacherId=$_POST["teacherId"];
	$beginTime1=$_POST["beginTime1"];
	$beginTime2=$_POST["beginTime2"];
	if($beginTime2)
        $beginTime=$beginTime1.";".$beginTime2;
	else
	    $beginTime=$beginTime1;
	$lessonAddress1=$_POST["lessonAddress1"];
	$lessonAddress2=$_POST["lessonAddress2"];
	if($lessonAddress2)
	    $lessonAddress=$lessonAddress1.";".$lessonAddress2;
	else
	    $lessonAddress=$lessonAddress1;
    $result = $conn->query('insert into class_table values(NULL,"'.$lessonId.'","'.$beginTime.'","'.$lessonAddress.'");');
    echo 'insert into class_table values(NULL,"'.$lessonId.'","'.$beginTime.'","'.$lessonAddress.'");';
    $result1 = $conn->query('select max(class_id) from class_table;');
    $class_id_array = mysqli_fetch_assoc($result1);
    $class_id = $class_id_array["max(class_id)"];
    $result2 = $conn->query('insert into teach_table values("'.$teacherId.'","'.$lessonId.'","'.$class_id.'");');
    echo 'insert into teach_table values("'.$teacherId.'","'.$lessonId.'","'.$class_id.'");';
	$conn->close();
	/*$st1="abc";
	$st2="def";
	$st=$st1.";".$st2;
	echo $st;*/
?>