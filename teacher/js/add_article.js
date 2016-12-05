/**
 * Created by achao_zju on 15/11/2016.
 */





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
// //////////////////////////////////////////////////////

//////////////////////////////////////////////////////
var articleRecords = [
    {
        "article_id": 123456789,
        "title": "Java之JDK环境配置过程（图）",
        "articleDigest": "1、在Windows7操作系统下，右键，点击属性，会出现如下界面 2、选择“高级系统设置”，如下 3、接着点击“环境变量”按钮，会出现如下图： 4、找到系统变量，点击“新建”按钮，这时会弹出一个窗口，分别在变量名和变量值框中填入：JAVA_HOME和JDK的路径C:\Program Files\Java\jdk1.7.0_05，点击“确定”；... ",
        "time": "2013-06-29 00:35",
        "user_name": "7"
    },
    {
        "article_id": 223456789,
        "title": "Java之JDK环境配置过程（图）",
        "articleDigest": "1、在Windows7操作系统下，右键，点击属性，会出现如下界面 2、选择“高级系统设置”，如下 3、接着点击“环境变量”按钮，会出现如下图： 4、找到系统变量，点击“新建”按钮，这时会弹出一个窗口，分别在变量名和变量值框中填入：JAVA_HOME和JDK的路径C:\Program Files\Java\jdk1.7.0_05，点击“确定”；... ",
        "time": "2013-06-22 12:31",
        "user_name": "12"
    },
    {
        "article_id": 323456789,
        "title": "Java之JDK环境配置过程（图）",
        "articleDigest": "1、在Windows7操作系统下，右键，点击属性，会出现如下界面 2、选择“高级系统设置”，如下 3、接着点击“环境变量”按钮，会出现如下图： 4、找到系统变量，点击“新建”按钮，这时会弹出一个窗口，分别在变量名和变量值框中填入：JAVA_HOME和JDK的路径C:\Program Files\Java\jdk1.7.0_05，点击“确定”；... ",
        "time": "2013-06-09 10:12",
        "user_name": "8"
    },
];
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
    document.getElementById("articleDetail").style.display="none";
    document.getElementById("write_article").style.display="none";
    // $.ajax({
    //     type:"GET",
    //     url:"show_article_list.php?lesson_id="+class_id,
    //     success:function (result) {
    //         var jsonObj=result;
    //         $("#articleLoop").children(".new").remove();
    //
    //
    //
    //
    //     }
    //
    //
    //
    //
    // });


    $("#articleLoop").children(".new").remove();
    for (var i in articleRecords) {
        var x = articleRecords[i];
        var tmp = $("#articleLoop").children(".old").clone().removeClass("old").addClass("new").show();
        tmp.attr("id", x.article_id);
        tmp.find(".x-title").html(x.title);
        tmp.find(".x-contentDigest").html(x.articleDigest);
        tmp.find(".x-time").html(x.time);
        tmp.find(".x-commentNum").html(x.user_name);
        $("#articleLoop").append(tmp);
     }

}


//------------show input for writing a article

function  showWriteArticle() {
    document.getElementById("articleLoop").style.display="none";
    document.getElementById("write_article_button").style.display="none";
    document.getElementById("write_article").style.display="block";
    
}




//-------------- write an article-----------


function  writeArticle() {
    var title=document.getElementById("article_title").value;
    var content=ue.getContent();
    var datetime=new Date().toLocaleString();
    // window.alert(datetime);
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


function  deleteArticle() {
    // var article_id=douc

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

    var id = $(this).parent().attr("id");
    /*
     $.get("getArticleDetail.php?article_id="+id, function (data) {
     articleDetail = JSON.parse(data);
     })
     */
    $("#articleDetail").find(".x-title").html(articleDetail["article"]["title"]);
    $("#articleDetail").find(".x-author").html(articleDetail["article"]["author"]);
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
}

function deleteComment() {
    var ids = $(this).attr("id");
    $.get("deleteArticleComment.php?"+ids);
    $(this).parents(".panel").slideUp(function () { $(this).remove() });
}

$("#articleBack").click(articleUpdate);


//----------------------
function  returnToArticleList() {

    var articleList=document.getElementById("articleList");
    if(articleList.style.display=="none") {
        articleList.style.display = "inline";
        var articleDetails = document.getElementById("articleDetails");
        var parent = document.getElementById("article");
        var x=parent.removeChild(articleDetails);
    }

}


//
// function showArticleDetails(){
//
//     var returnButton=document.createElement("button");
//     returnButton.className="btn btn-primary";
//     returnButton.innerHTML="返回文章列表";
//     returnButton.onclick=returnToArticleList;
//
//     var articleDetails=document.createElement("div");
//     articleDetails.id="articleDetails";
//     var parent=document.getElementById("article");
//     parent.appendChild(articleDetails);
//
//     var title="热烈庆祝长者90大寿！";
//     var author="膜法师";
//     var time="2016-11-9";
//     var content="浙江大学（Zhejiang University），简称“浙大”，坐落于“人间天堂”杭州。前身是1897年创建的求是书院，是中国人自己最早创办的现代高等学府之一。1928年更名为国立浙江大学。中华民国时期，浙江大学在竺可桢老校长的带领下，崛起为民国最高学府之一，被英国学者李约瑟誉为“东方剑桥”，迎来了浙大百年历史当中最辉煌的时期。竺可桢老校长也因其历史贡献，成为了浙大校史上最伟大的人，并为浙大确立了“求是”校训和文言文《浙江大学校歌》。" +
//         "浙江大学直属于中华人民共和国教育部，是中国首批7所“211工程”、首批9所“985工程”重点建设的全国重点大学之一，是九校联盟、中国大学校长联谊会、世界大学联盟、环太平洋大学联盟的成员，是教育部“卓越医生教育培养计划”、“卓越农林人才教育培养计划”改革试点高校，是中国著名顶尖学府之一，也是中国学科最齐全、学生创业率最高的大学。[1-2]" +
//         "截至2016年6月，浙江大学拥有紫金港、玉泉、西溪、华家池、之江、舟山、海宁等7个校区，占地面积7平方公里，[3]  校舍总建筑面积2047856平方米；图书馆藏书683万余册，并有7家附属医院；国家重点一级学科14个，国家重点二级学科21个；一级学科博士学位授权点54个，二级学科博士学位授权点277个，博士后科研流动站52个；本科专业127个，全日制在校学生47000余人，其中硕士研究生16090人，博士研究生10463；留学生5800余人，其中学位生3000余人。[3] ";
//
//     var childArticle=document.createElement("div");
//     articleDetails.appendChild(returnButton);
//     articleDetails.appendChild(childArticle);
//     childArticle.style.marginTop="10px";
//     childArticle.className="panel panel-default";
//     childArticle.innerHTML="<div class='panel-heading'> "+
//     "<div class='row'> <div class='col-sm-9'>"+title+ "</div> <div class='col-sm-1'>"+author+" </div> " +
//     "<div class='col-sm-2'>"+time+"</div> </div> " +
//     "</div> <div class='panel-body'>"+content +"</div>";
//
//     // var commentHead=document.createElement("h3");
//     // commentHead.innerHTML="评论";
//     // articleDetails.appendChild(commentHead);
//
//     // var commentHead=document.createElement("span");
//     // commentHead.className="left f-discuss-header";
//     // commentHead.innerHTML="讨论区";
//     // articleDetails.appendChild(commentHead);
//     //
//     // var hr=document.createElement("hr");
//     // articleDetails.appendChild(hr);
//
//
//     var articleList=document.getElementById("articleList");
//     articleList.style.display="none";
//
//     var response=document.createElement("div");
//     articleDetails.appendChild(response);
//     response.className="response-container";
//     response.innerHTML=" <ul style='padding-left: 0px'> " +
//     "<li class='response-list'> " +
//     "<div class='response-list-main'> " +
//         "<div class='response-list-nick'>章世超</div> " +
//         "<div class='response-list-content'>Good Article</div> " +
//         "<div class='col-sm-10'><div class='response-list-btm'>时间: 2016-11-09 19:40</div></div> " +
//         "<div class='col-sm-2'> <div class='response-huifu' onclick='showReResponse()'>回复</div></div> "+
//     "</div></li> <li class='response-list'> " +
//         "<div class='response-list-main'> " +
//         "<div class='response-list-nick'>游客10000</div> " +
//         "<div class='response-list-content'>Fuck</div> " +
//         "<div class='row'> " +
//         "<div class='col-sm-10'><div class='response-list-btm'>时间: 2016-11-09 19:40</div></div> " +
//         "<div class='col-sm-2'> <div class='response-huifu' onclick='showReResponse()'>收起回复</div></div> " +
//         "<div class='re-response-wrapper'> " +
//         "<div class='re-response-list'><ul class='re-response-ul'> " +
//         "<li class='re-response-li'> " +
//         "<span class='re-response-user-name'>Ling&nbsp;</span><span>回复</span><span class='re-response-user-name'>Xu</span><span>:&nbsp;&nbsp;苟利国家生死以，岂因祸福避趋之。苟利国家生死以，岂因祸福避趋之。苟利国家生死以，岂因祸福避趋之。苟利国家生死以，岂因祸福避趋之。苟利国家生死以，岂因祸福避趋之。苟利国家生死以，岂因祸福避趋之。苟利国家生死以，岂因祸福避趋之。</span> " +
//         "<div class='re-response-huifu-time'> " +
//         "<span class='re-response-time'>2015-12-13 10：35&nbsp;&nbsp;&nbsp;</span><span class='re-response-huifu'>回复</span> " +
//         "</div> " +
//         "</li> " +
//         "<li class='re-response-li'><span class='re-response-user-name'>Ling</span><span>:&nbsp;&nbsp;My God</span> " +
//         "<div class='re-response-huifu-time'> " +
//         "<span class='re-response-time'>2015-12-13 10：35&nbsp;&nbsp;&nbsp;</span><span class='re-response-huifu'>回复</span> " +
//         "</div> " +
//         "</li> " +
//         "<li class='re-response-li'> " +
//         "<button class='btn btn-xs btn-default' style='float: right;margin-bottom: 5px'>我也说一句</button> " +
//         "<textarea class='re-response-textarea'></textarea> " +
//         "<button class='btn btn-xs btn-primary' style='float: right'>发表</button> " +
//         "</li> </ul> </div> </div> </div> </div> </li> " +
//         "<li class='response-list'> " +
//         "<div class='response-list-main'> " +
//         "<div class='response-list-nick'>章世超</div> " +
//         "<div class='response-list-content'>Good Article</div> " +
//         "<div class='col-sm-10'><div class='response-list-btm'>时间: 2016-11-09 19:40</div></div> " +
//         "<div class='col-sm-2'> <div class='response-huifu' onclick='showReResponse()'>回复</div></div> "+
//     "</div></li></ul>";
//
//
//
//
//
//
// }
//

function beRed() {
    var articleTitle=document.getElementById("articleTitle");
    articleTitle.style.color="#03a9f4";

}

function beBlack() {
    var articleTitle=document.getElementById("articleTitle");
    articleTitle.style.color="#000000";
}


// 显示二级回复列表

function showReResponse() {
    var jsonObj= [{
        "user_name": "游客10068",
        "re_user_name": "NULL",
        "content": "For one second.",
        "re_floor": "1"
    }, {
        "user_name": "阿超",
        "re_user_name": "游客10068",
        "content": "你是世界之王",
        "re_floor": "2"
    }];

    var parent=document.getElementById("response_time_button");
    var child=document.createElement("div");
    child.className="re-response-wrapper";

    var grandchild=document.createElement("div");
    grandchild.className="re-response-list";
    child.appendChild(grandchild);
    

    var ggrandchild;
    for(var i=0;i<jsonObj.length;i++){
        ggrandchild=document.createElement("li");
        var user_name=jsonObj[i].user_name;
        var re_user_name=jsonObj[i].re_user_name;
        var content=jsonObj[i].content;
        ggrandchild.className="re-response-li"
        ggrandchild.innerHTML="<span>"+user_name+"</span> <span>回复</span>" +
            "<span>"
        if(re_user_name!="NULL") {
            ggrandchild.innerHTML+=re_user_name + "</span><span>:&nbsp;&nbsp;" + content + "</span>";
        }
        else{
            ggrandchild.innerHTML+=re_user_name + "</span><span>:&nbsp;&nbsp;" + content + "</span>";

        }

        grandchild.appendChild(ggrandchild);


    }

    parent.appendChild(child);
}


