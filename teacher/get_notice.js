/**
 * Created by Rexxar on 2016/11/22.
 */


function getNotice() {
    var JSON_STR = [{"notice_id":"10","title":"第10周学习提示","content":"同学们好！<br>欢迎进入第10周的课程学习！<br>本周主要讲解数据链路层的基本概念、服务，差错编码以及MAC协议等内容；重点是MAC协议，尤其是随机访问MAC协议；难点也是MAC协议，尤其是对CSMA/CD协议的深入理解。"},{"notice_id":"9","title":"第9周学习提示","content":"同学们好！<br>我们的课程即将进入第9周学习了！本周主要讲解路由算法和路由协议，重点是链路状态路由算法和距离向量路由算法，难点是距离向量路由算法的无穷计数现象、OSPF协议以及BGP协议。我们的课程即将进入第9周学习了！本周主要讲解路由算法和路由协议，重点是链路状态路由算法和距离向量路由算法，难点是距离向量路由算法的无穷计数现象、OSPF协议以及BGP协议。<br>让我们继续努力，很快就见曙光了！:)"}];

    var notice = JSON_STR;

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
        var aDelete = document.createElement("a");
        var aEdit = document.createElement("a");
        divTitle.appendChild(aDelete);
        divTitle.appendChild(aEdit);

        aDelete.href = "http://www.baidu.com";
        aDelete.className = "icon-black";
        var spanDelete = document.createElement("span");
        aDelete.appendChild(spanDelete);
        spanDelete.style = "float: right;";
        spanDelete.className = "glyphicon glyphicon-trash";

        aEdit.href = "http://www.baidu.com";
        aEdit.className = "icon-black";
        var spanEdit = document.createElement("span");
        aEdit.appendChild(spanEdit);
        spanEdit.style = "float: right;";
        spanEdit.className = "glyphicon glyphicon-pencil";
        spanEdit.innerHTML = "&nbsp;";

        divContent.className = "panel-body";
        divContent.innerHTML = notice[i].content;

    }

// ----初始化一些存储在js中的全局变量,added by zhangshichao------
    course_id=getQueryString("lesson_id");
    $(".c-course-id").attr("value",course_id);

    course_name=getQueryString("course_name");
    $(".coursename").first().text(course_name);
    $("#stu_course_name").text(course_name);
    $("#TA_course_name").text(course_name);
    user_name=getQueryString("user_name");
    $("#username").text(user_name);
    user_id=getQueryString("user_id");
    level=getQueryString("level");
    if(level==3){//助教不能管理助教信息
        $(".t-check").css("display","block");
    }

    show_class_init();//初始化班级
    $(".c-class-id").attr("value",class_id);//后面还缺一句陈述?

    
    

}
window.onload = getNotice;

//---------这个是zhang shichao添加的函数,用于获取php传递过来的url的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }else{
        return null;
    }
}