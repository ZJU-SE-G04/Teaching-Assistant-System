


//-------一些全局变量---------



//-------
$(document).ready(function() {
    $("#message").addClass("active");
    $(".content-blk.message").show();

    $(".order-nav").click(function () {
        $(".order-nav.active").removeClass("active");
        $(this).addClass("active");
        $(".content-blk").hide();
        var s = $(this).attr("id");
        $("." + s).show();
    });

    $("#articleBack").click(articleUpdate);
});

//////////////////////////////////////////////////////-------show an article list--------


function  articleUpdate() {
    $("#articleDetail").hide();
    $("#write_article").hide();
    $("#articleLoop").show();
    $("#update_article").hide();
    $("#write_article_button").show();
    $.ajax({
        type:"GET",
        url:"show_article_list.php?lesson_id="+course_id,
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


//------------show input for writing a article

function  showWriteArticle() {
    $("#articleLoop").hide();
    $("#write_article_button").hide();
    $("#write_article").show();
    
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
        type:"GET",
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


////////////////////////////-------show article details and comments(first)

function articleShow() {

    var articleDetail_local=$("#articleDetail");
    articleDetail_local.show();
    $("#articleLoop").hide();
    $("#write_article_button").hide();

    var parent=$(this).parent();
    article_id=parent.find(".x-article-id").text();

    $.ajax({
        type:"GET",
        url:"show_article_detail.php?article_id="+article_id,
        success:function (result) {
            var articleDetail=result;

            var title=parent.find(".x-title").text();
            var author=parent.find(".x-author").text();
            var time=parent.find(".x-time").text();


            articleDetail_local.find(".x-title").html(title);
            articleDetail_local.find(".x-author").html(author);
            articleDetail_local.find(".x-edit").attr("onclick","updateArticle("+article_id+")");
            articleDetail_local.find(".x-trash").attr("onclick","deleteArticle("+article_id+")");
            articleDetail_local.find(".x-time").html(time);
            articleDetail_local.find(".x-body").html(articleDetail["article_content"]);


            var post_detail_page=articleDetail_local.find("#post_detail_page");
            post_detail_page.find(".x-comment-number").text(articleDetail["comment_number"]);


            var posts_list_ul=post_detail_page.find(".posts-list-ul");
            posts_list_ul.children(".new").remove();
            for (var i in articleDetail["comment"]) {
                var x = articleDetail["comment"][i];
                var tmp = posts_list_ul.children(".old").clone().removeClass("old").addClass("new").show();


                tmp.find(".x-floor").html(x.floor);
                tmp.find(".x-name").html(x.user_name);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-content").html(x.content);
                tmp.find(".x-comment").click(showSecondComment);
                tmp.find(".post-comments-area").hide();

                if(user_id!=x.id){
                    tmp.find(".x-first-delete").hide();
                }
                else {
                    tmp.find(".glyphicon").click(deleteComment);
                }
                posts_list_ul.append(tmp);
            }


        }
    });

    $("#articleBack").attr("onclick","returnToArticleList()");

}





//------------ 删除一级评论

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
    $("#write_article_button").show();

}



//-------显示二级评论--------

function showSecondComment() {
    var floor=$(this).parent().find(".x-floor").text();
    var posts_list_item=$(this).parent().parent().parent().parent();//....


    $.ajax({
        type:"GET",
        url:"show_second_comment.php?article_id="+article_id+"&floor="+floor,
        success:function (result) {
            var secondComment=result;

            var post_comment_area_body=posts_list_item.find(".post-comment-area-body");
            for (var i in secondComment["second_comment"]) {
                var tmp = post_comment_area_body.children(".old").clone().removeClass("old").addClass("new").show();
                var x=secondComment["second_comment"][i];

                tmp.find(".x-name").html(x.user_name);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-content").html(x.content);
                tmp.find(".x-re-floor").html(x.re_floor);
                if(x.re_user_name!="NULL") {
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
            posts_list_item.find(".post-comments-area").show();

            $(".add-post-comment").click(function () {
                $(this).hide();
                var comment_area = $("<textarea placeholder='发表评论...'></textarea>").css("margin-bottom", "10px");
                $(this).after(comment_area);
                comment_area.focus = true;
                var submit_btn = $("<button>提交</button>").addClass("p-btn-sm right");
                // submit_btn.attr("onclick","add_second_comment("+article_id+","+floor+")");
                comment_area.after(submit_btn);
            });

        }

    });


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

//-----------插入二级回复-----------
function add_second_comment(article_id,floor) {

}
