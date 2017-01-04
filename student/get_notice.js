/**
 * Created by Rexxar on 2016/11/22.
 */

function getNotice() {

    var JSON_STR = [{
        "notice_id": "10",
        "title": "第10周学习提示",
        "content": "同学们好！<br>欢迎进入第10周的课程学习！<br>本周主要讲解数据链路层的基本概念、服务，差错编码以及MAC协议等内容；重点是MAC协议，尤其是随机访问MAC协议；难点也是MAC协议，尤其是对CSMA/CD协议的深入理解。"
    }, {
        "notice_id": "9",
        "title": "第9周学习提示",
        "content": "同学们好！<br>我们的课程即将进入第9周学习了！本周主要讲解路由算法和路由协议，重点是链路状态路由算法和距离向量路由算法，难点是距离向量路由算法的无穷计数现象、OSPF协议以及BGP协议。我们的课程即将进入第9周学习了！本周主要讲解路由算法和路由协议，重点是链路状态路由算法和距离向量路由算法，难点是距离向量路由算法的无穷计数现象、OSPF协议以及BGP协议。<br>让我们继续努力，很快就见曙光了！:)"
    }];

    var notice = JSON_STR;

    $.post(
        "../teacher/course_notice.php",
        {action: "request", lesson_id: "ABCDE1"},
        function (data) {
            notice=data;
            var o = document.getElementById("noticeDiv");

            for (var i in notice) {
                var div = document.createElement("div");
                o.appendChild(div);

                div.className = "panel panel-default";
                var divTitle = document.createElement("div");
                var divContent = document.createElement("div");
                div.appendChild(divTitle);
                div.appendChild(divContent);

                divTitle.className = "panel-heading";
                divTitle.innerHTML = notice[i].title;


                divContent.className = "panel-body";
                divContent.innerHTML = notice[i].content;
 
            }

        }

    );


}
window.onload = getNotice;