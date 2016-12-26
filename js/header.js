/**
 * Created by dddong on 16/12/26.
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }else{
        return null;
    }
}
$(document).ready(function () {
    var courseID = getQueryString("lesson_id");
    var lesson_name = getQueryString("lesson_name");
    if($.cookie("user_id") == "null") {
        $("#username").text("游客");
        $("#username").attr("href", "#");
        $("#username").attr("target", "_self");
    } else {
        $("#username").text($.cookie("user_name"));
        $("#username").attr("href", "student_home.html?lesson_id=" + courseID + "&lesson_name=" + lesson_name);
    }

    $(".coursename>strong").text(lesson_name);
    $.ajax({
        url: "get_course_teacher.php?courseID=" + courseID, async: true,
        success: function (result) {
            var jsonObj = result;
            $(".teacherName").text("");
            for (var i = 0; i < jsonObj.length; i++) {
                $(".teacherName").append(jsonObj[i].name + " ");
            }
        }
    });
    $(".teacherName").append()
});
