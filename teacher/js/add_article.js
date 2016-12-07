


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

/*
 var articleRecords = "";
 */
// function articleUpdate() {
//     $("#articleDetail").hide();
//     $("#articleLoop").show();
//     /*
//      $.get("getArticleList.php", function (data) {
//      articleRecords = JSON.parse(data);
//      })
//      */
//     $("#articleLoop").children(".new").remove();
//     for (var i in articleRecords) {
//         var x = articleRecords[i];
//         var tmp = $("#articleLoop").children(".old").clone().removeClass("old").addClass("new").show();
//         tmp.attr("id", x.article_id);
//         tmp.find(".x-title").html(x.title);
//         tmp.find(".x-contentDigest").html(x.articleDigest);
//         tmp.find(".x-time").html(x.time);
//         tmp.find(".x-commentNum").html(x.commentNum);
//         $("#articleLoop").append(tmp);
//     }
//     $("#articleLoop").find(".panel-heading").click(articleShow);  //all heading created
// }
// $("#article").click(articleUpdate);
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
            window.alert(result);
            var articleRecords=result;
            $("#articleLoop").children(".new").remove();
            for (var i in articleRecords) {
                var x = articleRecords[i];
                var tmp = $("#articleLoop").children(".old").clone().removeClass("old").addClass("new").show();
                tmp.attr("id", x.article_id);
                tmp.find(".x-trash").attr("onclick","deleteArticle("+x.article_id+")");
                tmp.find(".x-title").html(x.title);
                tmp.find(".x-contentDigest").html(x.short_content);
                tmp.find(".x-time").html(x.time);
                tmp.find(".x-commentNum").html(x.user_name);
                $("#articleLoop").append(tmp);
            }
            $("#articleLoop").find(".panel-heading").click(articleShow);  //all heading created
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
     window.alert(title);
    var content=ue_update.getContent();
    window.alert(content);
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
var articleDetail = {
    "article": {
        "title": "redis和memcache的区别",
        "author": "AlexandraStan",
        "time": "2016-11-09 09:45",
        "body": "性能方面：没有必要过多的关心性能，因为二者的性能都已经足够高了。由于Redis只使用单核，而Memcached可以使用多核，所以在比较上，平均每一个核上Redis在存储小数据时比Memcached性能更高。而在100k以上的数据中，Memcached性能要高于Redis，虽然Redis最近也在存储大数据的性能上进行优化，但是比起Memcached，还是稍有逊色。说了这么多，结论是，无论你使用哪一个，每秒处理请求的次数都不会成为瓶颈。（比如瓶颈可能会在网卡）内存使用效率：使用简单的key-value存储的话，Memcached的内存利用率更高，而如果Redis采用hash结构来做key-value存储，由于其组合式的压缩，其内存利用率会高于Memcached。当然，这和你的应用场景和数据特性有关。数据持久化：如果你对数据持久化和数据同步有所要求，那么推荐你选择Redis，因为这两个特性Memcached都不具备。即使你只是希望在升级或者重启系统后缓存数据不会丢失，选择Redis也是明智的。数据结构:当然，最后还得说到你的具体应用需求。Redis相比Memcached来说，拥有更多的数据结构和并支持更丰富的数据操作，通常在Memcached里，你需要将数据拿到客户端来进行类似的修改再set回去。这大大增加了网络IO的次数和数据体积。在Redis中，这些复杂的操作通常和一般的GET/SET一样高效。所以，如果你需要缓存能够支持更复杂的结构和操作，那么Redis会是不错的选择。网络IO模型方面：Memcached是多线程，分为监听线程、worker线程，引入锁，带来了性能损耗。Redis使用单线程的IO复用模型，将速度优势发挥到最大，也提供了较简单的计算功能 。内存管理方面：Memcached使用预分配的内存池的方式，带来一定程度的空间浪费 并且在内存仍然有很大空间时，新的数据也可能会被剔除，而Redis使用现场申请内存的方式来存储数据，不会剔除任何非临时数据 Redis更适合作为存储而不是cache 。数据的一致性方面：Memcached提供了cas命令来保证.而Redis提供了事务的功能，可以保证一串 命令的原子性，中间不会被任何操作打断 。如果简单地比较Redis与Memcached的区别，大多数都会得到以下观点： 1 、Redis不仅仅支持简单的k/v类型的数据，同时还提供list，set，zset，hash等数据结构的存储。 2 、Redis支持数据的备份，即master-slave模式的数据备份。 3 、Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。 4、Redis可以实现主从复制，实现故障恢复。 5、Redis的Sharding技术： 很容易将数据分布到多个Redis实例中。"
    },
    "comment": [
        {
            "article_id": 234234,
            "floor": 12,
            "re_floor": 5,
            "floorMaster": "小明",
            "time": "2016-11-10 18:03",
            "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。"
        },
        {
            "article_id": 234234,
            "floor": 11,
            "re_floor": 0,
            "floorMaster": "小明",
            "time": "2016-10-14 18:43",
            "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。"
        },
        {
            "article_id": 234234,
            "floor": 7,
            "re_floor": 3,
            "floorMaster": "小明",
            "time": "2016-9-14 18:43",
            "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。"
        },
        {
            "article_id": 234234,
            "floor": 1,
            "re_floor": 0,
            "floorMaster": "小明",
            "time": "2016-5-10 9:33",
            "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。"
        },
    ]
}
/*
 var articleDetail = "";
 */
function articleShow() {
    $("#articleLoop").hide();
    $("#articleDetail").show();
    $("#write_article_button").hide();

    var id = $(this).parent().attr("id");
    article_id=id;
    /*
     $.get("getArticleDetail.php?article_id="+id, function (data) {
     articleDetail = JSON.parse(data);
     })
     */
    $("#articleDetail").find(".x-title").html(articleDetail["article"]["title"]);
    $("#articleDetail").find(".x-author").html(articleDetail["article"]["author"]);
    $("#articleDetail").find(".x-edit").attr("onclick","updateArticle("+id+")");
    $("#articleDetail").find(".x-trash").attr("onclick","deleteArticle("+id+")");
    $("#articleDetail").find(".x-time").html(articleDetail["article"]["time"]);
    $("#articleDetail").find(".x-body").html(articleDetail["article"]["body"]);


    $("#commentLoop").children(".new").remove();
    for (var i in articleDetail["comment"]) {
        var x = articleDetail["comment"][i];
        var tmp = $("#commentLoop").children(".old").clone().removeClass("old").addClass("new").show();

        if (x.re_floor == 0)
            tmp.find(".is-reply").hide();
        tmp.find(".x-floor").html(x.floor);
        tmp.find(".x-floorMaster").html(x.floorMaster);
        tmp.find(".x-re_floor").html(x.re_floor);
        tmp.find(".x-time").html(x.time);
        var queryStr = "article_id="+x.article_id+"&floor="+x.floor;
        tmp.find(".glyphicon-trash").attr("id", queryStr);
        tmp.find(".x-content").html(x.content);
        $("#commentLoop").append(tmp);
    } 
    $("#commentLoop").find(".glyphicon-trash").click(deleteComment);
    $("#articleBack").attr("onclick","returnToArticleList()");


}

function deleteComment() {
    var ids = $(this).attr("id");
    $.get("deleteArticleComment.php?"+ids);
    $(this).parents(".panel").slideUp(function () { $(this).remove() });
}




function  returnToArticleList() {
    $("#articleLoop").show();
    $("#articleDetail").hide();
    $("#write_article_button").show();

}


