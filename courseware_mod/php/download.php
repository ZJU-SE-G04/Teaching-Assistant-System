<?php
include "../../connect.php";
$course_id=$_POST['argu'];
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

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
$conn->close();
?>

