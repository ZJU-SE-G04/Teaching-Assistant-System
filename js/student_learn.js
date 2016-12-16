/**
 *
 * Created by dddong on 16/11/17.
 */

let POSTNUM_PER_PAGE = 10;
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
                async: false,
                success: function (result, status) {
                    $("#courseware_nonpreview_area").show();
                    $("#courseware_pane .courseware_list").html("");
                    $("video").remove();
                    for (var i = 0; i < result.length; i++) {
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
                        var preview_link = $("<a></a>").attr("title", item['courseware_link']).text(item['courseware_name']);

                        //如果是视频
                        if (item_kind === "教学视频") {
                            preview_link.click(function () {
                                window.open("watch_video.html?vid=" + $(this).attr("title"));
                                // var video_area = $("<video id='my-video' class='video-js' controls autoplay preload='none' width='1280' height='528' data-setup='{}'></video>");
                                // video_area.css("width", 800).css("height", "450");
                                // video_area.append($("<source>").attr("src", $(this).attr("title")));
                                // video_area.append($('<p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>'));
                                // $("#courseware_nonpreview_area").hide();
                                //
                                // $("#courseware_pane video").remove();
                                // $("#courseware_pane").append(video_area);
                                // // videojs('my-video').ready(function () {
                                // //      this.on('timeupdate', function () {
                                // //          console.log("the time was updated to: " + this.currentTime());
                                // //      })
                                // // })
                            })
                        }
                        //如果是ppt
                        if (item_kind === "课件") {
                            preview_link
                            //TODO
                        }
                        item_ele.append(preview_link);
                        var download_area = $("<div class='download-btn right'></div>");
                        var download_link = $("<a></a>").attr("href", item['courseware_link']);
                        download_link.append($("<span class='glyphicon-download glyphicon'></span>"));
                        download_area.append(download_link);

                        //-----add by achao----
                        var c_delete_area = $("<div class='download-btn right'></div>");
                        c_delete_area.append($("<span class='glyphicon-trash glyphicon c-trash'></span>"));
                        c_delete_area.find(".c-trash").click(function () {
                            $(this).parent().parent().remove()
                            $.ajax({
                                url:"delete_courseware.php?courseware_id="+xxx,
                                success:function (result) {
                                    if(result["if_success"]==0){
                                        alert(result["err_message"]);
                                    }

                                }
                            });
                        });
                        item_ele.append(c_delete_area);
                        //----------------


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

        $(".search_post_btn").click(function () {
            var search_content = $(".search_post_input").val();
            if (search_content == "") return;
            var border_name = $("#posts_catagory_ddMenu>div").text();
            console.log(border_name);
            var border_type;
            switch (border_name) {
                case "老师答疑区":
                    border_type = 0;
                    break;
                case "综合讨论区":
                    border_type = 1;
                    break;
                case "小组讨论区":
                    border_type = 2;
                    break;
                case "所有板块":
                    border_type = "a";
                    break;
            }
            fetch_border_posts(border_name, border_type, 0, POSTNUM_PER_PAGE, search_content);
        });

        function fetch_border_posts(border_name, border_type, offset, count, search) {
            $.ajax({
                url: "posts_handler.php?action=fetchAll&courseID=" + courseID + "&post_kind=" + border_type + "&offset=" + offset + "&count=" + count + "&search=" + search,
                success: function (result) {
                    //界面切换
                    $("#discuss_home_page").hide();
                    $("#posts_border_page").show();
                    //填充界面
                    $("#posts_border_name").text(border_name).attr("border_type", border_type);
                    $(".posts-list-ul").children().remove();
                    for (var i = 0; i < result.length; i++) {
                        var post = result[i];
                        var post_title = post["title"];
                        var post_issue_time = post["datetime"];
                        var post_publisher_name = post["publisher"];
                        var post_id = post['topic_id'];
                        var post_title_ele = $("<a class='posts-list-item-title'></a>").text(post_title).click(function () {
                            //点击某个具体的帖子
                            //获取该帖子的内容详情
                            var post_id = $(this).parent().attr("id");
                            $.ajax({
                                url: "posts_handler.php?action=fetchDetail&topic_id=" + post_id,
                                async: false,
                                success: function (result) {
                                    $("#posts_border_page").hide();
                                    $("#discuss_home_page").hide();
                                    $("#issue_post_page").hide();
                                    $("#post_detail_page").show();

                                    $(".post-detail").attr("topic_id", post_id);
                                    $(".post-detail>.f-post-title").text(result['title']);
                                    $(".post-detail>.f-post-content").append($("<p></p>").text(result['content']));
                                    $(".post-detail-btm>.f-post-author").text(result['publisher']);
                                    $(".post-detail-btm>.f-post-date").text(result['datetime']);
                                }
                            });
                            //获取某个主题帖子下面的所有回复
                            $.ajax({
                                url: "posts_handler.php?action=fetchRe&topic_id=" + post_id + "&offset=0&count=10",
                                success: function (results) {
                                    $(".re-list-ul").children().remove();   //清空原有的内容
                                    // var topic_id = $(".post-detail").attr("title");
                                    for (var i = 0; i < results.length; i++) {
                                        result = results[i];
                                        $(".f-re-num").text("共" + results.length + "回复");    //获取评论数量
                                        var re_item_content_ele = $("<div class='re-item-content'></div>").text(result['content']);
                                        var re_item_nick = $("<span class='my-blue inline re-username' style='margin-right: 0.5em' ></span>").text(result['username']);
                                        var re_item_date = $("<span class='f-post-date' style='margin-left: 0.5em'></span>").text(result['time']);
                                        var re_comment_btn = $("<a class='comment-btn right my-blue'>回复</a>").click(function () {

                                            //点击回复的时候出现回复框
                                            if ($(this).parent().next().children("form").length != 0) return;
                                            var comment_form = $("<form method='post' action='submit_rere.php' title='submit_rere_form'></form>").css("overflow", "hidden");
                                            var comment_area = $("<textarea placeholder='发表评论...'></textarea>").css("margin-bottom", "10px");
                                            comment_area.focus = true;
                                            var submit_btn = $("<button>提交</button>").addClass("p-btn-sm right").css("margin-bottom", "5px");
                                            comment_form.append(comment_area).append(submit_btn);

                                            comment_form.validate({
                                                submitHandler: function () {
                                                    var topic_id = $(".post-detail").attr("topic_id");
                                                    var floor = comment_form.parent().parent().attr("floor");
                                                    var floor_be_re = 0;  //回复的对象是一级回复
                                                    var content = comment_form.children("textarea").val();
                                                    var id_be_re = comment_form.parent().parent().attr("userid");
                                                    var name_be_re = comment_form.parent().parent().find(".re-username").text();
                                                    $.post("posts_handler.php?action=submitReRe", {
                                                        action: "submitReRe",
                                                        topic_id: topic_id,
                                                        floor: floor,
                                                        id_be_re: id_be_re,
                                                        name_be_re: name_be_re,
                                                        content: content,
                                                        floor_be_re: floor_be_re
                                                    }, function (data, status) {
                                                        alert(data['msg']);

                                                    })
                                                }
                                            })
                                            $(this).parent().next().append(comment_form);
                                        });
                                        var re_item_btm = $("<div class='re-item-btm'></div>").append(re_item_nick).append("|").append(re_item_date).append(re_comment_btn);
                                        var re_li = $("<li class='re-item'></li>").append(re_item_content_ele).append(re_item_btm).attr("floor", result['floor']).attr("userid", result['userid']);
                                        re_li.append($("<div class='submit-rere-frame'></div>"));
                                        $(".re-list-ul").append(re_li);
                                    }

                                    //获取每个回复下面的所有二级回复
                                    var re_items = $(".re-item");
                                    for (var i = 0; i < re_items.length; i++) {
                                        var re_li = $(re_items.get(i));
                                        var floor = re_li.attr("floor");
                                        $.ajax({
                                            url: "posts_handler.php?action=fetchReRe&topic_id=" + post_id + "&floor=" + floor,
                                            async: false,   //很重要！如果是异步的ajax的话，后面引用re_li就不一定是同一个re_li了
                                            success: function (results) {
                                                var rereAreaBody = $("<div class='rere-area-body'></div>");
                                                if (results.length == 0) return;
                                                for (var i = 0; i < results.length; i++) {
                                                    var eachReRe = results[i];
                                                    var rere_item = $("<div class='rere-item'></div>").attr("userid", eachReRe['userid']).attr("rere_floor", eachReRe['re_floor']).append($("<div class='rere-content'></div>").text(eachReRe['re_content']));
                                                    var rere_username = $("<span class='my-blue rere-username'></span>").text(eachReRe['username']);
                                                    var rere_item_btm = $("<div class='rere-item-btm'></div>").append(rere_username);
                                                    if (eachReRe['id_of_be_re'] != 0) {
                                                        //回复对象不是一级回复
                                                        rere_item_btm.append($("<span style='margin: 0 0.5em'>回复</span>"));
                                                        var username_of_be_re = $("<span class='my-blue'></span>").text(eachReRe['username_of_be_re']);
                                                        rere_item_btm.append(username_of_be_re);
                                                    }
                                                    rere_item_btm.append($("<span style='margin: 0 0.5em'>|</span>"))
                                                    var rere_date = $("<span class='f-post-date'></span>").text(eachReRe['re_time']);
                                                    rere_item_btm.append(rere_date);
                                                    rere_item_btm.append($("<a class='comment-btn right my-blue'></a>").text("回复").click(function () {

                                                        if ($(this).parent().parent().next("form").length != 0) return;
                                                        //点击回复的时候出现回复框
                                                        var comment_form = $("<form method='post' action=''></form>").css("overflow", "hidden");
                                                        var comment_area = $("<textarea placeholder='发表评论...'></textarea>").css("margin-bottom", "10px");
                                                        comment_area.focus = true;
                                                        var submit_btn = $("<button>提交</button>").addClass("p-btn-sm right").css("margin-bottom", "5px");
                                                        // comment_area.after(submit_btn);
                                                        var rere_item = $(this).parent().parent();
                                                        comment_form.append(comment_area).append(submit_btn);

                                                        comment_form.validate({
                                                            submitHandler: function () {
                                                                var topic_id = $(".post-detail").attr("topic_id");
                                                                var floor = comment_form.parent().parent().parent().attr("floor");
                                                                var floor_be_re = comment_form.prev().attr("rere_floor");
                                                                var content = comment_form.children("textarea").val();
                                                                var id_be_re = comment_form.prev().attr("userid");
                                                                var name_be_re = comment_form.prev().find(".rere-username").text();

                                                                $.post("posts_handler.php", {
                                                                    action: "submitReRe",
                                                                    topic_id: topic_id,
                                                                    floor: floor,
                                                                    id_be_re: id_be_re,
                                                                    name_be_re: name_be_re,
                                                                    content: content,
                                                                    floor_be_re: floor_be_re
                                                                }, function (data, status) {
                                                                    // alert(data['msg']);

                                                                })
                                                            }
                                                        });

                                                        rere_item.after(comment_form);

                                                    }));
                                                    rere_item.append(rere_item_btm);
                                                    rereAreaBody.append(rere_item);

                                                }
                                                var rereArea = $("<div class='rere-area'></div>").append(rereAreaBody);
                                                // rereArea.append($("<div class='add-rere'>添加评论...</div>"));
                                                // console.log(rereArea);
                                                // console.log(re_li);
                                                re_li.append(rereArea);
                                            }
                                        })
                                    }
                                }
                            })


                        });
                        var post_li = $("<li class='posts-list-item'></li>").append(post_title_ele);
                        post_li.attr("id", post_id);
                        var name_span = $("<span class='posts-list-item-nick' style='margin-right: 1em'></span>").text(post_publisher_name);
                        var time_span = $("<span class='posts-list-item-date' style='margin-left: 1em'></span>").text("时间: " + post_issue_time);
                        post_li.append($("<div class='posts-list-btm'></div>").append(name_span).append("|").append(time_span));
                        $("#posts_border_page .posts-list-ul").append(post_li);
                    }
                }
            });
        }

        //点击某个具体的帖子板块
        $(".post-border-item>a").click(function () {
            var border_type = $(this).attr("title");
            var border_name = $(this).text();
            //获取该帖子板块的帖子数量

            $.ajax({        //后端还没有写好
                url: "posts_handler.php?action=fetchNum&courseID=" + courseID + "&post_kind=" + border_type,
                success: function (result) {
                    var num = result['num'];
                    var num = 5;
                    $("#posts_border_page .pagination").children().remove();
                    var pagination = $("#posts_border_page .pagination").append($("<li><a href='#'>&laquo;</a></li>"));
                    for (var i = 0; i < Math.ceil(num / POSTNUM_PER_PAGE); i++) {
                        pagination.append($("<li class=''></li>").append($("<a href='#'></a>").text(i + 1)));
                    }
                    pagination.append($("<li><a href='#'>&raquo</a></li>"));
                }
            });
            //获取该帖子板块中的第一页的所有帖子
            fetch_border_posts(border_name, border_type, 0, POSTNUM_PER_PAGE, "");

            // $("#posts_border_page .pagination").find("li.active").removeClass("active");

            $("#posts_border_page .pagination>li:nth-child(2)").addClass("active");

            $("#posts_border_page .pagination>li>a").click(function () {
                if ($(this).text() == "«") {
                    var page_no = $(this).parent().parent().find("li.active a").text() - 1;
                    if (page_no < 1) {//最小为1
                        return;
                    }
                    fetch_border_posts($("#posts_border_name").text(), $("#posts_border_name").attr("border_type"), POSTNUM_PER_PAGE * (page_no - 1), POSTNUM_PER_PAGE, "");
                    $(this).parent().parent().find("li.active").removeClass("active").prev().addClass("active");
                } else if ($(this).text() == "»") {
                    var page_no = parseInt($(this).parent().parent().find("li.active a").text()) + 1;
                    var max_page_no = parseInt($(this).parent().parent().find("li:nth-last-child(2) a").text());
                    console.log("max page no" + max_page_no);
                    console.log("page no:" + page_no);
                    if (page_no > max_page_no) {//最大为max_page_no
                        return;
                    }
                    fetch_border_posts($("#posts_border_name").text(), $("#posts_border_name").attr("border_type"), POSTNUM_PER_PAGE * (page_no - 1), POSTNUM_PER_PAGE, "");
                    $(this).parent().parent().find("li.active").removeClass("active").next().addClass("active");
                } else {
                    if ($(this).parent().hasClass("active")) return;
                    $(this).parent().parent().find("li.active").removeClass("active");
                    $(this).parent().addClass("active");
                    var page_no = parseInt($(this).text());
                    fetch_border_posts($("#posts_border_name").text(), $("#posts_border_name").attr("border_type"), POSTNUM_PER_PAGE * (page_no - 1), POSTNUM_PER_PAGE, "");
                }
            })
        });


        /****************************************发布帖子****************************************/

        $("#submit_post_form").validate({
            submitHandler: function () {
                var flag = true;
                var title = $("#post_title_input").val();
                if (title === "") {
                    $("#post_title_input").after($("<span class='error' style='margin-left: 10px'>帖子标题不能为空</span>"));
                    flag = false;
                }

                var border_name = $("#sel_post_catagory_ddMenu>div").text();
                if (border_name === "请选择主题所属板块") {

                    $("#sel_post_catagory_ddMenu").after($("<span class='error' style='margin-left: 10px; font-size: 1em'></span>").text("请选择帖子所属的板块"));
                    flag = false;
                }
                if (flag !== true) return;

                var ueContent = UE.getEditor('submitPost_editor').getContent();
                if(ueContent === "") return;
                $.post("getUEditorContent.php", {
                    title: title,
                    border: border_name,
                    postContent: ueContent
                }, function (result, status) {
                    // alert(result);
                    $("#test_div").html(result);
                });
            }
        });

        $("#select_posts_catagory li").click(function () {
            $("#sel_post_catagory_ddMenu div").text($(this).text());
        })

//显示发布帖子的界面
        $("#goto_issue_post_page_btn").click(function () {
            $("#discuss_home_page").hide();
            $("#issue_post_page").show();
            $("#post_detail_page").hide();
            $("#posts_border_page").hide();

        });

//后退按钮，返回讨论区主界面
        $(".back_to_discuss_home_page a").click(function () {
            $("#discuss_home_page").show();
            $("#issue_post_page").hide();
            $("#post_detail_page").hide();
            $("#posts_border_page").hide();
        });

//显示讨论区主界面
        $("a[href='#discuss_area_pane']").click(function () {
            $("#discuss_home_page").show();
            $("#issue_post_page").hide();
            $("#posts_border_page").hide();
            $("#post_detail_page").hide();
        });


        $(".add-rere").click(function () {
            $(this).hide();
            // var comment_area = $("<div></div>").attr("border", "1px solid #d9dde1");
            var comment_area = $("<textarea placeholder='发表评论...'></textarea>").css("margin-bottom", "10px");
            $(this).after(comment_area);
            comment_area.focus = true;
            var submit_btn = $("<button>提交</button>").addClass("p-btn-sm right");
            comment_area.after(submit_btn);
        });


//设置初始状态

//讨论区
        $("#discuss_home_page").show();
        $("#issue_post_page").hide();
        $("#posts_border_page").hide();
        $("#post_detail_page").hide();


    })
;

