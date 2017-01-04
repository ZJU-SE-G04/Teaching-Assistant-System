<?php
/**
 * Created by PhpStorm.
 * User: dddong
 * Date: 17/1/3
 * Time: 下午7:32
 */
include '../../connect.php';
$result = $conn->query('select * from link_table');
$arr = [];
while ($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();
?>