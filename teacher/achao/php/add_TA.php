<?php
/**
 * Created by PhpStorm.
 * User: achao_zju
 * Date: 21/11/2016
 * Time: 8:20 PM
 */
for ($i=0;$i<sizeof($_POST['TA_id']);$i++){
    echo $_POST['TA_id'][$i];
    echo $_POST['TA_name'][$i];
    echo $_POST['department'][$i];
    echo $_POST['major'][$i];


}