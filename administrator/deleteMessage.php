<?php
/**
 * Created by PhpStorm.
 * User: liao
 * Date: 2016/12/24
 * Time: 10:31
 */
    include "connect.php";
    $id = $_GET["id"];
    $result = $conn->query("delete from words_table where id=".$id.";");
?>