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
    var messageRecords = [
        {
            "message_id": 32415312,
            "name": "小明ss",
            "time": "2016-11-13 15:38",
            "content": "基本信息ENG是Electronic News Gathering的缩写，字面意思是电子，新闻，采集。 ENG定义： ENG：电子新闻采集。是使用便携式的摄像，录像设备来采集电视新闻。ENG方式非常适合于现场拍摄，但它所获取的素材还需要在电子编辑设备上进行剪辑，分为前期拍摄和后期编辑两个阶段。",
            "read": false
        },
        {
            "message_id": 234245434,
            "name": "小明aa",
            "time": "2016-11-11 12:11",
            "content": "基本信息ENG是Electronic News Gathering的缩写，字面意思是电子，新闻，采集。 ENG定义： ENG：电子新闻采集。是使用便携式的摄像，录像设备来采集电视新闻。ENG方式非常适合于现场拍摄，但它所获取的素材还需要在电子编辑设备上进行剪辑，分为前期拍摄和后期编辑两个阶段。",
            "read": true
        },
        {
            "message_id": 324245234,
            "name": "小明kk",
            "time": "2016-11-10 9:55",
            "content": "基本信息ENG是Electronic News Gathering的缩写，字面意思是电子，新闻，采集。 ENG定义： ENG：电子新闻采集。是使用便携式的摄像，录像设备来采集电视新闻。ENG方式非常适合于现场拍摄，但它所获取的素材还需要在电子编辑设备上进行剪辑，分为前期拍摄和后期编辑两个阶段。",
            "read": true
        },
    ];
    /*
    var messageRecords = "";
    */
    function messageUpdate() {
         /*
         $.get("getMessageList.php", function (data) {
            messageRecords = JSON.parse(data);
         });
        */
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
    messageUpdate();
    $("#message").click(messageUpdate);

    function deleteMessage() {
        var message_id = $(this).attr("id");
        $.get("deleteMessage.php?id="+message_id);
        $(this).parents(".panel").slideUp(function () { $(this).remove() });
    }


//article//////////////////////////////////////////////////////////////////////////////////////////////////
    var articleRecords = [
        {
            "articleId": 123456789,
            "title": "Java之JDK环境配置过程（图）",
            "articleDigest": "1、在Windows7操作系统下，右键，点击属性，会出现如下界面 2、选择“高级系统设置”，如下 3、接着点击“环境变量”按钮，会出现如下图： 4、找到系统变量，点击“新建”按钮，这时会弹出一个窗口，分别在变量名和变量值框中填入：JAVA_HOME和JDK的路径C:\Program Files\Java\jdk1.7.0_05，点击“确定”；... ",
            "time": "2013-06-29 00:35",
            "commentCnt": 7
        },
        {
            "articleId": 223456789,
            "title": "Java之JDK环境配置过程（图）",
            "articleDigest": "1、在Windows7操作系统下，右键，点击属性，会出现如下界面 2、选择“高级系统设置”，如下 3、接着点击“环境变量”按钮，会出现如下图： 4、找到系统变量，点击“新建”按钮，这时会弹出一个窗口，分别在变量名和变量值框中填入：JAVA_HOME和JDK的路径C:\Program Files\Java\jdk1.7.0_05，点击“确定”；... ",
            "time": "2013-06-22 12:31",
            "commentCnt": 12
        },
        {
            "articleId": 323456789,
            "title": "Java之JDK环境配置过程（图）",
            "articleDigest": "1、在Windows7操作系统下，右键，点击属性，会出现如下界面 2、选择“高级系统设置”，如下 3、接着点击“环境变量”按钮，会出现如下图： 4、找到系统变量，点击“新建”按钮，这时会弹出一个窗口，分别在变量名和变量值框中填入：JAVA_HOME和JDK的路径C:\Program Files\Java\jdk1.7.0_05，点击“确定”；... ",
            "time": "2013-06-09 10:12",
            "commentCnt": 97
        },
    ];
    /*
    var articleRecords = "";
    */
    function articleUpdate() {
        $("#articleDetail").hide();
        $("#articleLoop").show();
        /*
        $.get("getArticleList.php", function (data) {
            articleRecords = JSON.parse(data);
        })
        */
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
    }
    $("#article").click(articleUpdate);

//////////////////////////////
    var articleDetail = {
        "articleId": 1594234,
        "title": "redis和memcache的区别",
        "author": "AlexandraStan",
        "time": "2016-11-09 09:45",
        "body": "性能方面：没有必要过多的关心性能，因为二者的性能都已经足够高了。由于Redis只使用单核，而Memcached可以使用多核，所以在比较上，平均每一个核上Redis在存储小数据时比Memcached性能更高。而在100k以上的数据中，Memcached性能要高于Redis，虽然Redis最近也在存储大数据的性能上进行优化，但是比起Memcached，还是稍有逊色。说了这么多，结论是，无论你使用哪一个，每秒处理请求的次数都不会成为瓶颈。（比如瓶颈可能会在网卡）内存使用效率：使用简单的key-value存储的话，Memcached的内存利用率更高，而如果Redis采用hash结构来做key-value存储，由于其组合式的压缩，其内存利用率会高于Memcached。当然，这和你的应用场景和数据特性有关。数据持久化：如果你对数据持久化和数据同步有所要求，那么推荐你选择Redis，因为这两个特性Memcached都不具备。即使你只是希望在升级或者重启系统后缓存数据不会丢失，选择Redis也是明智的。数据结构:当然，最后还得说到你的具体应用需求。Redis相比Memcached来说，拥有更多的数据结构和并支持更丰富的数据操作，通常在Memcached里，你需要将数据拿到客户端来进行类似的修改再set回去。这大大增加了网络IO的次数和数据体积。在Redis中，这些复杂的操作通常和一般的GET/SET一样高效。所以，如果你需要缓存能够支持更复杂的结构和操作，那么Redis会是不错的选择。网络IO模型方面：Memcached是多线程，分为监听线程、worker线程，引入锁，带来了性能损耗。Redis使用单线程的IO复用模型，将速度优势发挥到最大，也提供了较简单的计算功能 。内存管理方面：Memcached使用预分配的内存池的方式，带来一定程度的空间浪费 并且在内存仍然有很大空间时，新的数据也可能会被剔除，而Redis使用现场申请内存的方式来存储数据，不会剔除任何非临时数据 Redis更适合作为存储而不是cache 。数据的一致性方面：Memcached提供了cas命令来保证.而Redis提供了事务的功能，可以保证一串 命令的原子性，中间不会被任何操作打断 。如果简单地比较Redis与Memcached的区别，大多数都会得到以下观点： 1 、Redis不仅仅支持简单的k/v类型的数据，同时还提供list，set，zset，hash等数据结构的存储。 2 、Redis支持数据的备份，即master-slave模式的数据备份。 3 、Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。 4、Redis可以实现主从复制，实现故障恢复。 5、Redis的Sharding技术： 很容易将数据分布到多个Redis实例中。"
    }
    /*
    var articleDetail = "";
    */
    function articleShow(articleId, commentCnt) {
        $("#articleLoop").hide();
        $("#articleDetail").show();

        /*
        $.get("getArticleDetail.php?article_id="+articleId, function (data) {
            articleDetail = JSON.parse(data);
        })
        */

        $("#articleBack").click(articleUpdate);

        $("#articleDetail").find(".x-title").html(articleDetail.title);
        $("#articleDetail").find(".x-author").html(articleDetail.author);
        $("#articleDetail").find(".x-time").html(articleDetail.time);
        $("#articleDetail").find(".x-body").html(articleDetail.body);

        showComments(articleDetail.articleId, 1);

        var pageCnt = Math.ceil(commentCnt / 10);
        initialCommentPagination(articleId, pageCnt);
    }

    var pageComments = {
        "articleId": 4568715,
        "comments": [
            {
                "floor": 1,
                "reCommentCnt": 1,
                "floorMaster": "小明",
                "time": "2016-11-10 18:03",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reComments": [
                    {
                        "floor": 1,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    }
                ]
            },
            {
                "floor": 2,
                "reCommentCnt": 0,
                "floorMaster": "小明",
                "time": "2016-10-14 18:43",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reComments": []
            },
            {
                "floor": 3,
                "reCommentCnt": 1,
                "floorMaster": "小明",
                "time": "2016-9-14 18:43",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reComments": [
                    {
                        "floor": 1,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 2,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 3,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    }
                ]
            },
            {
                "floor": 4,
                "reCommentCnt": 3,
                "floorMaster": "小明",
                "time": "2016-5-10 9:33",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reComments": [
                    {
                        "floor": 1,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 2,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 3,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 4,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    }
                ]
            },
        ]
    };
    // var pageComments = "";
    function showComments(articleId, pageNum) {
        var postData = {
            "articleId": articleId,
            "pageNum": pageNum
        }
/*        $.post("getPageComments.php", postData, function (data) {
            pageComments = JSON.parse(data);
        });*/

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
        $.post("deleteArticleReComment.php", postData);
        $(this).parents(".well").slideUp(function () { $(this).remove() });
    }

/*    function initialCommentPagination(articleId, pageCnt) {
        var pagination = $("#articleDetail").find(".pagination");

        pagination.find(".new").remove();
        for (var i=1; i<=pageCnt; i++) {
            var tmp = pagination.find(".old").clone()
                .removeClass("old").addClass("new");
            tmp.children().html(i).click((function (i) {
                    return function () {
                        pagination.find(".active").removeClass("active");
                        $(this).parent().addClass("active");
                        pagination.find(".prevPage").removeClass("disabled");
                        pagination.find(".nextPage").removeClass("disabled");
                        showComments(articleId, i);
                    }
                })(i));
            pagination.find(".nextPage").before(tmp);
        }

        if (pageCnt <= 5) {
            pagination.find(".new").show();
        }
        else {
            pagination.find(".new").each(function (index) {
                if (index <= 3) {
                    $(this).click(function () {
                        pagination.find(".new:visible").hide();
                        for (var i=1; i<=5; i++)
                            pagination.find(".new:nth-of-type(i)").show();
                    })
                }
                else if (index >= pageCnt-2) {
                    $(this).click(function () {
                        pagination.find(".new:vidible").hide();
                        for (var i=pageCnt-4; i<=pageCnt; i++)
                            pagination.find(".new:nth-of-type(i)").show();
                    })
                }
                else {
                    $(this).click(function () {
                        pagination.find(".new:visible").hide();
                        for (var i=index-2; i<=index+2; i++)
                            pagination.find(".new:nth-of-type(i)").show();
                    })
                }
            })
        }

        pagination.find(".new:first-of-type").click(function () {
            pagination.find(".prevPage").addClass("disabled");
        });
        pagination.find(".new:last-of-type").click(function () {
            pagination.find(".nextPage").addClass("disabled");
        });
    }*/
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
    var topicRecords = [
        {
            "topicId": 12312431,
            "lesson": "软件工程管理",
            "kind": "答疑",
            "author": "小明",
            "time": "2014-08-22 20:14",
            "title": "关于计算最长的字符串长度，为什么s传不进去",
            "responseCnt": 13
        },
        {
            "topicId": 35112441,
            "lesson": "软件工程管理",
            "kind": "答疑",
            "author": "小明",
            "time": "2014-04-12 20:15",
            "title": "关于计算最长的字符串长度，为什么s传不进去",
            "responseCnt": 19
        },
        {
            "topicId": 55312431,
            "lesson": "软件工程管理",
            "kind": "答疑",
            "author": "小明",
            "time": "2014-03-22 10:34",
            "title": "关于计算最长的字符串长度，为什么s传不进去",
            "responseCnt": 53
        },
    ]
    /*
    var topicRecords = "";
    */
    function topicUpdate() {  //click tab, click topicback
        $("#topicDetail").hide();
        $("#topicLoop").show();

        /*
        $.get("getTopicList.php", function (data) {
            topicRecords = JSON.parse(data);
        })
        */

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
    }
    $("#topic").click(topicUpdate);

//////////////////////////////
    var topicDetail = {
        "title": "Vim cryptmethod uses SHA-256 for password-based key derivation",
        "author": "atopuncw",
        "content": "On L421-L423 of src/blowfish.c, a sha256_key() function is created for password-based key derivation with a salt for blowfish. Unfortunately, even with 1,000 rounds, SHA-256 is designed to be fast, and can be parallelized with GPUs when brute forcing a file. Instead, the Blowfish key should be derived using bcrypt or scrypt. Both defeat parallelization on GPUs, and scrypt further defeats FPGAs.",
        "lesson": "软件需求工程",
        "kind": "答疑",
        "time": "2014-03-22 10:34",
    }

    /*
    var topicDetail = {};
    */

    function topicShow (topicId, responseCnt) {  //only called when clicking heading
        $("#topicLoop").hide();
        $("#topicDetail").show();

        /*
        $.get("getTopicDetail.php?topicId=" + topicId, function (data) {
            topicDetail = JSON.parse(data);
        });
        */

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

        showResponses(topicDetail.topicId, 1);

        var pageCnt = Math.ceil(responseCnt / 10);
        initialResponsePagination(topicId, pageCnt);
    }

    var pageResponses = {
        "topicId": 4568715,
        "responses": [
            {
                "floor": 1,
                "reResponseCnt": 1,
                "floorMaster": "小明",
                "time": "2016-11-10 18:03",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reResponses": [
                    {
                        "floor": 1,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    }
                ]
            },
            {
                "floor": 2,
                "reResponseCnt": 0,
                "floorMaster": "小明",
                "time": "2016-10-14 18:43",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reResponses": []
            },
            {
                "floor": 3,
                "reResponseCnt": 1,
                "floorMaster": "小明",
                "time": "2016-9-14 18:43",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reResponses": [
                    {
                        "floor": 1,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 2,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 3,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    }
                ]
            },
            {
                "floor": 4,
                "reResponseCnt": 3,
                "floorMaster": "小明",
                "time": "2016-5-10 9:33",
                "content": "LZ我要成为你这样的男人 厉害！今年大三 看到你的博客 感觉自己什么都不会！能给点建议吗 比如现在该怎么选择前进的道路 或者 着重学习那些内容呢 现在学校还在上《算法设计》我现在就在算法设计的实验课上 无意间看到你的博客的 还是感觉楼主真的很牛逼啊 楼主大大 给点建议 指点指点明路。",
                "reResponses": [
                    {
                        "floor": 1,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 2,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 3,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    },
                    {
                        "floor": 4,
                        "Master": "小强",
                        "reTo": "小明",
                        "time": "2016-11-10 18:03",
                        "content": "hahaha",
                    }
                ]
            },
        ]
    };
    // var pageResponses = "";
    function showResponses(topicId, pageNum) {
        var postData = {
            "topicId": topicId,
            "pageNum": pageNum
        }
        /*        $.post("getPageResponses.php", postData, function (data) {
         pageResponses = JSON.parse(data);
         });*/

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
    }

    function deleteTopic(thisElement, topicId) {  //trash icon
        $.get("deleteTopic.php?topic_id="+topicId);
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
    })

//lesson//////////////////////////////////////////////////////////////////////////////////////////////////
    $("input").focus(function () {
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
    })

//link//////////////////////////////////////////////////////////////////////////////////////////////////
    $("#link").click(linkUpdate)

    $("#linkForm").submit(function () {
        var data = {}
        data["linkName"] = $("#linkName").val()
        data["linkAddress"] = $("#linkAddress").val()
        $.post("addLink.php", data)
        linkUpdate()
    })

    var linkRecords = [
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
    ]
    /*
    var linkRecords = ""
    */
    function linkUpdate() {
        /*
        $.get("getLinkList.php", data)
        linkRecords = JSON.parse(data)
        */

        $("#linkTable").find(".new").remove()
        for (var i in linkRecords) {
            var x = linkRecords[i]
            var tmp = $("#linkTable").find(".old").clone().removeClass("old").addClass("new").show()

            tmp.find(".x-linkName").html(x.linkName)
            tmp.find(".x-linkAddress").attr("href", x.linkAddress).html(x.linkAddress)
            deleteLink(tmp, x.linkId)
            $("#linkTable").find("tbody").append(tmp)
        }
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

    $("#updataForm").submit(function () {
        var data = {}
        data["updateInfo"] = updataInfoEditor.getContent()
        $.post("addUpdataInfo.php", data)
    })

});
