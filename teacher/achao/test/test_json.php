<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Style-Type" content="text/css">
    <title>Title</title>
    <meta name="Generator" content="Cocoa HTML Writer">
    <meta name="CocoaVersion" content="1404.47">
    <style type="text/css">
        p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Menlo}
        span.s1 {color: #66187a}
        span.s2 {color: #7a7a43}
        span.s3 {color: #018001}
        span.s4 {color: #458383}
        span.s5 {color: #011480}
        span.s6 {color: #0432ff}
    </style>
</head>
<body>

<?php

$con = mysqli_connect("120.77.34.254", "zjuseG04", "exciting", "teaching_db", "3306");
if (!$con)
{
    die('Could not connect: ' . mysqli_error());
}

$result = mysqli_query($con, "select * from lesson_table");
$arr = [];
while($row = mysqli_fetch_assoc($result)) {
    $arr[] = $row;
}
echo json_encode($arr);

?>
</body>
</html>

