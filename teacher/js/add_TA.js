/**
 * Created by achao_zju on 13/11/2016.
 */


//一些全局变量



// ------------------添加助教信息-------------------

var oldAddTANumber=0;



function addTA(){

    var class_id_node=document.getElementById("class_id");
    class_id=class_id_node.value;

    

    $.ajxa({
        type:"GET",
        url:"add_TA.php?class_id="+class_id,
        success:function (result) {

        }
    })

}


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
        
        var newNodeForm = document.createElement("form");
        newNodeForm.action="add_TA.php";
        newNodeForm.method="get";
        newNodeForm.id = "addedForm";
        parent.appendChild(newNodeForm);


        var class_id_node=document.createElement("input");
        class_id_node.value=class_id;
        class_id_node.name="class_id";
        class_id_node.type="hidden";
        newNodeForm.appendChild(class_id_node);

       

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
            child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control' name='id[]' placeholder='学号'> " +
                "</div> <div class='col-sm-3'> <input class='form-control'  name='name[]' placeholder='姓名'>" +
                " </div> <div class='col-sm-3'> <input class='form-control'  name='department[]' placeholder='院系'> " +
                "</div> <div class='col-sm-3'> <input class='form-control' name='major[]' placeholder='专业'></div></div>";
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
            " <input type='submit'  class='btn btn-primary' id='add_TA_final' value='确定录入'></div>";

    }

    oldAddTANumber=newAddTANumber;

}






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
        url:"delete_TA.php?class_id="+class_id+"id="+assistant_id,
        success:function(result){
            jsonObj = result;
            if(jsonObj["if_success"]==0) {
                window.alert("删除失败");
            }
            else{
                window.alert("删除成功");
            }


        }
    });


}




// ------------------add a form  for updating TA-------------------------



function addTAUpdate(old_id) {

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

        var newNodeForm = document.createElement("form");
        newNodeForm.action = "update_TA.php";
        newNodeForm.method = "post";
        newNodeForm.id = "updatedForm";
        parent.appendChild(newNodeForm);


        var allInputRows_update_TA= document.createElement("div");
        allInputRows_update_TA.id = "allInputRows_update_TA";
        newNodeForm.appendChild(allInputRows_update_TA);


        newNodeDivRow.innerHTML = "<div class='col-sm-3'><label>学号</label> " +
            " </div> <div class='col-sm-3'> " + "<label >姓名</label> " + "</div>" +
            " <div class='col-sm-3'> <label>院系</label>  </div>" +
            " <div class='col-sm-3'> <label >专业</label> </div>";


        var old_id_div=document.createElement("div");
        old_id_div.innerHTML="<input class='form-control' type='hidden' value='"+old_id+"' name='old_id'>";
        parent.appendChild(old_id_div);


        var child = document.createElement("div");
        child.className = "addedTARow";
        child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control' name='TA_id[]' placeholder='学号'> " +
            "</div> <div class='col-sm-3'> <input class='form-control'  name='TA_name[]' placeholder='姓名'>" +
            " </div> <div class='col-sm-3'> <input class='form-control'  name='department[]' placeholder='院系'> " +
            "</div> <div class='col-sm-3'> <input class='form-control' name='major[]' placeholder='专业'></div></div>";
        allInputRows_update_TA.appendChild(child);


        var newNodeButton = document.createElement("div");
        newNodeButton.className = "row";
        newNodeForm.appendChild(newNodeButton);
        newNodeButton.innerHTML = " <div class='col-sm-9'>" +
            "<button type='button'  class='btn btn-primary' id='cancel_TA_button_update' onclick='cancelTA()'>取消录入</button></div>" +
            " <div class='col-sm-3'>" +
            " <input type='submit'  class='btn btn-primary' id='update_TA_final' value='确定录入'></div>";

    }



}

