
//文章区bug
//插入一个一级回复后,在这个一级回复上不能回复,因为只是前端刷新

//-------一些全局变量---------

var article_id;//在点击文章后被初始化
var re_user_name='0';//被回复人姓名
var re_user_id="0";//被回复人id

//------- wo get it
$(document).ready(function() {
    // $("#notice").addClass("in active");
    // $("#notice").addClass("x-old-nav");
    // // $(".content-blk.message").show();

    $("#article").click(function () {
        // var x_old_nav=$(".x-old-nav");
        // x_old_nav.removeClass("active");
        // x_old_nav.removeClass("x-old-nav");
       $("#notice").removeClass("in active");



        // $(".content-blk").hide();
        // var s = $(this).attr("id");
        // $("." + s).show();
    });

    // $("#articleBack").click(articleUpdate);
});

//-------show an article list--------


function  articleUpdate(needed_title) {
    $("#articleDetail").hide();
    $("#write_article").hide();
    $("#articleLoop").show();
    $("#update_article").hide();
    var write_article_button = $("#write_article_button");
    if(level==3) {
        write_article_button.click(showWriteArticle);
        write_article_button.show();
    }else {
        write_article_button.hide();
    }

    var articleBack=write_article_button.prev();
    articleBack.hide();
    articleBack.click(returnToArticleList);

    if(needed_title==null){
        needed_title='';
    }
    $.ajax({
        url:"show_article_list.php?lesson_id="+course_id+"&needed_title="+needed_title,
        success:function (result) {
            var articleRecords=result;
            var articleLoop=$("#articleLoop");
            articleLoop.children(".new").remove();
            for (var i in articleRecords) {
                var x = articleRecords[i];
                var tmp = articleLoop.children(".old").clone().removeClass("old").addClass("new").show();

                if(x.id==user_id) {
                    tmp.find(".x-trash").attr("onclick", "deleteArticle(" + x.article_id + ")");
                }
                else {
                    tmp.find(".x-trash").hide()
                }
                tmp.find(".x-article-id").html(x.article_id);
                tmp.find(".x-title").html(x.title);
                tmp.find(".x-contentDigest").html(x.short_content);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-author").html(x.user_name);
                articleLoop.append(tmp);
            }
            articleLoop.find(".panel-heading").click(articleShow);  //all heading created
        }
    });
}
//-------显示二级评论--------



//------------show input for writing a article----------

function  showWriteArticle() {
    $("#articleLoop").hide();
    $(this).hide();
    $("#write_article").show();
    $(this).prev().show()
}

//-------------- write an article-----------


function  writeArticle() {
    var title=document.getElementById("article_title").value;
    var content=ue.getContent();

    $.ajax({
            type:"GET",
            url:"add_article.php?lesson_id="+course_id+"&id="+user_id+"&title="+title+"&content="+content,
            success:function (result) {
                var jsonObj=result;
                if(jsonObj["if_success"]==1){
                    window.alert("文章发布成功");
                    location.reload(true);
                }
                else {
                    window.alert(jsonObj["error_message"]);
                }
            }
        }
    );

}

//--------------- cancel writing an article---------

function  cancelArticle() {
    document.getElementById("articleLoop").style.display="block";
    document.getElementById("write_article_button").style.display="block";
    document.getElementById("write_article").style.display="none";

}


//-----------update an article ----------
function updateArticle(article_id) {
    var update_article=$("#update_article");
    update_article.show();

    var tmp=$("#articleDetail");
    tmp.hide();
    update_article.find(".x-button").attr("onclick","submitUpdateArticle("+article_id+")");

    update_article.find("#article_title_update").val(tmp.find(".x-title").text());
    ue_update.setContent(tmp.find(".x-body").text());
}


function  submitUpdateArticle(article_id) {
    var title=$("#update_article").find("#article_title_update").val();
    var content=ue_update.getContent();
    $.ajax({
      type:"GET",
        url:"update_article.php?article_id="+article_id+"&title="+title+"&content="+content,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==1){
                window.alert("修改成功");
                location.reload();
            }else {
                window.alert(jsonObj["error_message"]);
            }
        }

    }
    );

}


//----------cancel updating an article-----------------------

function cancelUpdateArticle() {
    $("#update_article").hide();
    $("#articleLoop").show();
    $("#write_article_button").show()
}

//-----------delete an article---------------------------
function  deleteArticle(article_id) {
    $.ajax({
        url:"delete_article.php?article_id="+article_id,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==1){
                window.alert("成功删除");
                location.reload(true);
            }
            else {
                window.alert(jsonObj["error_message"]);
            }

        }
    }
    )

}


//------show article details and comments(first)---------

function articleShow() {

    var articleDetail_local=$("#articleDetail");
    articleDetail_local.show();
    $("#articleLoop").hide();
    var write_article_button=$("#write_article_button");
    write_article_button.hide();
    write_article_button.prev().show();


    var parent=$(this).parent();
    article_id=parent.find(".x-article-id").text();

    $.ajax({
        type:"GET",
        url:"show_article_detail.php?article_id="+article_id+"",
        success:function (result) {
            var articleDetail=result;

            var title=parent.find(".x-title").text();
            var author=parent.find(".x-author").text();
            var time=parent.find(".x-time").text();


            articleDetail_local.find(".x-title").html(title);
            articleDetail_local.find(".x-author").html(author);
            if(level==3) {//教师才可以删除和编辑文章
                articleDetail_local.find(".x-edit").attr("onclick", "updateArticle(" + article_id + ")");
                articleDetail_local.find(".x-trash").attr("onclick", "deleteArticle(" + article_id + ")");
                articleDetail_local.find(".x-edit").show();
                articleDetail_local.find(".x-trash").show();
            }
            articleDetail_local.find(".x-time").html(time);
            articleDetail_local.find(".x-body").html(articleDetail["article_content"]);


            var post_detail_page=articleDetail_local.find("#x_post_detail_page");
            post_detail_page.find(".x-comment-number").text(articleDetail["comment_number"]);


            var posts_list_ul=post_detail_page.find(".posts-list-ul");
            posts_list_ul.children(".new").remove();
            var i;
            for (i in articleDetail["comment"]) {
                var x = articleDetail["comment"][i];
                var tmp = posts_list_ul.children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".x-floor").html(x.floor);
                tmp.find(".x-name").html(x.user_name);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-content").html(x.content);
                tmp.find(".x-comment").click(add_second_comment_tx);
                tmp.find(".post-comments-area").hide();

                if(user_id!=x.id){
                    tmp.find(".x-first-delete").hide();
                }
                else {
                    tmp.find(".glyphicon").click(deleteComment);
                }
                posts_list_ul.append(tmp);

                showSecondComment(x.floor);
            }


        }
    });

}

function showSecondComment(floor) {

    var posts_list_item=$(".posts-list-ul").children().last();

    $.ajax({
        url:"show_second_comment.php?article_id="+article_id+"&floor="+floor,
        success:function (result) {
            var secondComment=result;
            var second_comment_number=secondComment["second_comment_number"];


            var post_comment_area_body=posts_list_item.find(".post-comment-area-body");
            // post_comment_area_body.find(".x-second-comment-number").html(second_comment_number);
            post_comment_area_body.children(".new").remove();
            var i;
            for ( i in secondComment["second_comment"]) {
                var tmp = post_comment_area_body.children(".old").clone().removeClass("old").addClass("new").show();
                var x=secondComment["second_comment"][i];

                tmp.find(".x-name").html(x.user_name);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-second-comment-id").html(x.id);

                tmp.find(".x-content").html(x.content);
                tmp.find(".x-re-floor").html(x.re_floor);
                tmp.find(".post-comment-btn").click(add_second_comment_second_tx);
                if(x.re_user_name!="0") {
                    tmp.find(".x-re-name").html(x.re_user_name);
                }
                else {
                    tmp.find(".x-response").html("");
                }
                if(x.id!=user_id){
                    tmp.find(".x-delete").hide();
                }
                else {
                    tmp.find(".x-delete").click(deleteSecondComment);
                }
                post_comment_area_body.append(tmp);
            }
            if(second_comment_number!=0) {
                posts_list_item.find(".post-comments-area").show();
            }

            post_comment_area_body.parent().find(".add-post-comment").click(function () {
                $(this).hide();
                var comment_area = $("<textarea placeholder='发表评论...'></textarea>").css("margin-bottom", "10px");
                $(this).after(comment_area);
                comment_area.focus = true;
                var submit_btn = $("<button>提交</button>").addClass("p-btn-sm right");
                submit_btn.click(add_second_comment);
                comment_area.after(submit_btn);
            });

        }

    });

}




//------------ 删除一级评论-----------

function deleteComment() {
    $(this).parent().parent().parent().parent().hide();
    var floor=$(this).parent().find(".x-floor").text();

    var x_comment_number=$(".x-comment-number");
     x_comment_number.text(x_comment_number.text()-1);

    $.ajax({
        type:"GET",
        url:"delete_comment.php?article_id="+article_id+"&floor="+floor,
        success:function (result) {
            if(result["if_success"]==0){
                window.alert(result["error_message"]);
            }
            else
            {
                alert("删除成功");
            }
        }
    });
}




function  returnToArticleList() {
    $("#articleLoop").show();
    $("#articleDetail").hide();
    $(this).hide();
    $("#write_article_button").show();

}




//---------删除一个楼中楼回复,实现局部刷新-------------
function deleteSecondComment() {
    var post_comment=$(this).parent().parent();

    var posts_list_item=post_comment.parent().parent().parent().parent();
    var floor=posts_list_item.find(".x-floor").text();

    var re_floor=post_comment.find(".x-re-floor").text();

    $.ajax({
       type:"GET",
        url:"delete_second_comment.php?article_id="+article_id+"&floor="+floor+"&re_floor="+re_floor,
        success:function (result) {
            if(result["if_success"]==1){
                post_comment.find(".x-re-floor").parent().parent().hide();
            }
            else{
                window.alert(result["err_message"]);
            }
        }
    });

}
//------回复层主-----------

function add_second_comment_tx() {
    var posts_list_item=$(this).parents(".posts-list-item");
    re_user_name='0';
    re_user_id='0';

    //以下为文本输入框
    var comment_area = $("<textarea placeholder='回复层主"+"'></textarea>").css("margin-bottom", "10px");
    var textBtnDiv=$("<div style='margin-bottom: 10px'></div>").addClass("text-btn-div");
    textBtnDiv.append(comment_area);
    textBtnDiv.append();
    var submit_btn = $("<button  style='margin-bottom: 5px;float: right'>提交</button>").addClass("p-btn-sm");
    submit_btn.click(add_second_comment);
    comment_area.after(submit_btn);
    posts_list_item.find(".post-comment-area-body").prepend(textBtnDiv);
    posts_list_item.find(".post-comments-area").show();

}

//------回复楼中楼出现输入框-----------

function add_second_comment_second_tx() {
    var post_comment_list_btm=$(this).parents(".posts-list-item-btm");
    re_user_id=post_comment_list_btm.find(".x-second-comment-id").text();
    // window.alert(re_user_id);

    re_user_name=post_comment_list_btm.find(".x-name").text();

    var comment_area = $("<textarea placeholder='回复"+re_user_name+"'></textarea>").css("margin-bottom", "10px");
    // comment_area.focus = true;

    var textBtnDiv=$("<div style='margin-bottom: 10px'></div>").addClass("text-btn-div");
    textBtnDiv.append(comment_area);
    textBtnDiv.append();


    var submit_btn = $("<button  style='margin-bottom: 5px;float: right'>提交</button>").addClass("p-btn-sm");
    submit_btn.click(add_second_comment);
    comment_area.after(submit_btn);

    post_comment_list_btm.parent().after(textBtnDiv);

}

//-----------插入二级回复-----------
function add_second_comment() {
    var post_comments_area=$(this).parents(".post-comments-area");
    var content=post_comments_area.find("textarea").val();
    if(content==""){
        window.alert("回复内容不能为空");
        return;
    }
    // alert(content);
    var posts_list_item=post_comments_area.parent();
    var floor=posts_list_item.find(".x-floor").text();

   var current_time=getNowFormatDate();//get the time

    // $(this).prev().val("");//还原输入框中内容

    $.ajax({
        url:"add_second_comment.php?article_id="+article_id+"&id="+user_id+"&time="+current_time+"&content="+content+"&floor="+floor+"&re_id="+re_user_id,
        success:function (result) {
            if(result["if_success"]==1){
                var post_comment_area_body=post_comments_area.find(".post-comment-area-body");
                var tmp = post_comment_area_body.children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".x-name").html(user_name);
                tmp.find(".x-content").html(content);
                if(re_user_name!="0") {//有回复人
                    tmp.find(".x-re-name").html(re_user_name);
                }
                else {
                    tmp.find(".x-response").html("");
                }

                tmp.find(".x-time").html(current_time);
                tmp.find(".x-delete").click(deleteSecondComment);
                tmp.find(".post-comment-btn").click(add_second_comment_second_tx);
                post_comment_area_body.append(tmp);
                post_comment_area_body.find(".text-btn-div").remove();
            }
            else{
                window.alert(result["err_message"]);
            }
        }

    });

}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}



//---------插入一级回复------------

function  add_comment() {
    var content=ue_add_comment.getContent();
    if(content==""){
        window.alert("回复内容不能为空");
        return;
    }
    // alert(content);
    var current_time=getNowFormatDate();
    // alert(current_time);

    $.ajax({
       type:"GET",
        url:"add_comment.php?article_id="+article_id+"&id="+user_id+"&time="+current_time+"&content="+content,
        success:function (result) {
            if(result["if_success"]==1){
                var posts_list_ul=$(".posts-list-ul");
                var tmp = posts_list_ul.children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".x-name").html(user_name);
                tmp.find(".x-time").html(current_time);
                tmp.find(".x-content").html(content);
                tmp.find(".x-comment").click(add_second_comment_tx);
                tmp.find(".post-comments-area").hide();
                tmp.find(".glyphicon").click(deleteComment);
                posts_list_ul.append(tmp);

                var x_commment_number=$(".x-comment-number");
                x_commment_number.html(parseInt(x_commment_number.text())+1);//一级评论数+1;
                ue_add_comment.setContent("");//清除内容
            }
            else{
                window.alert(result["err_message"]);
            }

        }

    });

}
function search_article(obj) {
    var needed_title=obj.previousSibling.value;
    articleUpdate(needed_title);
}
