<?php
/**
 * Created by PhpStorm.
 * User: achao_zju
 * Date: 26/11/2016
 * Time: 3:25 PM

 */
echo sizeof($_POST['id']);

for ($i=0;$i<sizeof($_POST['id']);$i++) {
    echo $_POST['id'][$i];
    echo $_POST['name'][$i];
    echo $_POST['department'][$i];
    echo $_POST['major'][$i];
}



