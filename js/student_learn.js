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
            $.ajax({
                url: "get_course_intro.php?courseID=" + courseID, async: true,
                success: function (result) {
                    $("#course_detail p[title='course_background']").text(result['国际国内背景']);
                    $("#course_detail p[title='teach_plan']").text(result['课时安排']);
                    $("#course_detail p[title='teaching_material']").text(result['使用教材']);
                    $("#course_detail p[title='examine_method']").text(result['考核方式']);
                }
            });
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
            $("#posts_catagory_ddMenu div").html($(this).html());
        });


        /************************************* 讨论区 ******************************************/

        //点击某个具体的帖子板块
        $(".post-border-item>a").click(function () {
            var border_type = $(this).attr("title");
            var border_name = $(this).text();
            $.ajax({
                url: "posts_handler.php?action=fetchAll&courseID=" + courseID + "&post_kind=" + border_type,
                success: function (result) {
                    //界面切换
                    $("#discuss_home_page").hide();
                    $("#posts_border_page").show();
                    //填充界面
                    $("#posts_border_name").text(border_name);
                    for(var i = 0; i < result.length; i++) {
                        var post_title = result["title"];
                        var post_issue_time = result["datetime"];
                        var post_publisher_name = result["publisher"];
                        var post_li = $("<li class='posts-list-item'></li>").append($("<div class='posts-list-item-title'></div>").text(post_title));
                        var name_span = $("<span class='posts-list-item-nick'></span>").text(post_publisher_name);
                        var time_span = $("<span class='posts-list-item-date'></span>").text("时间: " + post_issue_time);
                        post_li.append($("<div class='posts-list-btm'></div>").append(name_span).append("&nbsp&nbsp|&nbsp&nbsp").append(time_span));
                        $(".posts-list-ul").append(post_li);
                    }
                }
            });
        });
        //发布帖子
        $("#submit_post_btn").click(function () {
            var flag = true;
            var title_input = $("input[name='post_title']");
            if (title_input.text() === "") {
                title_input.after("帖子标题不能为空");
                flag = false;
            }
            var border_selector = $("#sel_post_catagory_ddMenu");
            console.log(border_selector.text());
            if (border_selector.text() === "") {
                border_selector.after($("<span></span>").text("请选择帖子所属的板块"));
                flag = false;
            }
            if (flag !== true) return;

            var ueContent = UE.getEditor('container').getContent();
            $.post("getUEditorContent.php", {myEditor: ueContent}, function (result, status) {
                alert(result);
            });
        });

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
        });

        //显示讨论区主界面
        $("a[href='#discuss_area_pane']").click(function () {
            $("#discuss_home_page").show();
            $("#issue_post_page").hide();
        });

        $(".add-post-comment").click(function () {
            $(this).hide();
            // var comment_area = $("<div></div>").attr("border", "1px solid #d9dde1");
            var comment_area = $("<textarea placeholder='发表评论...'></textarea>").css("margin-bottom", "10px");
            $(this).after(comment_area);
            comment_area.focus = true;
            var submit_btn = $("<button>提交</button>").addClass("p-btn-sm right");
            comment_area.after(submit_btn);
        });


        /****************************************加入队伍*************************************/
        //点击直接加入队伍的连接，通过团队名字和密码加入
        $("#direct_join_team_link").click(function () {
            $("#join_team_by_apply_pane").hide();
            $("#join_team_by_pass_pane").show();
        })

        //设置初始状态

        //讨论区
        $("#discuss_home_page").show();
        $("#issue_post_page").hide();
        $("#posts_border_page").hide();
        $("#post_detail_page").hide();


        //加入队伍区
        $("#join_team_by_apply_pane").show();
        $("#join_team_by_pass_pane").hide();
    });

