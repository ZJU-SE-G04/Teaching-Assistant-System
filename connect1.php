<?php
	$servername = "";
	$username = "";
	$password = "";
	$dbname='teaching_db';
	date_default_timezone_set('prc');
	// 创建连接
	$conn = new mysqli($servername, $username, $password,$dbname);
	$conn->query("set names utf8;");
?>
