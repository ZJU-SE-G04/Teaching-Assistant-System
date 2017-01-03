<?php
include "../../connect.php";
$course_id=$_POST['courseID'];
$kind=$_POST['courseware_kind'];
//echo $kind;
if ($_FILES["file"]["error"] > 0) {
        echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
}
else {
//    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
//    echo "Type: " . $_FILES["file"]["type"] . "<br />";
//    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
//        echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
    switch ($kind){
        case "最新课件": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/ware/" . $_FILES["file"]["name"]);
            $result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','/Teaching-Assistant-System/file/ware/','".$kind."');");
            break;
        case "往年课件": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/old_ware/" . $_FILES["file"]["name"]);
            $result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','/Teaching-Assistant-System/file/old_ware/','".$kind."');");
            break;
        case "模板": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/template/" . $_FILES["file"]["name"]);
            $result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','/Teaching-Assistant-System/file/template/','".$kind."');");
            break;
        case "教学视频": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/video/" . $_FILES["file"]["name"]);
            $result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','/Teaching-Assistant-System/file/video/','".$kind."');");
            break;
        case "教学音频": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/music/" . $_FILES["file"]["name"]);
            $result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','/Teaching-Assistant-System/file/music/','".$kind."');");
            break;
        case "参考资料": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/reference/" . $_FILES["file"]["name"]);
            $result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','/Teaching-Assistant-System/file/reference/','".$kind."');");
            break;
        case "以往优秀作业": move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../file/history_homework/" . $_FILES["file"]["name"]);
            $result = $conn->query("insert into courseware_table values(null,'".$course_id."','".$_FILES["file"]["name"]."','/Teaching-Assistant-System/file/history_homework/','".$kind."');");
            break;
        default:echo "请选择正确的文件类型";
    }

//        echo "Stored in: " . "../../file/课件/" . $_FILES["file"]["name"];

}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
$conn->close();
?>

