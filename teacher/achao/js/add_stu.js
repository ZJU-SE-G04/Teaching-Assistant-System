/**
 * Created by achao_zju on 22/11/2016.
 */


// function showTAInfo(){
//
//     var course_name="软件工程管理";
//     var class_id=1;
//
//
//     var exist=document.getElementById("TA_info_row");
//     if(exist==null) {
//
//
//         var head=document.createElement("h3");
//         head.innerHTML="以下是"+course_name+class_id+"班的助教名单";
//         var parent = document.getElementById("TAInfo");
//         parent.appendChild(head);
//
//         var table = document.createElement("table");
//         table.id = "TAInfoTable";
//         table.className="table table-striped";
//         table.innerHTML = "<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>操作</th></tr>";
//
//         var tbody=document.createElement("tbody");
//         table.appendChild(tbody);
//
//         var jsonObj = [{
//             "assistant_id": "3130101437",
//             "assistant_name": "阿超",
//             "department": "CS",
//             "major": "SE"
//         }, {"assistant_id": "3130101437", "assistant_name": "阿超", "department": "CS", "major": "SE"},{
//             "assistant_id": "3130101437",
//             "assistant_name": "阿超",
//             "department": "CS",
//             "major": "SE"
//         },{
//             "assistant_id": "3130101437",
//             "assistant_name": "阿超",
//             "department": "CS",
//             "major": "SE"
//         }];
//         for (var i = 0; i < jsonObj.length; i++) {
//             var assistant_id= jsonObj[i].assistant_id;
//             var assistant_name = jsonObj[i].assistant_name;
//             var department = jsonObj[i].department;
//             var major = jsonObj[i].major;
//             tbody.innerHTML += "<tr><th>" + assistant_id + "</th><th>" + assistant_name + "</th><th>" + department + "</th><th>" + major + "</th><th><a href='delete_TA.php?assistantID=$assistantID'>删除</a></th></tr>"
//         }
//         parent.appendChild(table);
//
//         var TA_info_row=document.createElement("div");
//         TA_info_row.className="row";
//         TA_info_row.id="TA_info_row";
//         TA_info_row.innerHTML= "<div  class='col-sm-2' id='add_TA_hint'> " +
//             "<p  style='float: right'>我要添加助教数量:</p></div> " +
//             "<div  class='col-sm-1' id='add_TA_select' >  <div class='form-group'> " +
//             "<select id='addTANumberSelect' class='form-control' onchange='addTAInput()'> " +
//             "<option>0</option> "+
//             "<option>1</option> " +
//             "<option>2</option> " +
//             "<option>3</option> " +
//             "</select></div> </div> ";
//         parent.appendChild(TA_info_row);
//         // var afterNode = document.getElementById("TA_info_row");
//     }
// }



function showStuInfo(){

    var course_name="软件工程管理";
    var class_id=1;


    var exist=document.getElementById("stu_info_row");
    if(exist==null) {
        var head=document.createElement("h3");
        head.innerHTML="以下是"+course_name+class_id+"班的学生名单";
        var parent = document.getElementById("stuInfo");
        parent.appendChild(head);

        var table = document.createElement("table");
        table.id = "StuInfoTable";
        table.className="table table-striped";
        table.innerHTML = "<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>团队</th><th>操作</th></tr>";

        var tbody=document.createElement("tbody");
        table.appendChild(tbody);

        var jsonObj = [{
            "stu_id": "3130101437",
            "stu_name": "阿超",
            "department": "CS",
            "major": "SE",
            "team_name":"政治局"
        }, {"assistant_id": "3130101437", "assistant_name": "阿超", "department": "CS", "major": "SE"},{
            "assistant_id": "3130101437",
            "assistant_name": "阿超",
            "department": "CS",
            "major": "SE",
            "team_name":"楼外楼"
        },{
            "assistant_id": "3130101437",
            "assistant_name": "阿超",
            "department": "CS",
            "major": "SE",
            "team_name":"青芝坞"
        }];
        for (var i = 0; i < jsonObj.length; i++) {
            var assistant_id= jsonObj[i].assistant_id;
            var assistant_name = jsonObj[i].assistant_name;
            var department = jsonObj[i].department;
            var major = jsonObj[i].major;
            tbody.innerHTML += "<tr><th>" + assistant_id + "</th><th>" + assistant_name + "</th><th>" + department + "</th><th>" + major + "</th><th><a href='delete_TA.php?assistantID=$assistantID'>删除</a></th></tr>"
        }
        parent.appendChild(table);

        var stu_info_row=document.createElement("div");
        stu_info_row.className="row";
        stu_info_row.id="stu_info_row";
        stu_info_row.innerHTML= "<div  class='col-sm-2' id='add_TA_hint'> " +
            "<p  style='float: right'>我要添加助教数量:</p></div> " +
            "<div  class='col-sm-1' id='add_TA_select' >  <div class='form-group'> " +
            "<select id='addTANumberSelect' class='form-control' onchange='addTAInput()'> " +
            "<option>0</option> "+
            "<option>1</option> " +
            "<option>2</option> " +
            "<option>3</option> " +
            "</select></div> </div> ";
        parent.appendChild(stu_info_row);
        // var afterNode = document.getElementById("stu_info_row");
    }
}

