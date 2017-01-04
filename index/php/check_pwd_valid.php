<?php
/**
 * Created by PhpStorm.
 * User: achao_zju
 * Date: 2017/1/2
 * Time: 下午4:05
 */
function checkStringSafety( $var )
{
    if (!get_magic_quotes_gpc())
        $var = addslashes($var );
    $var = str_replace("_", "\_", $var );
    $var = str_replace("%", "\%", $var );

    $var  = nl2br($var );
    $var  = htmlspecialchars($var );

    if( preg_match('/select|insert|and|or|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile/i', $var))
    {
        $tips =array("code"=>"5","msg"=>"含有非法字符","res"=>array("token"=>$_SESSION['token']));
        echo   urldecode(json_encode(url_encode($tips)));
        exit();
    }
    return $var ;
}




?>