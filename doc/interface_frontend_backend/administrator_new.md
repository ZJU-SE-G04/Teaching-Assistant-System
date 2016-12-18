- 文件名
    - getMessageList.php
- 请求方法
    - get
- 请求数据
    - null 
- 响应数据
    ````javascript
    [
        {
            "message_id": 32415312,
            "name": "小明ss",
            "time": "2016-11-13 15:38",
            "content": "基本信息ENG是El.....",
            "read": false
        },
        ...
    ]
    ````
    
---
    
- 文件名
    - getArticleList.php
- 请求方法
    - get
- 请求数据
    - null
- 响应数据
    ````javascript
    [
        {
            "article_id": 123456789,
            "title": "Java之JDK环境配置过程（图）",
            "articleDigest": "1、在Windows7操作系统...",
            "time": "2013-06-29 00:35",
            "commentNum": 7
        },
        ...
    ]
    ````
    
---
    
- 文件名
    - getArticleDetail.php
- 请求方法
    - get
- 请求数据
    ````javascript
    {
        "article_id": 23443234
    }
    ````
- 响应数据
    ````javascript
    {
        "articleId": 1594234,
        "title": "redis和memcache的区别",
        "author": "AlexandraStan",
        "time": "2016-11-09 09:45",
        "body": "性能方面：没有必要过多的关心性能，因为二者的性能都已经足够高了。由于Redis只使用单核，而Memcached可以使用多核，所以在比较上，平均每一个核上Redis在存储小数据时比Memcached性能更高。而在100k以上的数据中，Memcached性能要高于Redis，虽然Redis最近也在存储大数据的性能上进行优化，但是比起Memcached，还是稍有逊色。说了这么多，结论是，无论你使用哪一个，每秒处理请求的次数都不会成为瓶颈。（比如瓶颈可能会在网卡）内存使用效率：使用简单的key-value存储的话，Memcached的内存利用率更高，而如果Redis采用hash结构来做key-value存储，由于其组合式的压缩，其内存利用率会高于Memcached。当然，这和你的应用场景和数据特性有关。数据持久化：如果你对数据持久化和数据同步有所要求，那么推荐你选择Redis，因为这两个特性Memcached都不具备。即使你只是希望在升级或者重启系统后缓存数据不会丢失，选择Redis也是明智的。数据结构:当然，最后还得说到你的具体应用需求。Redis相比Memcached来说，拥有更多的数据结构和并支持更丰富的数据操作，通常在Memcached里，你需要将数据拿到客户端来进行类似的修改再set回去。这大大增加了网络IO的次数和数据体积。在Redis中，这些复杂的操作通常和一般的GET/SET一样高效。所以，如果你需要缓存能够支持更复杂的结构和操作，那么Redis会是不错的选择。网络IO模型方面：Memcached是多线程，分为监听线程、worker线程，引入锁，带来了性能损耗。Redis使用单线程的IO复用模型，将速度优势发挥到最大，也提供了较简单的计算功能 。内存管理方面：Memcached使用预分配的内存池的方式，带来一定程度的空间浪费 并且在内存仍然有很大空间时，新的数据也可能会被剔除，而Redis使用现场申请内存的方式来存储数据，不会剔除任何非临时数据 Redis更适合作为存储而不是cache 。数据的一致性方面：Memcached提供了cas命令来保证.而Redis提供了事务的功能，可以保证一串 命令的原子性，中间不会被任何操作打断 。如果简单地比较Redis与Memcached的区别，大多数都会得到以下观点： 1 、Redis不仅仅支持简单的k/v类型的数据，同时还提供list，set，zset，hash等数据结构的存储。 2 、Redis支持数据的备份，即master-slave模式的数据备份。 3 、Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。 4、Redis可以实现主从复制，实现故障恢复。 5、Redis的Sharding技术： 很容易将数据分布到多个Redis实例中。"
    }
    ````
    
---

- 文件名
    - getPageComments.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "articleId": 12343124,
        "pageNum": 3
    }
    ````
- 响应数据
    ````javascript
    {
        "articleId": 4568715,
        "comments": [
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
                    ...
                ]
            },
        ]
    };
    ````
    
---
    
- 文件名
    - deleteArticleComment.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "articleId": articleId,
        "floor": floor
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - deleteRecomment.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "articleId": articleId,
        "floor": floor,
        "reFloor": reFloor
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - getTopicList.php
- 请求方法
    - get
- 请求数据
    ````javascript
    null
    ````
- 响应数据
    ````javascript
    [
        {
            "topicId": 12312431,
            "lesson": "软件工程管理",
            "kind": "答疑",
            "author": "小明",
            "time": "2014-08-22 20:14",
            "title": "关于计算最长的字符串长度，为什么s传不进去",
            "responseCnt": 13
        },
        ...
    ]
    
    ````
    
---
    
- 文件名
    - getTopicDetail.php
- 请求方法
    - get
- 请求数据
    ````javascript
    {
        "topicId": 123423
    }
    ````
- 响应数据
    ````javascript
    {
        "title": "Vim cryptmethod uses SHA-256 for password-based key derivation",
        "author": "atopuncw",
        "content": "On L421-L423 of src/blowfish.c, a sha256_key() function is created for password-based key derivation with a salt for blowfish. Unfortunately, even with 1,000 rounds, SHA-256 is designed to be fast, and can be parallelized with GPUs when brute forcing a file. Instead, the Blowfish key should be derived using bcrypt or scrypt. Both defeat parallelization on GPUs, and scrypt further defeats FPGAs.",
        "lesson": "软件需求工程",
        "kind": "答疑",
        "time": "2014-03-22 10:34",
    }
    ````
    
---
    
- 文件名
    - getTopicResponses.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "topicId": topicId,
        "pageNum": pageNum
    }
    ````
- 响应数据
    ````javascript
    {
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
                    ...
                ]
            },
            ...
        ]
    };
    ````
    
---
    
- 文件名
    - deleteTopic.php
- 请求方法
    - get
- 请求数据
    ````javascript
    {
        "topicId": 2342
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - deleteTopicResponse.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "topicId": topicId,
        "floor": floor
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - deleteTopicReResponse.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "topicId": topicId,
        "floor": floor,
        "reFloor": reFloor
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - addClass.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "lessonId": 23423,
        "teacherId": 2342,
        "beginTime1": "xxx",
        "beginTime2": "xxx",
        "lessonAddress1": "xxx",
        "lessonAddress2": "xxx"
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - addTeacher.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "teacherId": 123,
        "teacherName": "xxx",
        "teacherIntroduction": "xxx"
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - addLesson.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "lessonId": 123,
        "lessonName": "xxx",
        "lessonInfo": "xxx"
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - addLink.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "linkName": "xxx",
        "linkAddress": "xxx"
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - getLinkList.php
- 请求方法
    - get
- 请求数据
    ````javascript
    null
    ````
- 响应数据
    ````javascript
    [
        {
            "linkId": 22342134,
            "linkName": "浙江大学现代教务管理系统",
            "linkAddress": "http://jwbinfosys.zju.edu.cn"
        },
        ...
    ]
    ````
    
---
    
- 文件名
    - deleteLink.php
- 请求方法
    - get
- 请求数据
    ````javascript
    {
        "linkId": 123,
    }
    ````
- 响应数据
    ````javascript
    null
    ````
    
---
    
- 文件名
    - updateInfo.php
- 请求方法
    - post
- 请求数据
    ````javascript
    {
        "updateInfo": "xxx"
    }
    ````
- 响应数据
    ````javascript
    null
    ````
