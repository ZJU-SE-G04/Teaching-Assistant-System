/**
 *
 * Created by dddong on 16/11/17.
 */

var cur_state;
page_state = {
    SHOW_NOTICE: 1,
    SHOW_COURSE_INTRO: 2,
    SHOW_TEACHER_INFO: 3,
    SHOW_COURSEWARE: 4,
    SHOW_ARTICLES: 5,
    SHOW_EXERCISES: 6,
    SHOW_DISCUSS_AREA: 7
};

$(document).ready(
    function () {
        var courseID = "ABCDE1";

        function get_course_intro() {
            $("#teacher_info_detail").hide();
            $("#course_detail").show();
            $("#teacher_list").show();
            // var htmlObj = $.ajax({
            //     url: "get_course_intro.php?courseID=" + courseID, async: true,
            //     success: function (result) {
            //         jsonObj = $.parseJSON(result);
            //         //TODO
            //     }
            // });
            $.ajax({
                url: "get_course_teacher.php?courseID=" + courseID, async: true,
                success: function (result) {
                    var jsonObj = result;
                    for(var i = 0; i < jsonObj.length; i++) {
                        var teacher_id = jsonObj[i].id;
                        var name = jsonObj[i].name;
                        console.log("teacher id:" + teacher_id);
                        $("#teacher_list ul").html("");
                        $("#teacher_list ul").append($("<li></li>").append($("<a></a>").attr("id", teacher_id).text(name)));
                    }
                    $("#teacher_list ul li a").click(function () {
                        var teacher_id = $(this).attr("id");
                        var teacher_name = $(this).text();
                        htmlObj = $.ajax({
                            url: "get_teacher_intro.php?teacherID=" + teacher_id, async: true,
                            success: function (result) {

                                var jsonObj = result;
                                var teacher_info_detail = jsonObj["introduction"];
                                console.log(teacher_info_detail);
                                $("#course_detail").hide();
                                $("#teacher_list").hide();
                                $("#teacher_info_detail").show();
                                $("#teacher_info_detail div h3").text(teacher_name);
                                $("#teacher_info_detail p").text(teacher_info_detail);
                                // var teacher_info_pane = $("<div class='tab-pane' id='teacher_info_pane'></div>");
                                // teacher_info_pane.append("<div class='page-header'><h3>" + teacher_name + "</h3></div>");
                                // teacher_info_pane.append($("<p></p>").text(teacher_info_detail));
                                // $("#tab_content_area").append(teacher_info_pane);
                                // cur_state = page_state.SHOW_TEACHER_INFO;
                            }
                        });
                    });
                }
            })
        }

        $("a[href='#course_intro_pane']").click(get_course_intro);

        $(".titleBox").click(function () {
                var content = $(this).next(".datum-content");
                var arrow_btn = $(this).children()[0];
                if (content[0].style.display == 'none') {
                    content.show();
                    arrow_btn.className = "glyphicon glyphicon-menu-up";
                } else {
                    content.css("display", "none");
                    arrow_btn.className = "glyphicon glyphicon-menu-down";
                }
            }
        );


        $("#choose_posts_catagory ul li a").click(function () {
            console.log($(this).html());
            $("#posts_catagory_ddMenu div").html($(this).html());
        })
    });

//    $(document).ready(function () {
//        var courseID =
//        htmlObj = $.ajax({url:"http://localhost/get_course_intro.php?courseID=", async:true});
//        $("#course_introduce").html(htmlObj.responseText);
//    });

