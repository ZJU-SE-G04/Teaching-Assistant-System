<?php


$price=5;


$res=array(
    "code"=>"0",
    "msg"=>"成功订购机票!",
    "res"=>array(
        "originalPrice"=>$price,
        'token' => $_SESSION['token']
    )
);

echo json_encode($res);