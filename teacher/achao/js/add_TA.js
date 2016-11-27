/**
 * Created by achao_zju on 13/11/2016.
 */

// ------------------添加助教信息-------------------

var oldAddTANumber=0;


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
        newNodeForm.method="post";
        newNodeForm.id = "addedForm";
        parent.appendChild(newNodeForm);

       

        var allInputRows=document.createElement("div");
        allInputRows.id="allInputRows";
        newNodeForm.appendChild(allInputRows);




        newNodeDivRow.innerHTML = "<div class='col-sm-3'><label>学号</label> " +
            " </div> <div class='col-sm-3'> " + "<label >姓名</label> " + "</div>" +
            " <div class='col-sm-3'> <label>院系</label>  </div>" +
            " <div class='col-sm-3'> <label >专业</label> </div>";
    }
    else {
       var allInputRows=document.getElementById("allInputRows");
    }


    if(newAddTANumber>oldAddTANumber) {
        for (var i = 0; i < newAddTANumber-oldAddTANumber; i++) {
            var child = document.createElement("div");
            child.className = "addedTARow";
            child.innerHTML = "<div class='row'><div class='col-sm-3'><input class='form-control' name='TA_id[]' placeholder='学号'> " +
                "</div> <div class='col-sm-3'> <input class='form-control'  name='TA_name[]' placeholder='姓名'>" +
                " </div> <div class='col-sm-3'> <input class='form-control'  name='department[]' placeholder='院系'> " +
                "</div> <div class='col-sm-3'> <input class='form-control' name='major[]' placeholder='专业'></div></div>";
            allInputRows.appendChild(child);
        }
    }
    else {
        var  x=document.getElementsByClassName("addedTARow");
        for (var i = oldAddTANumber-newAddTANumber; i >0; i--) {
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
        //
        // var disabledButton=document.getElementById("add_TA_button");
        // disabledButton.disabled=true;
    }

    oldAddTANumber=newAddTANumber;

}


function  cancelTA() {

    document.getElementById("TAInfo").removeChild(document.getElementById("deletedAddTA"));
    oldAddTANumber=0;

}



// ------------------show TAs' info-------------------------

// $(document).ready(function(){
//     $('#TA').showTAInfo(function(){
//         $.ajax({
//             type:"POST",
//             url:"showTA.php",
//             dataType:"json",
//             success:function(result){
//                 // var jsonObj = result;
//                 var table=document.createElement("table");
//                 table.className="table table-striped";
//                 table.id="TAInfoTable";
//                 table.innerHTML="<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>操作</th></tr>";
//
//
//                 var jsonObj=[{"assistant_id":"3130101437","assistant_name":"阿超","department":"CS","major":"SE"},{"assistant_id":"3130101437","assistant_name":"阿超","department":"CS","major":"SE"}]
//                 for (var i = 0; i < jsonObj.length; i++) {
//                     var assistantID= jsonObj[i].assistant_id;
//                     var assistantName=jsonObj[i].assistant_name;
//                     var department=jsonObj[i].department;
//                     var major=jsonObj[i].major;
//                     table.innerHTML+="<tr><th>"+assistantID+"</th><th>"+assistantName+"</th><th>"+department+"</th><th>"+major+"</th><th>删除</th></tr>"
//
//
//                 }
//                 var parent=document.getElementById("TA_info_row");
//                 parent.appendChild(table);
//
//             }
//         });
//         return false;
//     });
// });


function showTAInfo(){

    var course_name="软件工程管理";
    var class_id=1;


    var exist=document.getElementById("TA_info_row");
    if(exist==null) {





        var parent=document.getElementById("TAInfo");

        var table = document.createElement("table");
        table.id = "TAInfoTable";
        table.className="table table-striped";
        table.innerHTML = "<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>删除</th><th>编辑</th></tr>";

        var tbody=document.createElement("tbody");
        table.appendChild(tbody);

        var jsonObj = [{
            "id": "3130101437",
            "name": "阿超",
            "department": "CS",
            "major": "SE"
        }, {"id": "3130101437", "name": "阿超", "department": "CS", "major": "SE"},{
            "id": "3130101437",
            "name": "阿超",
            "department": "CS",
            "major": "SE"
        },{
            "id": "3130101437",
            "name": "阿超",
            "department": "CS",
            "major": "SE"
        }];
        for (var i = 0; i < jsonObj.length; i++) {
            var assistant_id= jsonObj[i].id;
            var assistant_name = jsonObj[i].name;
            var department = jsonObj[i].department;
            var major = jsonObj[i].major;
            tbody.innerHTML += "<tr><th>" + assistant_id + "</th><th>" + assistant_name + "</th><th>" + department + "</th><th>" + major + "</th><th><a href='delete_TA.php?assistant_id="+assistant_id+"'>删除</a></th></tr>"
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


function  deleteTA() {


}
