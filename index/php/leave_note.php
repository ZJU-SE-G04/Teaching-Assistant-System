<?php
/**
 * Created by PhpStorm.
 * User: achao_zju
 * Date: 2017/1/3
 * Time: 下午7:09
 */
include '../../connect.php';
$name=$_POST['name'];
$time=$_POST['time'];
$content=$_POST['content'];


$result=$conn->query('insert into words_table values(null,"'.$name.'","'.$time.'",0,"'.$content.'");');
if(!$result){
    $su=0;
    $erm='留言失败,请联系网站管理员';
}else{
    $su=1;
    $erm="";
}
$arr['if_success']=$su;
$arr['err_message']=$erm;
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();