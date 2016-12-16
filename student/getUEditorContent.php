<?php
    //获取数据
    error_reporting(E_ERROR|E_WARNING);
    $content =  htmlspecialchars(stripslashes($_POST['postContent']));


    //存入数据库或者其他操作

    //显示
    echo htmlspecialchars_decode($content);
?>
