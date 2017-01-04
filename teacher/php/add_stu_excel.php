<?php
include "../../connect.php";
$class_id=$_POST['argu'];
$result=$conn->query('select * from class_table where class_id='.$class_id);
$row=mysqli_fetch_assoc($result);
$lesson_id=$row['lesson_id'];

if ($_FILES["file"]["error"] > 0) {
//        echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
}
else {
//        echo "Upload: " . $_FILES["file"]["name"] . "<br />";
//        echo "Type: " . $_FILES["file"]["type"] . "<br />";
//        echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
//        echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";


        move_uploaded_file($_FILES["file"]["tmp_name"],
                "../../file/excel/" . $_FILES["file"]["name"]);
//        echo "Stored in: " . "Excel/" . $_FILES["file"]["name"];

}



require_once 'reader.php';
$data = new Spreadsheet_Excel_Reader();
$data->setOutputEncoding('UTF-8');
//echo "xzx";

$data->read('../../file/excel/test.xls');
error_reporting(E_ALL ^ E_NOTICE);

//echo "xxx";
//echo  $data->sheets[0]['numRows'];
for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) {
    for ($j = 1; $j <= 4; $j++) {//学号,专业,队伍名,
//        echo $i;
//        echo $j;
        if($data->sheets[0]['cells'][$i][$j]==""){
            echo $nuk="null";
        }
//        echo $data->sheets[0]['cells'][$i][$j].",";
    }
    $id=$data->sheets[0]['cells'][$i][1];
    $name=$data->sheets[0]['cells'][$i][2];
    $dep=$data->sheets[0]['cells'][$i][3];
    $maj=$data->sheets[0]['cells'][$i][4];
//    echo  $name;
//    echo $id;
    $result=$conn->query('update student_table set if_quit = 1 where id="'.$id.'" ;');//if_quit=1说明没退课
    $result=$conn->query('insert into user_table values("'.$id.'","'.$id.'","'.$name.'",1,null,null,null);');
    $result=$conn->query('insert into student_table values("'.$id.'","'.$name.'","'.$dep.'","'.$maj.'",1);');
    $result=$conn->query('insert into orgnize_table values("'.$id.'",1,0);');
    $result=$conn->query('insert into study_table values("'.$id.'","'.$lesson_id.'",'.$class_id.');');
//    echo $id;
    $result=$conn->query('update student_table set if_quit = 1 where id="'.$id.'";');//if_quit=1说明没退课
}
$result = $conn->query('select * from student_table  where if_quit = 0;');
while($row = mysqli_fetch_assoc($result)) {
    $delete_id=$row['id'];
    $result=$conn->query('delete from user_table where id= "'.$delete_id.'";');//删掉那些退课的人的信息
}
$result=$conn->query('update student_table set if_quit = 0' );//重置为0
$result = $conn->query("select * from student_table natural join study_table natural join orgnize_table natural join team_table where class_id=".$class_id.";");
$arr = [];
while($row = mysqli_fetch_assoc($result)) {
    $x['name']=$row['name'];
    $x['id']=$row['id'];
    $x['department']=$row['department'];
    $x['major']=$row['major'];
    if($row['flag']==1){
        $x['team_name']=$row['team_name'];
    }else{
        $x['team_name']='未组队';
    }
    $arr[] = $x;
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();
?>

