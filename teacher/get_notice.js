/**
 * Created by Rexxar on 2016/11/22.
 */
var notice_to_edit;//当点击编辑按钮时，notice_to_edit会变
function markNoticeToEdit(data) {
    notice_to_edit = data.getAttribute("data-id");
}

function deleteNotice(notice) {
    // alert(notice.getAttribute("data-id"));
    $.post(
        "course_notice.php",
        {action: "delete", notice_id: notice.getAttribute("data-id")},
        function (data) {
            if (data) {
                alert("删除成功");
                location.reload();
            }
            else alert("删除失败");
        }
    );
}

function editNotice() {
    var title = document.getElementById("edit-title").value;
    var content = document.getElementById("edit-content").value;
    // alert(title + '\n' + content);
    $.post(
        "course_notice.php",
        {action: "edit", notice_id: notice_to_edit, title: title, content: content},
        function (data) {
            if (data) {
                // alert("修改成功");
                location.reload();
            }
            else alert("修改失败");
        }
    );
}
function addNotice() {
    var title = document.getElementById("new_notice_title").value;
    var content = document.getElementById("new_notice_content").value;

    // alert(title + "\n" + content);
    var tmp_lesson_id = "ABCDE1";//bug未修复 
    $.post(
        "course_notice.php",
        {action: "add", lesson_id: tmp_lesson_id, title: title, content: content},
        function (data) {
            if (data) {
                // alert("发布成功");
                location.reload();
            }
            else alert("发布失败");
        }
    );
}

function getNotice() {
    // ----初始化一些存储在js中的全局变量,added by zhangshichao------
    course_id = getQueryString("lesson_id");
    course_name = getQueryString("course_name");
    $(".coursename").first().text(course_name);
    $("#stu_course_name").text(course_name);
    $("#TA_course_name").text(course_name);

    user_name = getQueryString("user_name");
    $("#username").text(user_name);
    user_id = getQueryString("user_id");
    level = getQueryString("level");
    if (level == 3) {//助教不能管理助教信息
        $(".t-check").css("display", "block");
    }


    show_class_init();//初始化班级


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
    // alert(class_id);
    $.post(
        "course_notice.php",
        {action: "request", lesson_id: "ABCDE1"},
        function (data) {
            notice = data;
            // alert(notice);
            var o = document.getElementById("noticeDiv");

            for (var i in notice) {
                var div = document.createElement("div");
                o.appendChild(div);

                div.className = "panel panel-default";
                // div.id = notice[i].notice_id;
                // div.data-id=notice[i].notice_id;
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

                // aDelete.href = "http://www.baidu.com";
                // aDelete.onclick="deleteNotice(this)";
                aDelete.className = "icon-black";
                aDelete.innerHTML = '<span data-id="' + notice[i].notice_id + '" onclick="deleteNotice(this)"  style="float: right;" class="glyphicon glyphicon-trash"></span>';
                // var spanDelete = document.createElement("span");
                // aDelete.appendChild(spanDelete);
                // spanDelete.style = "float: right;";
                // spanDelete.className = "glyphicon glyphicon-trash";
                // spanDelete.onclick="deleteNotice(this)";

                aEdit.className = "icon-black";
                aEdit.innerHTML = '<span data-toggle="modal" data-id="' + notice[i].notice_id + '" data-target="#editModal" onclick="markNoticeToEdit(this)" style="float: right;" class="glyphicon glyphicon-pencil">&nbsp;</span>';
                // var spanEdit = document.createElement("span");
                // aEdit.appendChild(spanEdit);
                // spanEdit.style = "float: right;";
                // spanEdit.className = "glyphicon glyphicon-pencil";
                // spanEdit.innerHTML = "&nbsp;";

                divContent.className = "panel-body";
                divContent.innerHTML = notice[i].content;

            }
        }
    );
}
window.onload = getNotice;

//---------这个是zhang shichao添加的函数,用于获取php传递过来的url的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}