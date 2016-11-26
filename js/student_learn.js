/**
 *
 * Created by dddong on 16/11/17.
 */


$(document).ready(
    function () {
        //课程号，从首页传过来的参数获得
        var courseID = "ABCDE1";

        //获取课程信息，包括课程所有老师
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
                    for (var i = 0; i < jsonObj.length; i++) {
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
                            }
                        });
                    });
                }
            })
        }

        $("a[href='#course_intro_pane']").click(get_course_intro);

        //课件资料页面改变下拉列表项的箭头
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
        });

        //发布帖子
        $("#submit_post_btn").click(function () {
            var flag = true;
            var title_input = $("input[name='post_title']");
            if(title_input.text() === "") {
                title_input.after("帖子标题不能为空");
                flag = false;
            }
            var border_selector = $("#sel_post_catagory_ddMenu");
            console.log(border_selector.text());
            if(border_selector.text() === "") {
                border_selector.after($("<span></span>").text("请选择帖子所属的板块"));
                flag = false;
            }
            if(flag !== true) return;

            var ueContent = UE.getEditor('container').getContent();
            $.post("getUEditorContent.php", {myEditor:ueContent}, function (result, status) {
                    alert(result);
            });
        });
        // 讨论区

        //显示发布帖子的界面
        $("#goto_issue_post_page_btn").click(function () {
            $("#discuss_home_page").hide();
            $("#issue_post_page").show();
            $(".back_text a").click(function () {
                $("#discuss_home_page").show();
                $("#issue_post_page").hide();
            });
        });

        $("a[href='#join_team_pane']").click(function () {
            $("#join_team_by_apply_pane").show();
            $("#join_team_by_pass_pane").hide();
        })

        //显示讨论区主界面
        $("a[href='#discuss_area_pane']").click(function () {
            $("#discuss_home_page").show();
            $("#issue_post_page").hide();
        });

        //点击直接加入队伍的连接，通过团队名字和密码加入
        $("#direct_join_team_link").click(function () {
            $("#join_team_by_apply_pane").hide();
            $("#join_team_by_pass_pane").show();
        })

        $(".add-post-comment").click(function () {
            
        })
        //设置初始状态
        //讨论区
        $("#discuss_home_page").hide();
        $("#issue_post_page").hide();
        $("#posts_border_page").hide();
        $("#post_detail_page").show();


        //加入队伍区
        $("#join_team_by_apply_pane").show();
        $("#join_team_by_pass_pane").hide();
    });

