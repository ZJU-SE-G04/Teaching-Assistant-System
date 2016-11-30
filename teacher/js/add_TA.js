/**
 * Created by achao_zju on 13/11/2016.
 */


//一些全局变量

var oldAddTANumber=0;//这是添加助教信息时，之前选择添加助教数量
var old_id_update_TA;//用于更新助教信息

// ------------------添加助教信息,发送请求给后端-------------------




function addTA(){



    var t_TA_id=document.getElementsByClassName("t-TA-id");
    var t_TA_name=document.getElementsByClassName("t-TA-name");
    var t_TA_department=document.getElementsByClassName("t-TA-department");
    var t_TA_major=document.getElementsByClassName("t-TA-major");


    var arr_value_id;
    var arr_value_name;
    var arr_value_department;
    var arr_value_major;


    var arr="";

    for(var i=0;i<t_TA_id.length;i++){

        arr_value_id=t_TA_id[i].value;
        arr=arr+"&id[]="+arr_value_id;

        arr_value_name=t_TA_name[i].value;
        arr=arr+"&name[]="+arr_value_name;

        arr_value_department=t_TA_department[i].value;
        arr=arr+"&department[]="+arr_value_department;

        arr_value_major=t_TA_major[i].value;
        arr=arr+"&major[]="+arr_value_major;

    }
    // window.alert(arr);



    $.ajax({
        type:"GET",
        url:"add_TA.php?class_id="+class_id+arr,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==0){
                window.alert(jsonObj["error_message"]);
            }
            else {
                location.reload(true);
            }
        }
    })

}

// ------------------添加输入框，输入框用于添加助教信息-------------------



function  addTAInput() {
    var addTANumberSelect=document.getElementById("addTANumberSelect");
    var index=addTANumberSelect.selectedIndex;
    var newAddTANumber=addTANumberSelect[index].value;

    if(newAddTANumber==oldAddTANumber){
        return;
    }
    if(newAddTANumber==0){
        document.getElementById("TAInfo").removeChild(document.getElementById("deletedAddTA"));
        oldAddTANumber=newAddTANumber;
        return;

    }


    var allInputRows;

    if( document.getElementById("deletedAddTA")==null) {
        var parent = document.createElement("div");
        parent.id = "deletedAddTA";
        var grandparent = document.getElementById("TAInfo");
        grandparent.appendChild(parent);
        var newNode = document.createElement("h3");
        newNode.innerHTML = "输入助教信息";
        parent.appendChild(newNode);

        var newNodeDivRow = document.createElement("div");
        newNodeDivRow.className = "row";
        parent.appendChild(newNodeDivRow);
        
        var newNodeForm = document.createElement("div");
        newNodeForm.id = "addedForm";
        parent.appendChild(newNodeForm);

        allInputRows=document.createElement("div");
        allInputRows.id="allInputRows";
        newNodeForm.appendChild(allInputRows);

        newNodeDivRow.innerHTML = "<div class='col-sm-3'><label>学号</label> " +
            " </div> <div class='col-sm-3'> " + "<label >姓名</label> " + "</div>" +
            " <div class='col-sm-3'> <label>院系</label>  </div>" +
            " <div class='col-sm-3'> <label >专业</label> </div>";
    }
    else {
        allInputRows=document.getElementById("allInputRows");
    }


    if(newAddTANumber>oldAddTANumber) {
        var i;
        for (i = 0; i < newAddTANumber-oldAddTANumber; i++) {
            var child = document.createElement("div");
            child.className = "addedTARow";
            child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control t-TA-id' name='id[]' > " +
                "</div> <div class='col-sm-3'> <input class='form-control t-TA-name'  name='name[]' >" +
                " </div> <div class='col-sm-3'> <input class='form-control t-TA-department'  name='department[]' > " +
                "</div> <div class='col-sm-3'> <input class='form-control t-TA-major' name='major[]' ></div></div>";
            allInputRows.appendChild(child);
        }
    }
    else {
        var  x=document.getElementsByClassName("addedTARow");
        for (i = oldAddTANumber-newAddTANumber; i >0; i--) {
            allInputRows.removeChild(x[i-1]);
        }

    }


    if(document.getElementById("add_TA_final")==null) {
        var newNodeButton = document.createElement("div");
        newNodeButton.className = "row";
        newNodeForm.appendChild(newNodeButton);
        newNodeButton.innerHTML = " <div class='col-sm-9'>" +
            "<button type='button'  class='btn btn-primary' id='cancel_TA_button' onclick='cancelTA()'>取消录入</button></div>" +
            " <div class='col-sm-3'>" +
            " <button  class='btn btn-primary' id='add_TA_final' onclick='addTA()'>确定录入</div>";

    }

    oldAddTANumber=newAddTANumber;

}



// ------------------取消修改助教信息------------------------



function  cancelTA() {

    document.getElementById("TAInfo").removeChild(document.getElementById("deletedAddTA"));
    oldAddTANumber=0;

}





// ------------------show TAs' info-------------------------




function showTAInfo(){

    var jsonObj;
    // var course_name="软件工程管理";

    $.ajax({
        type:"GET",
        url:"show_TA_info.php?class_id="+class_id,
        success:function(result){
            jsonObj = result;

            var exist=document.getElementById("TA_info_row");

            if(exist==null) {
                var parent=document.getElementById("TAInfo");

                var table = document.createElement("table");
                table.id = "TAInfoTable";
                table.className="table table-striped";
                table.innerHTML = "<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>删除</th><th>修改</th></tr>";

                var tbody=document.createElement("tbody");
                table.appendChild(tbody);

                
                for (var i = 0; i < jsonObj.length; i++) {
                    var assistant_id= jsonObj[i].id;
                    var assistant_name = jsonObj[i].name;
                    var department = jsonObj[i].department;
                    var major = jsonObj[i].major;
                    tbody.innerHTML += "<tr><th>" + assistant_id + "</th><th>" + assistant_name + "</th><th>" + department + "</th><th>" + major
                        + "</th><th onclick='deleteTA("+assistant_id+")'>" +
                        "<span class='glyphicon glyphicon-trash' aria-hidden='true'></span></th><th onclick='addTAUpdate("+assistant_id+")'><span class='glyphicon glyphicon-edit'></span></th></tr>";
                }
                parent.appendChild(table);

                var TA_info_row=document.createElement("div");
                TA_info_row.className="row";
                TA_info_row.id="TA_info_row";
                TA_info_row.innerHTML= "<div  class='col-sm-2' id='add_TA_hint'> " +
                    "<p  style='float: right'>我要添加助教数量:</p></div> " +
                    "<div  class='col-sm-1' id='add_TA_select' >  <div class='form-group'> " +
                    "<select id='addTANumberSelect' class='form-control' onchange='addTAInput()'> " +
                    "<option>0</option> "+
                    "<option>1</option> " +
                    "<option>2</option> " +
                    "<option>3</option> " +
                    "</select></div> </div> ";
                parent.appendChild(TA_info_row);
            }

        }
    });


}

// ------------------delete  a TA's info-------------------------


function deleteTA(assistant_id) {
    
    var jsonObj;

    $.ajax({
        type:"GET",
        url:"delete_TA.php?class_id="+class_id+"&id="+assistant_id,
        success:function(result){
            jsonObj = result;
            if(jsonObj["if_success"]==0) {
                window.alert("修改失败");
            }
            else{
                window.alert("修改成功");
                location.reload(true);
            }


        }
    });


}


// ------------------update a TA's info-------------------------


function updateTA() {


    var update_TA_input=document.getElementsByClassName("update-TA-input");

    var arr="&id="+update_TA_input[0].value+"&name="+update_TA_input[1].value+"&department="+update_TA_input[2].value+"&major="+update_TA_input[3].value;


    $.ajax({
        type:"GET",
        url:"update_TA.php?class_id="+class_id+"&old_id="+old_id_update_TA+arr,
        success:function(result){
            jsonObj = result;
            if(jsonObj["if_success"]==0) {
                window.alert("修改失败");
                location.reload(true);
            }
            else{
                window.alert("修改成功");
                location.reload(true);

            }


        }
    });




}



// ------------------add a form  for updating TA-------------------------



function addTAUpdate(old_id) {

    old_id_update_TA=old_id;

    if( document.getElementById("updatedAddTA")==null) {
        var parent = document.createElement("div");
        parent.id = "updatedAddTA";
        var grandparent = document.getElementById("TAInfo");
        grandparent.appendChild(parent);
        var newNode = document.createElement("h3");
        newNode.innerHTML = "修改助教信息";
        parent.appendChild(newNode);

        var newNodeDivRow = document.createElement("div");
        newNodeDivRow.className = "row";
        parent.appendChild(newNodeDivRow);

        var newNodeForm = document.createElement("div");
        newNodeForm.id = "updatedForm";
        parent.appendChild(newNodeForm);

        newNodeDivRow.innerHTML = "<div class='col-sm-3'><label>学号</label> " +
            " </div> <div class='col-sm-3'> " + "<label >姓名</label> " + "</div>" +
            " <div class='col-sm-3'> <label>院系</label>  </div>" +
            " <div class='col-sm-3'> <label >专业</label> </div>";

        var child = document.createElement("div");
        child.className = "addedTARow";
        child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control update-TA-input' name='TA_id[]'> " +
            "</div> <div class='col-sm-3'> <input class='form-control update-TA-input'  name='TA_name[]'>" +
            " </div> <div class='col-sm-3'> <input class='form-control update-TA-input'  name='department[]' > " +
            "</div> <div class='col-sm-3'> <input class='form-control update-TA-input' name='major[]' ></div></div>";
        newNodeForm.appendChild(child);


        var newNodeButton = document.createElement("div");
        newNodeButton.className = "row";
        newNodeForm.appendChild(newNodeButton);
        newNodeButton.innerHTML = " <div class='col-sm-9'>" +
            "<button  class='btn btn-primary' id='cancel_TA_button_update' onclick='cancelUpdateTA()'>取消修改</button></div>" +
            " <div class='col-sm-3'>" +
            " <button  class='btn btn-primary' id='update_TA_final' onclick='updateTA()'>确定修改</div>";

    }
}


// ------------------取消修改助教信息-------------------------


function  cancelUpdateTA() {
    document.getElementById("TAInfo").removeChild(document.getElementById("updatedAddTA"));
}




