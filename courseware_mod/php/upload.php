<?php
include "../../connect.php";
$course_id=$_POST['course_id'];
$kind=$_POST['courseware_kind'];

if ($_FILES["file"]["error"] > 0) {
        echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
}
else {
//    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
//        echo "Type: " . $_FILES["file"]["type"] . "<br />";
//        echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
//        echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
    switch ($kind){
        case "课件": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/课件/" . $_FILES["file"]["name"]);
    }

//        echo "Stored in: " . "../../file/课件/" . $_FILES["file"]["name"];

}
$result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','../../file/课件/','".$kind."');");
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>

