/**
 * Created by achao_zju on 22/11/2016.
 */
//------------- 一些全局变量 -----------

var oldAddStuNumber=0;


var old_id_update_stu;

//---------------show students' info-----------------

function showStuInfo(){


//显示当前班级信息
    
    var jsonObj;
    $.ajax({
        type:"GET",
        url:"show_stu_info.php?class_id="+class_id,
        success:function (result) {
            jsonObj=result;


            var exist=document.getElementById("stu_info_row");

            if(exist==null) {

                var parent = document.getElementById("stuInfo");

                var table = document.createElement("table");
                table.id = "StuInfoTable";
                table.className="table table-striped";
                table.innerHTML = "<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>团队</th><th>删除</th><th>修改</th></tr>";

                var tbody=document.createElement("tbody");
                table.appendChild(tbody);


                for (var i = 0; i < jsonObj.length; i++) {
                    var stu_id= jsonObj[i].id;
                    var stu_name = jsonObj[i].name;
                    var department = jsonObj[i].department;
                    var major = jsonObj[i].major;
                    var team_name=jsonObj[i].team_name;
                    tbody.innerHTML += "<tr><th>" + stu_id + "</th><th>" + stu_name + "</th><th>" + department + "</th><th>" + major +"</th><th>"+ team_name+ "</th>" +
                        "<th onclick='deleteStu("+stu_id+")'><span class='glyphicon glyphicon-trash'></span></th>" +
                        "<th onclick='addStuUpdate("+stu_id+")'><span class='glyphicon glyphicon-edit'></span></th></tr>";

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
                add_multi_stu.innerHTML= "<div  class='col-sm-3' id='add_multi_stu_hint'></div> " +
                    "<div  class='col-sm-1' id='add_stu_select' >  </div> ";
                parent.appendChild(add_multi_stu);
            }
        }
    });



}


//--------------- 增加 添加学生信息的 输入框-----------


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

        var newNodeForm = document.createElement("div");
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
            child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control t-stu-id' name='id[]' > " +
                "</div> <div class='col-sm-3'> <input class='form-control t-stu-name'  name='name[]' >" +
                " </div> <div class='col-sm-3'> <input class='form-control t-stu-department'  name='department[]'> " +
                "</div> <div class='col-sm-3'> <input class='form-control t-stu-major' name='major[]' ></div></div>";
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
            "<button  class='btn btn-primary' id='cancel_stu_button' onclick='cancelStu()'>取消录入</button></div>" +
            " <div class='col-sm-3'>" +
            " <button  class='btn btn-primary' id='add_stu_final' onclick='addStu()'>确定录入</div>";

    }

    oldAddStuNumber=newAddStuNumber;
}

//----------- 取消输入框 ----------------

function cancelStu() {
    document.getElementById("stuInfo").removeChild(document.getElementById("deletedAddStu"));
    oldAddTANumber=0;

}


//-----------  将输入框的学生信息发送到后端,并处理返回结果---------------

function  addStu(){

    var t_stu_id=document.getElementsByClassName("t-stu-id");
    var t_stu_name=document.getElementsByClassName("t-stu-name");
    var t_stu_department=document.getElementsByClassName("t-stu-department");
    var t_stu_major=document.getElementsByClassName("t-stu-major");

    var arr_value_id;
    var arr_value_name;
    var arr_value_department;
    var arr_value_major;

    var arr="";

    for(var i=0;i<t_stu_id.length;i++){

        arr_value_id=t_stu_id[i].value;
        arr=arr+"&id[]="+arr_value_id;

        arr_value_name=t_stu_name[i].value;
        arr=arr+"&name[]="+arr_value_name;

        arr_value_department=t_stu_department[i].value;
        arr=arr+"&department[]="+arr_value_department;

        arr_value_major=t_stu_major[i].value;
        arr=arr+"&major[]="+arr_value_major;

    }

    $.ajax({
        type:"GET",
        url:"add_stu.php?class_id="+class_id+arr,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==0){
                window.alert(jsonObj["error_message"]);
                // $(".modal-content").text(json["error_message"]);
                $('#myModal').modal(options)
            }
            else {
                location.reload(true);
            }
        }
    });


}


//------------ delete a students' information -----------------


function deleteStu(stu_id) {
    $.ajax({
        type:"GET",
        url:"delete_stu.php?class_id="+class_id+"&id="+stu_id,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==0){
                window.alert(jsonObj["error_message"]);
            }
            else {
                window.alert("删除成功");
                location.reload(true);
            }
        }
    });
    
}

//--------------  add form for updating ------------------------

function addStuUpdate(old_id) {

    old_id_update_stu=old_id;

    if( document.getElementById("updatedAddStu")==null) {
        var parent = document.createElement("div");
        parent.id = "updatedAddStu";
        var grandparent = document.getElementById("stuInfo");
        grandparent.appendChild(parent);
        var newNode = document.createElement("h3");
        newNode.innerHTML = "修改学生信息";
        parent.appendChild(newNode);

        var newNodeDivRow = document.createElement("div");
        newNodeDivRow.className = "row";
        parent.appendChild(newNodeDivRow);

        var newNodeForm = document.createElement("div");
        parent.appendChild(newNodeForm);

        //--------- 标题栏 ----------------
        newNodeDivRow.innerHTML = "<div class='col-sm-3'><label>学号</label> " +
            " </div> <div class='col-sm-3'> " + "<label >姓名</label> " + "</div>" +
            " <div class='col-sm-3'> <label>院系</label>  </div>" +
            " <div class='col-sm-3'> <label >专业</label> </div>";

        var child = document.createElement("div");
        child.className = "addedStuRow";
        child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control update-stu-input' > " +
            "</div> <div class='col-sm-3'> <input class='form-control update-stu-input' >" +
            " </div> <div class='col-sm-3'> <input class='form-control update-stu-input' > " +
            "</div> <div class='col-sm-3'> <input class='form-control update-stu-input'  ></div></div>";
        newNodeForm.appendChild(child);


        var newNodeButton = document.createElement("div");
        newNodeButton.className = "row";
        newNodeForm.appendChild(newNodeButton);
        newNodeButton.innerHTML = " <div class='col-sm-9'>" +
            "<button  class='btn btn-primary' id='cancel_TA_button_update' onclick='cancelUpdateStu()'>取消修改</button></div>" +
            " <div class='col-sm-3'>" +
            " <button  class='btn btn-primary' id='update_TA_final' onclick='updateStu()'>确定修改</div>";

    }
}


// ---------- 取消修改学生信息 -------------


function  cancelUpdateStu() {
    document.getElementById("stuInfo").removeChild(document.getElementById("updatedAddStu"));
}

// ---------- 向后端发送修改学生信息 -------------


function updateStu() {

    var update_stu_input=document.getElementsByClassName("update-stu-input");
    var arr="&id="+update_stu_input[0].value+"&name="+update_stu_input[1].value+"&department="+update_stu_input[2].value+"&major="+update_stu_input[3].value;

    $.ajax({
        type:"GET",
        url:"update_stu.php?class_id="+class_id+"&old_id="+old_id_update_stu+arr,
        success:function(result){
            jsonObj = result;
            if(jsonObj["if_success"]==0) {

            }
            else{
                window.alert("修改成功");
                location.reload(true);
            }
        }
    });


}
