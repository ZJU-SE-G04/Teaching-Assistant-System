<?php
	function send($uid,$msg){
		include 'connect.php';
		$datetime=date('Y-m-d H:i:s');
		$result=$conn->query('insert into private_msg_table values(null,"'.$uid.'","'.$msg.'",0,"'.$datetime.'");');
		$conn->close();
	}
?>