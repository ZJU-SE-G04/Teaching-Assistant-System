<?php
/**
 * Created by PhpStorm.
 * User: liao
 * Date: 2016/12/26
 * Time: 15:45
 */
if(!file_exists("update_log.json")){
    $file = fopen("update_log.json", "w");
    $arr = [];
    $log["date"] = date("Y-m-d h:i:sa");
    $log["info"] = "Log file created.";
    $arr[] = $log;

    $jsonStr = json_encode($arr, JSON_UNESCAPED_UNICODE);
    fwrite($file, $jsonStr);
    fclose($file);
}

$info = $_POST["updateInfo"];

$jsonStr = file_get_contents("update_log.json");
$arr = json_decode($jsonStr);
$log["date"] = date("Y-m-d h:i:sa");
$log["info"] = $info;
$arr[] = $log;

$jsonStr = json_encode($arr, JSON_UNESCAPED_UNICODE);

$file = fopen("update_log.json", "w");
fwrite($file, $jsonStr);
fclose($file);
?>
