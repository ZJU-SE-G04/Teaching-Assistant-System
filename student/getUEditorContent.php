<html>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<script src="../utf8-php-2/ueditor.parse.js" type="text/javascript"></script>
<script>
    uParse('.content',{
        'rootPath': '../'
    })

</script>
</html>
<?php
    //获取数据
//    error_reporting(E_ERROR|E_WARNING);
    $content =  htmlspecialchars(stripslashes($_POST['myEditor']));


    //存入数据库或者其他操作

    //显示
    echo htmlspecialchars_decode($content);
?>
