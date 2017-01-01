<?php
include "../../connect.php";
$id=$_GET['ware_id'];
$result = $conn->query("delete from courseware_table WHERE courseware_id= '".$id."';");
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
