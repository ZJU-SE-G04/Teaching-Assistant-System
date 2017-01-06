/**
 * Created by LiaoJinyuan on 2016/11/13.
 */

$(document).ready(function(){
    $("#message").addClass("active");
    $(".content-blk.message").show();

    $(".order-nav").click(function(){
        $(".order-nav.active").removeClass("active");
        $(this).addClass("active");
        $(".content-blk").hide();
        var s = $(this).attr("id");
        $("." + s).show();
    });


//message//////////////////////////////////////////////////////////////////////////////////////////////////
    function messageUpdate() {
        $.ajax({
            type:'GET',
            url: 'getMessageList.php',
            messageRecords: {},
            success: function(messageRecords) {
                $("#messageLoop").children(".new").remove();
                for (var i in messageRecords) {
                    var x = messageRecords[i];
                    var tmp = $("#messageLoop").children(".old").clone().removeClass("old").addClass("new").show();
                    tmp.find(".x-name").html(x.name);
                    tmp.find(".x-time").html(x.time);
                    tmp.find(".glyphicon-trash").attr("id", x.message_id);
                    tmp.find(".x-content").html(x.content);
                    $("#messageLoop").append(tmp);
                }
                $("#messageLoop").find(".glyphicon-trash").click(deleteMessage);
            }
        });
    };
    messageUpdate();
    $("#message").click(messageUpdate);

    function deleteMessage() {
        var message_id = $(this).attr("id");
        $.get("deleteMessage.php?id="+message_id);
        $(this).parents(".panel").slideUp(function () { $(this).remove() });
    }


//article//////////////////////////////////////////////////////////////////////////////////////////////////
    var articleRecords = "";
    function articleUpdate() {
        $("#articleDetail").hide();
        $("#articleLoop").show();
        $.get("getArticleList.php", function (data) {
            articleRecords = data;
            $("#articleLoop").children(".new").remove();
            for (var i in articleRecords) {
                var x = articleRecords[i];
                var tmp = $("#articleLoop").children(".old").clone().removeClass("old").addClass("new").show();
                // tmp.attr("id", x.article_id);
                tmp.find(".x-title").html(x.title);
                tmp.find(".x-contentDigest").html(x.articleDigest);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-commentCnt").html(x.commentCnt);
                tmp.find(".panel-heading").click((function (articleId, commentCnt) {
                    return function () { articleShow(articleId, commentCnt); }
                })(x.articleId, x.commentCnt));

                $("#articleLoop").append(tmp);
            }
        })
    }
    $("#article").click(articleUpdate);

//////////////////////////////
    var articleDetail = "";
    function articleShow(articleId, commentCnt) {
        $("#articleLoop").hide();
        $("#articleDetail").show();

        $.get("getArticleDetail.php?article_id="+articleId, function (data) {
            articleDetail = data;

            $("#articleBack").click(articleUpdate);

            $("#articleDetail").find(".x-title").html(articleDetail.title);
            $("#articleDetail").find(".x-author").html(articleDetail.author);
            $("#articleDetail").find(".x-time").html(articleDetail.time);
            $("#articleDetail").find(".x-body").html(articleDetail.body);

            showComments(articleDetail.articleId, 1);

            var pageCnt = Math.ceil(commentCnt / 10);
            initialCommentPagination(articleId, pageCnt);
        })
    }

    var pageComments = "";
    function showComments(articleId, pageNum) {
        var postData = {
            "articleId": articleId,
            "pageNum": pageNum
        }
        $.post("getPageComments.php", postData, function (data) {
            pageComments = data;

            $("#commentLoop").children(".new").remove();
            for (var i in pageComments.comments) {
                var x = pageComments.comments[i];
                var tmp = $("#commentLoop").children(".old").clone().removeClass("old").addClass("new").show();

                tmp.find(".x-floor").html(x.floor);
                tmp.find(".x-floorMaster").html(x.floorMaster);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-content").html(x.content);
                tmp.find(".panel-heading").find(".glyphicon-trash").click((function (articleId, floor) {
                    return function () { deleteComment.call(this, articleId, floor); }
                })(pageComments.articleId, x.floor));

                var reBlock = tmp.find(".panel-footer");
                reBlock.children(".new").remove();
                for (var j in x.reComments) {
                    var y = x.reComments[j];
                    var reTmp = reBlock.children(".old").clone().removeClass("old").addClass("new").show();

                    reTmp.find(".x-reFloorMaster").html(y.Master);
                    reTmp.find(".x-reFloorGuest").html(y.reTo);
                    reTmp.find(".x-reContent").html(y.content);
                    reTmp.find(".x-reTime").html(y.time);
                    reTmp.find(".glyphicon-trash").click((function (articleId, floor, reFloor) {
                        return function () { deleteReComment.call(this, articleId, floor, reFloor); }
                    })(pageComments.articleId, x.floor, y.floor));

                    reBlock.append(reTmp);
                }

                $("#commentLoop").append(tmp);
            }
        });

/*        $.ajax({
            type:'POST',
            url: 'getPageComments.php',
            data: {
                "articleId": articleId,
                "pageNum": pageNum
            },
            success: function(data) {
                console.log(data);
            }, error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });*/
    }

    function deleteComment(articleId, floor) {
        var postData = {
            "articleId": articleId,
            "floor": floor
        }
        $.post("deleteArticleComment.php", postData);
        $(this).parents(".panel").slideUp(function () { $(this).remove() });
    }
    function deleteReComment(articleId, floor, reFloor) {
        var postData = {
            "articleId": articleId,
            "floor": floor,
            "reFloor": reFloor
        }
        $.post("deleteReComment.php", postData);
        $(this).parents(".well").slideUp(function () { $(this).remove() });
    }

    function initialCommentPagination(articleId, pageCnt) {
        var pagination = $("#articleDetail").find(".pagination");
        pagination.find(".x-pageNum").html(1);
        pagination.find(".x-pageCnt").html(pageCnt);
        pagination.find(".prevPage").click(function () {
            var cur = pagination.find(".x-pageNum").html();
            var cur = parseInt(cur);
            if (cur >= 2) {
                pagination.find(".x-pageNum").html(cur-1);
                showComments(articleId, cur-1);
            }
        });
        pagination.find(".nextPage").click(function () {
            var cur = pagination.find(".x-pageNum").html();
            var cur = parseInt(cur);
            if(cur <= pageCnt-1) {
                pagination.find(".x-pageNum").html(cur+1);
                showComments(articleId, cur+1);
            }
        });
    }

//topic//////////////////////////////////////////////////////////////////////////////////////////////////
    var topicRecords = "";
    function topicUpdate() {  //click tab, click topicback
        $("#topicDetail").hide();
        $("#topicLoop").show();

        $.get("getTopicList.php", function (data) {
            topicRecords = data;

            $("#topicLoop").children(".new").remove();
            for (var i in topicRecords) {
                var x = topicRecords[i];
                var tmp = $("#topicLoop").children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".x-title").html(x.title);
                tmp.find(".x-author").html(x.author);
                tmp.find(".x-lesson").html(x.lesson);
                tmp.find(".x-kind").html(x.kind);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-responseCnt").html(x.responseCnt);
                tmp.find(".panel-heading").click((function (topicId, responseCnt) {
                    return function () { topicShow(topicId, responseCnt); }
                })(x.topicId, x.responseCnt));

                $("#topicLoop").append(tmp);
            }
        })
    }
    $("#topic").click(topicUpdate);

//////////////////////////////

    var topicDetail = {};

    function topicShow (topicId, responseCnt) {  //only called when clicking heading
        $("#topicLoop").hide();
        $("#topicDetail").show();

        $.get("getTopicDetail.php?topicId=" + topicId, function (data) {
            topicDetail = data;

            $("#topicBack").click(topicUpdate);

            var topicDetailDiv = $("#topicDetail").find(".panel:first");
            topicDetailDiv.find(".x-title").html(topicDetail.title);
            topicDetailDiv.find(".x-author").html(topicDetail.author);
            topicDetailDiv.find(".x-content").html(topicDetail.content);
            topicDetailDiv.find(".x-lesson").html(topicDetail.lesson);
            topicDetailDiv.find(".x-kind").html(topicDetail.kind);
            topicDetailDiv.find(".x-time").html(topicDetail.time);
            topicDetailDiv.find(".x-responseCnt").html(responseCnt);
            topicDetailDiv.find(".glyphicon-trash").click(function () {
                deleteTopic(this, topicId)
            });

            showResponses(topicId, 1);

            var pageCnt = Math.ceil(responseCnt / 10);
            initialResponsePagination(topicId, pageCnt);
        });
    }

    var pageResponses = "";
    function showResponses(topicId, pageNum) {
        var postData = {
            "topicId": topicId,
            "pageNum": pageNum
        }
        $.post("getTopicResponses.php", postData, function (data) {
            pageResponses = data;

            $("#topicResponseLoop").children(".new").remove();
            for (var i in pageResponses.responses) {
                var x = pageResponses.responses[i];
                var tmp = $("#topicResponseLoop").children(".old").clone().removeClass("old").addClass("new").show();

                tmp.find(".x-floor").html(x.floor);
                tmp.find(".x-floorMaster").html(x.floorMaster);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-content").html(x.content);
                tmp.find(".panel-heading").find(".glyphicon-trash").click((function (topicId, floor) {
                    return function () { deleteResponse.call(this, topicId, floor); }
                })(pageResponses.topicId, x.floor));

                var reBlock = tmp.find(".panel-footer");
                reBlock.children(".new").remove();
                for (var j in x.reResponses) {
                    var y = x.reResponses[j];
                    var reTmp = reBlock.children(".old").clone().removeClass("old").addClass("new").show();

                    reTmp.find(".x-reFloorMaster").html(y.Master);
                    reTmp.find(".x-reFloorGuest").html(y.reTo);
                    reTmp.find(".x-reContent").html(y.content);
                    reTmp.find(".x-reTime").html(y.time);
                    reTmp.find(".glyphicon-trash").click((function (topicId, floor, reFloor) {
                        return function () { deleteReResponse.call(this, topicId, floor, reFloor); }
                    })(pageResponses.topicId, x.floor, y.floor));

                    reBlock.append(reTmp);
                }

                $("#topicResponseLoop").append(tmp);
            }
        });
    }

    function deleteTopic(thisElement, topicId) {  //trash icon
        $.get("deleteTopic.php?topicId="+topicId);
        $(thisElement).parents(".panel").slideUp(function () { topicUpdate() });
    }
    function deleteResponse(topicId, floor) {  //trash icon
        var postData = {
            "topicId": topicId,
            "floor": floor
        }
        $.post("deleteTopicResponse.php", postData);
        $(this).parents(".panel").slideUp(function () { $(this).remove() });
    }
    function deleteReResponse(topicId, floor, reFloor) {
        var postData = {
            "topicId": topicId,
            "floor": floor,
            "reFloor": reFloor
        }
        $.post("deleteTopicReResponse.php", postData);
        $(this).parents(".well").slideUp(function () { $(this).remove() });
    }

    function initialResponsePagination(topicId, pageCnt) {
        var pagination = $("#topicDetail").find(".pagination");
        pagination.find(".x-pageNum").html(1);
        pagination.find(".x-pageCnt").html(pageCnt);
        pagination.find(".prevPage").click(function () {
            var cur = pagination.find(".x-pageNum").html();
            var cur = parseInt(cur);
            if (cur >= 2) {
                pagination.find(".x-pageNum").html(cur-1);
                showResponses(topicId, cur-1);
            }
        });
        pagination.find(".nextPage").click(function () {
            var cur = pagination.find(".x-pageNum").html();
            var cur = parseInt(cur);
            if(cur <= pageCnt-1) {
                pagination.find(".x-pageNum").html(cur+1);
                showResponses(topicId, cur+1);
            }
        });
    }

//class//////////////////////////////////////////////////////////////////////////////////////////////////
    $("#classForm").submit(function () {
        var data = {};
        data["lessonId"] = $("#lessonIdClass").val();
        data["teacherId"] = $("#teacherIdClass").val();
        data["beginTime1"] = $("#beginTime1").val();
        data["beginTime2"] = $("#beginTime2").val();
        data["lessonAddress1"] = $("#lessonAddress1").val();
        data["lessonAddress2"] = $("#lessonAddress2").val();
        $.post("addClass.php", data);

        alert("班级添加成功！")
    });

//teacher//////////////////////////////////////////////////////////////////////////////////////////////////
    var teacherIntroductionEditor = UE.getEditor("teacherIntroductionEditor", {
        initialFrameHeight:500,
        // isShow: false
    })

    $("#teacherForm").submit(function () {
        var data = {}
        data["teacherId"] = $("#teacherId").val()
        data["teacherName"] = $("#teacherName").val()
        data["teacherIntroduction"] = teacherIntroductionEditor.getContent()
        $.post("addTeacher.php", data)

        alert("教师添加成功！")
    })

//lesson//////////////////////////////////////////////////////////////////////////////////////////////////
    $(".lesson").find("input").focus(function () {
        $(".edui-editor:visible").hide()
        $(".editor:hidden").show()
        if ($(this).hasClass("editor")) {
            $(this).slideUp()
            $(this).next().find(".edui-editor").fadeIn()
        }
    })
    $(".ueEditor").each(function () {
        var ueEditor = UE.getEditor($(this).attr("id"), {
            initialFrameHeight:100,
            isShow: false
        })
        ueEditor.addListener("contentChange", function () {
            $("#" + this.key).prev().attr("value", this.getContent())
        })
    })
/*    var backgroundEditor = UE.getEditor("backgroundEditor", {
        initialFrameHeight:100,
        isShow: false
    })
    var classHourEditor = UE.getEditor("classHourEditor", {
        initialFrameHeight:50,
        isShow: false
    })
    var teachPlanEditor = UE.getEditor("teachPlanEditor", {
        initialFrameHeight:50,
        isShow: false
    })
    var textBookEditor = UE.getEditor("textBookEditor", {
        initialFrameHeight:50,
        isShow: false
    })
    var evaluationEditor = UE.getEditor("evaluationEditor", {
        initialFrameHeight:80,
        isShow: false
    })*/

    $("#lessonForm").submit(function () {
        var data = {}
        data["lessonId"] = $("#lessonId").val()
        data["lessonName"] = $("#lessonName").val()
        var lessonInfo = {}
        lessonInfo["国际国内背景"] = UE.getEditor("backgroundEditor").getContent()
        lessonInfo["课时安排"] = UE.getEditor("classHourEditor").getContent()
        lessonInfo["教学计划"] = UE.getEditor("teachPlanEditor").getContent()
        lessonInfo["使用教材"] = UE.getEditor("textBookEditor").getContent()
        lessonInfo["考核方式"] = UE.getEditor("evaluationEditor").getContent()
        data["lessonInfo"] = JSON.stringify(lessonInfo)
        $.post("addLesson.php", data)

        alert("课程添加成功！")
    })

//link//////////////////////////////////////////////////////////////////////////////////////////////////
    $("#link").click(linkUpdate)

    $("#linkForm").submit(function () {
        var data = {}
        data["linkName"] = $("#linkName").val()
        data["linkAddress"] = $("#linkAddress").val()
        $.post("addLink.php", data)

        alert("链接添加成功!")
        linkUpdate()
    })

    /*var linkRecords = [
        {
            "linkId": 22342134,
            "linkName": "浙江大学现代教务管理系统",
            "linkAddress": "http://jwbinfosys.zju.edu.cn"
        },
        {
            "linkId": 89742134,
            "linkName": "CC98论坛",
            "linkAddress": "http://www.cc98.org"
        },
        {
            "linkId": 12342134,
            "linkName": "Google",
            "linkAddress": "http://www.google.com"
        },
        {
            "linkId": 15342134,
            "linkName": "浙江大学软件学院",
            "linkAddress": "http://www.cst.zju.edu.cn"
        },
        {
            "linkId": 95342134,
            "linkName": "哔哩哔哩弹幕视频网",
            "linkAddress": "http://www.bilibili.com"
        },
    ]*/
    var linkRecords = ""
    function linkUpdate() {
        $.get("getLinkList.php", function (data) {
            linkRecords = data

            $("#linkTable").find(".new").remove()
            for (var i in linkRecords) {
                var x = linkRecords[i]
                var tmp = $("#linkTable").find(".old").clone().removeClass("old").addClass("new").show()

                tmp.find(".x-linkName").html(x.linkName)
                tmp.find(".x-linkAddress").attr("href", x.linkAddress).html(x.linkAddress)
                deleteLink(tmp, x.linkId)
                $("#linkTable").find("tbody").append(tmp)
            }
        })
    }
    function deleteLink(tmp, id) {
        tmp.find(".glyphicon-trash").click(function () {
            $.get("deleteLink.php?linkId=" + id)
            $(this).parents("tr").slideUp(function () { this.remove() })
        })
    }

//update//////////////////////////////////////////////////////////////////////////////////////////////////
    var updateInfoEditor = UE.getEditor("updateInfoEditor", {
        initialFrameHeight:200,
    })

    $("#updateForm").submit(function () {
        var data = {}
        data["updateInfo"] = updateInfoEditor.getContent()
        $.post("addUpdateInfo.php", data)

        alert("更新日志以保存，可在administrator/update_log.json中查看。")
    })

});
