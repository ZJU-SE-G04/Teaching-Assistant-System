


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

//////////////////////////////////////////////////////


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
                tmp.attr("id", x.article_id);
                if(x.id==user_id) {
                    tmp.find(".x-trash").attr("onclick", "deleteArticle(" + x.article_id + ")");
                }
                else {
                    tmp.find(".x-trash").hide()
                }
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

function cancelUpdateArticle(article_id) {
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


////////////////////////////
// var articleDetail = {
//     "article_content":"性能方面：没有必要过多的关心性能，因为二者的性能都已经足够高了。由于Redis只使用单核，而Memcached可以使用多核，所以在比较上，平均每一个核上Redis在存储小数据时比Memcached性能更高。而在100k以上的数据中，Memcached性能要高于Redis，虽然Redis最近也在存储大数据的性能上进行优化，但是比起Memcached，还是稍有逊色。说了这么多，结论是，无论你使用哪一个，每秒处理请求的次数都不会成为瓶颈。（比如瓶颈可能会在网卡）内存使用效率：使用简单的key-value存储的话，Memcached的内存利用率更高，而如果Redis采用hash结构来做key-value存储，由于其组合式的压缩，其内存利用率会高于Memcached。当然，这和你的应用场景和数据特性有关。数据持久化：如果你对数据持久化和数据同步有所要求，那么推荐你选择Redis，因为这两个特性Memcached都不具备。即使你只是希望在升级或者重启系统后缓存数据不会丢失，选择Redis也是明智的。数据结构:当然，最后还得说到你的具体应用需求。Redis相比Memcached来说，拥有更多的数据结构和并支持更丰富的数据操作，通常在Memcached里，你需要将数据拿到客户端来进行类似的修改再set回去。这大大增加了网络IO的次数和数据体积。在Redis中，这些复杂的操作通常和一般的GET/SET一样高效。所以，如果你需要缓存能够支持更复杂的结构和操作，那么Redis会是不错的选择。网络IO模型方面：Memcached是多线程，分为监听线程、worker线程，引入锁，带来了性能损耗。Redis使用单线程的IO复用模型，将速度优势发挥到最大，也提供了较简单的计算功能 。内存管理方面：Memcached使用预分配的内存池的方式，带来一定程度的空间浪费 并且在内存仍然有很大空间时，新的数据也可能会被剔除，而Redis使用现场申请内存的方式来存储数据，不会剔除任何非临时数据 Redis更适合作为存储而不是cache 。数据的一致性方面：Memcached提供了cas命令来保证.而Redis提供了事务的功能，可以保证一串 命令的原子性，中间不会被任何操作打断 。如果简单地比较Redis与Memcached的区别，大多数都会得到以下观点： 1 、Redis不仅仅支持简单的k/v类型的数据，同时还提供list，set，zset，hash等数据结构的存储。 2 、Redis支持数据的备份，即master-slave模式的数据备份。 3 、Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。 4、Redis可以实现主从复制，实现故障恢复。 5、Redis的Sharding技术： 很容易将数据分布到多个Redis实例中。"
//     ,
//     "comment_number":33,
//     "comment": [
//         {
//             "id": "111111",
//             "floor": 1,
//             "user_name": "小明",
//             "time": "2016-11-10 18:03",
//             "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。"
//         },
//         {
//             "id": "3140001112",
//             "floor": 2,
//             "user_name": "神",
//             "time": "2016-11-10 18:03",
//             "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。"
//         },
//         {
//             "id": "3140001113",
//             "floor": 3,
//             "user_name": "长者",
//             "time": "2016-9-14 18:43",
//             "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。"
//         }
//     ]
// };

function articleShow() {

    var articleDetail_local=$("#articleDetail");
    articleDetail_local.show();
    $("#articleLoop").hide();
    $("#write_article_button").hide();

    var parent=$(this).parent();
    var id =parent.attr("id");

    var article_id=id;
    
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
            articleDetail_local.find(".x-edit").attr("onclick","updateArticle("+id+")");
            articleDetail_local.find(".x-trash").attr("onclick","deleteArticle("+id+")");
            articleDetail_local.find(".x-time").html(time);
            articleDetail_local.find(".x-body").html(articleDetail["article_content"]);


            var post_detail_page=articleDetail_local.find("#post_detail_page");
            post_detail_page.find(".x-comment-number").text(articleDetail["comment_number"]);


            var posts_list_ul=post_detail_page.find(".posts-list-ul");
            posts_list_ul.children(".new").remove();
            for (var i in articleDetail["comment"]) {
                var x = articleDetail["comment"][i];
                var tmp = posts_list_ul.children(".old").clone().removeClass("old").addClass("new").show();

                // if (x.re_floor == 0)
                //     tmp.find(".is-reply").hide();
                tmp.find(".x-floor").html(x.floor);
                tmp.find(".x-name").html(x.user_name);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-content").html(x.content);
                tmp.find(".x-comment").attr("onclick","showSecondComment("+article_id+","+x.floor+")");
                tmp.find(".post-comments-area").hide();
                tmp.attr("id","floor"+x.floor);

                if(user_id!=x.id){
                    tmp.find(".x-first-delete").hide();
                }
                else {
                    tmp.find(".glyphicon").attr("onclick", "deleteComment(" + article_id + "," + x.floor + ")");
                }
                posts_list_ul.append(tmp);
            }


        }
    });

    $("#articleBack").attr("onclick","returnToArticleList()");

}





//------------ 删除一级评论

function deleteComment(article_id,floor) {
    $(".posts-list-ul").find("#floor"+floor).hide();
    
    $.ajax({
        type:"GET",
        url:"delete_comment.php?article_id="+article_id+"&floor="+floor,
        success:function (result) {
            if(result["if_success"]==0){
                window.alert(result["error_message"]);
            }
        }
    });

}




function  returnToArticleList() {
    $("#articleLoop").show();
    $("#articleDetail").hide();
    $("#write_article_button").show();

}

// var secondComment={
//     "second_comment_number":13,
//     "second_comment":[{
//     "time": "2016-11-10 18:03",
//     "id":"3140100000",
//     "user_name":"蒋中正",
//     "re_id":"3149998888",
//     "re_user_name":"阎锡山",
//     "content":"中原大战",
//         "re_floor":1
// },
//     {
//         "time": "2016-11-10 18:06",
//         "id":"111111",
//         "user_name":"蒋中正",
//         "re_id":"3149998888",
//         "re_user_name":"阎锡山",
//         "content":"中原大战",
//         "re_floor":2
//
//     },
//     {
//         "time": "2016-11-10 18:06",
//         "id":"3140005555",
//         "user_name":"蒋中正",
//         "re_id":"NULL",
//         "re_user_name":"NULL",
//         "content":"中原大战",
//         "re_floor":3
//     }
// ]
// };
//




function showSecondComment(article_id,floor) {
    
    $.ajax({
        type:"GET",
        url:"show_second_comment.php?article_id="+article_id+"&floor="+floor,
        success:function (result) {
            var secondComment=result;

            var posts_list_item=$(".posts-list-ul").find("#floor"+floor);
            var post_comment_area_body=posts_list_item.find(".post-comment-area-body");
            for (var i in secondComment["second_comment"]) {
                var tmp = post_comment_area_body.children(".old").clone().removeClass("old").addClass("new").show();
                var x=secondComment["second_comment"][i];

                tmp.find(".x-name").html(x.user_name);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-content").html(x.content);
                tmp.attr("id","floor"+floor+"re_floor"+x.re_floor);
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
                    tmp.find(".x-delete").attr("onclick","deleteSecondComment("+article_id+","+floor+","+x.re_floor+")");
                }
                post_comment_area_body.append(tmp);


            }
            posts_list_item.find(".post-comments-area").show();


        }

    });

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

//---------删除一个楼中楼回复,实现局部刷新-------------
function deleteSecondComment(article_id,floor,re_floor) {
    $(".posts-list-ul").find("#floor"+floor).find("#floor"+floor+"re_floor"+re_floor).hide();

    $.ajax({
       type:"GET",
        url:"delete_second_comment.php?article_id="+article_id+"&floor="+floor+"&re_floor="+re_floor,
        success:function (result) {
            if(result["if_success"]==1){
                $(".posts-list-ul").find("#floor"+floor).find("#floor"+floor+"re_floor"+re_floor).hide();
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
