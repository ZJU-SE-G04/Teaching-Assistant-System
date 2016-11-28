/**
 * Created by achao_zju on 22/11/2016.
 */

var class_id="1";

function showStuInfo(){



    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }

    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    var PageToSendTo = "show_stu_info.php?";
    var class_id = "1";
    var VariablePlaceholder = "class_id";
    var UrlToSend = PageToSendTo + VariablePlaceholder + class_id;

    xmlhttp.open("GET", UrlToSend, false);
    xmlhttp.send();


    var course_name="软件工程管理";
    var class_time="周二345";
    document.getElementById("stu_course_name").innerHTML=course_name;
    document.getElementById("stu_class_time").innerHTML=class_time;




    var exist=document.getElementById("stu_info_row");

    if(exist==null) {
        // var head=document.createElement("h3");
        // head.innerHTML="以下是"+course_name+class_id+"班的学生名单";
        var parent = document.getElementById("stuInfo");
        // parent.appendChild(head);

        var table = document.createElement("table");
        table.id = "StuInfoTable";
        table.className="table table-striped";
        table.innerHTML = "<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>团队</th><th>操作</th></tr>";

        var tbody=document.createElement("tbody");
        table.appendChild(tbody);

        var jsonObj = [
            {
            "id": "3130101437",
            "name": "阿超",
            "department": "CS",
            "major": "SE",
            "team_name":"政治局"
        },
            {"id": "3130101415", "name": "阿超", "department": "CS", "major": "SE","team_name":"赛艇队"},
            {
                "id": "3130101437",
                "name": "阿超",
                "department": "CS",
                "major": "SE",
                "team_name":"青芝坞"
            },{
            "id": "3130101437",
            "name": "哈哈哈",
            "department": "CS",
            "major": "SE",
            "team_name":"青芝坞"
        }];
        for (var i = 0; i < jsonObj.length; i++) {
            var stu_id= jsonObj[i].id;
            var stu_name = jsonObj[i].name;
            var department = jsonObj[i].department;
            var major = jsonObj[i].major;
            var team_name=jsonObj[i].team_name;
            tbody.innerHTML += "<tr><th>" + stu_id + "</th><th>" + stu_name + "</th><th>" + department + "</th><th>" + major +"</th><th>"+ team_name+ "</th><th><a href='delete_stu.php?id=stu_id&class_id=class_id'>删除</a></th></tr>";
        }
        parent.appendChild(table);

        var stu_info_row=document.createElement("div");
        stu_info_row.className="row";
        stu_info_row.id="stu_info_row";
        stu_info_row.innerHTML= "<div  class='col-sm-3' id='add_stu_hint'> " +
            "<p  style='float: right'>手动添加学生数量:</p></div> " +
            "<div  class='col-sm-1' id='add_stu_select' >  <div class='form-group'> " +
            "<select id='addStuNumberSelect' class='form-control' onchange='addStuInput()'> " +
            "<option>0</option> "+
            "<option>1</option> " +
            "<option>2</option> " +
            "<option>3</option> " +
            "</select></div> </div> ";
        parent.appendChild(stu_info_row);


        var add_multi_stu=document.createElement("div");
        add_multi_stu.className="row";
        add_multi_stu.id="add_multi_stu";
        add_multi_stu.innerHTML= "<div  class='col-sm-3' id='add_multi_stu_hint'> " +
            "<form action='add_stu_excel.php' method='post' enctype='multipart/form-data'><input type='file' name='file'><input type='submit' value='submit'></form></div> " +
            "<div  class='col-sm-1' id='add_stu_select' >  </div> ";
        parent.appendChild(add_multi_stu);
        // var afterNode = document.getElementById("stu_info_row");
    }
}


var oldAddStuNumber=0;


function addStuInput() {

    var addStuNumberSelect=document.getElementById("addStuNumberSelect");
    var index=addStuNumberSelect.selectedIndex;
    var newAddStuNumber=addStuNumberSelect[index].value;

    if(newAddStuNumber==oldAddStuNumber){
        return;
    }

    if(newAddStuNumber==0){
        document.getElementById("StuInfo").removeChild(document.getElementById("deletedAddStu"));
        oldAddStuNumber=newAddStuNumber;
        return;
    }

    if(document.getElementById("deletedAddStu")==null){
        var parent=document.createElement("div");
        parent.id="deletedAddStu";

        var grandparent=document.getElementById("stuInfo");
        grandparent.appendChild(parent);

        var newNode = document.createElement("h3");
        newNode.innerHTML = "输入学生信息";
        parent.appendChild(newNode);

        var newNodeDivRow = document.createElement("div");
        newNodeDivRow.className = "row";
        parent.appendChild(newNodeDivRow);

        var newNodeForm = document.createElement("form");
        newNodeForm.action="add_stu.php?class_id="+class_id;
        newNodeForm.method="post";
        newNodeForm.id = "addedFormStu";
        parent.appendChild(newNodeForm);

        var allInputRowsStu=document.createElement("div");
        allInputRowsStu.id="allInputRowsStu";
        newNodeForm.appendChild(allInputRowsStu);

        newNodeDivRow.innerHTML = "<div class='col-sm-3'><label>学号</label> " +
            " </div> <div class='col-sm-3'> " + "<label >姓名</label> " + "</div>" +
            " <div class='col-sm-3'> <label>院系</label>  </div>" +
            " <div class='col-sm-3'> <label >专业</label> </div>";
    }
    else {
        var allInputRowsStu=document.getElementById("allInputRowsStu");
    }

    if(newAddStuNumber>oldAddStuNumber) {
        for (var i = 0; i < newAddStuNumber-oldAddStuNumber; i++) {
            var child = document.createElement("div");
            child.className = "addedStuRow";
            child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control' name='id[]' placeholder='学号'> " +
                "</div> <div class='col-sm-3'> <input class='form-control'  name='name[]' placeholder='姓名'>" +
                " </div> <div class='col-sm-3'> <input class='form-control'  name='department[]' placeholder='院系'> " +
                "</div> <div class='col-sm-3'> <input class='form-control' name='major[]' placeholder='专业'></div></div>";
            allInputRowsStu.appendChild(child);
        }
    }
    else {
        var  x=document.getElementsByClassName("addedStuRow");
        for (var i = oldAddStuNumber-newAddStuNumber; i >0; i--) {
            allInputRowsStu.removeChild(x[i-1]);
        }

    }

    if(document.getElementById("add_Stu_final")==null) {
        var newNodeButton = document.createElement("div");
        newNodeButton.className = "row";
        newNodeForm.appendChild(newNodeButton);
        newNodeButton.innerHTML = " <div class='col-sm-9'>" +
            "<button type='button'  class='btn btn-primary' id='cancel_stu_button' onclick='cancelStu()'>取消录入</button></div>" +
            " <div class='col-sm-3'>" +
            " <input type='submit'  class='btn btn-primary' id='add_stu_final' value='确定录入'></div>";
        //
        // var disabledButton=document.getElementById("add_Stu_button");
        // disabledButton.disabled=true;
    }

    oldAddStuNumber=newAddStuNumber;
}


function cancelStu() {
    document.getElementById("stuInfo").removeChild(document.getElementById("deletedAddStu"));
    oldAddTANumber=0;

}
