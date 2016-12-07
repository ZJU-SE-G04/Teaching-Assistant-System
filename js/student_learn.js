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






        /******************************课件资料部分************************************/

        //课件资料页面改变下拉列表项的箭头
        $(".titleBox").click(function () {
                var content = $(this).next();
                var arrow_btn = $(this).children()[0];
                content.toggle();
                if (content[0].style.display == 'none') {
                    arrow_btn.className = "glyphicon glyphicon-menu-up";
                } else {
                    arrow_btn.className = "glyphicon glyphicon-menu-down";
                }
            }
        );

        $("a[href='#courseware_pane']").click(function () {
            $.ajax({
                url: "get_courseware.php?courseID=" + courseID,
                success: function (result, status) {
                    $("#courseware_nonpreview_area").show();
                    $("#courseware_pane .courseware_list").html("");
                    $("video").remove();
                    for(var i = 0; i < result.length; i++) {
                        var item = result[i];
                        var item_kind = item["courseware_kind"];
                        var list_ele;
                        switch (item_kind) {
                            case "课件":
                                list_ele = $("#course_ppts_list");
                                break;
                            case "模板":
                                list_ele = $("#tpls_list");
                                break;
                            case "参考资料":
                                list_ele = $("#refMaterial_list");
                                break;
                            case "以往优秀作业":
                                list_ele = $("#past_hw_list");
                                break;
                            case "教学视频":
                                list_ele = $("#teach_video_list");
                                break;
                            case "教学音频":
                                list_ele = $("#teach_audio_list");
                                break;
                            default:
                                console.log("课件资料类型错误\n");
                                break;
                        }
                        var item_ele = $("<div class='each_datum'></div>");
                        var preview_link = $("<a></a>").text(item['courseware_name']);

                        //如果是视频
                        if(item_kind === "教学视频") {
                            preview_link.click(function () {
                                var video_area = $("<video id='my-video' class='video-js' controls preload='auto' width='1280' height='528' data-setup='{}'></video>");
                                video_area.css("width", 800).css("height", "450");
                                video_area.append($("<source>").attr("src", item['courseware_link']));
                                video_area.append($('<p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>'));
                                $("#courseware_nonpreview_area").hide();

                                $("#courseware_pane video").remove();
                                $("#courseware_pane").append(video_area);
                            })
                        }
                        //如果是ppt
                        if(item_kind == "课件") {
                            preview_link
                            //TODO
                        }
                        item_ele.append(preview_link);
                        var download_area = $("<div class='download-btn right'></div>");
                        var download_link = $("<a></a>").attr("href", item['courseware_link']);
                        download_link.append($("<span class='glyphicon-download glyphicon'></span>"));
                        download_area.append(download_link);
                        item_ele.append(download_area);
                        list_ele.append(item_ele);

                    }

                }
            });
            $(".courseware_list").hide();
        });
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
                        var post_id = result['topic_id'];
                        var post_li = $("<li class='posts-list-item'></li>").append($("<div class='posts-list-item-title'></div>").text(post_title));
                        post_li.attr("id", post_id);
                        var name_span = $("<span class='posts-list-item-nick'></span>").text(post_publisher_name);
                        var time_span = $("<span class='posts-list-item-date'></span>").text("时间: " + post_issue_time);
                        post_li.append($("<div class='posts-list-btm'></div>").append(name_span).append("&nbsp&nbsp|&nbsp&nbsp").append(time_span));
                        $(".posts-list-ul").append(post_li);
                    }
                }
            });
        });


        //点击某个具体的帖子

        function fetch_post_detail() {
            var post_id = $(this).attr("id");
            $.ajax({
                url: "posts_handler.php?action=fetchDetail&topic_id=" + post_id,
                success: function (result) {
                    $("#posts_border_page").hide();
                    $("#post_detail_page").show();

                    $(".post-detail>.f-post-title").text(result['title']);
                    $(".post-detail>.f-post-content").text(result['content']);
                    $(".post-detail-btm>.f-post-author").text(result['publisher']);
                    $(".post-detail-btm>.f-post-date").text(result['datetime']);
                }
            })
        }
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
        $("#discuss_home_page").hide();
        $("#issue_post_page").hide();
        $("#posts_border_page").hide();
        $("#post_detail_page").show();


        //加入队伍区
        $("#join_team_by_apply_pane").show();
        $("#join_team_by_pass_pane").hide();
    });

