/**
 * Created by achao_zju on 13/11/2016.
 */
function addTA() {

    var inputNumber=3;

    var tab=document.getElementById("TAInfoTable");
    var colsNum=tab.rows.item(0).cells.length;   //表格的列数
    var rownum=tab.rows.length;//表格当前的行数

    for(var j=0;j<inputNumber;j++){
        tab.insertRow(rownum+j);
        for(var i=0;i<colsNum; i++) {
            tab.rows[rownum+j].insertCell(i);//插入列
        }

        tab.rows[rownum+j].cells[0].innerHTML = "<b>3130101437</b>";
        tab.rows[rownum+j].cells[1].innerHTML = "<b>特朗普</b>";
        tab.rows[rownum+j].cells[2].innerHTML = "<b>房地产设计院</b>";
        tab.rows[rownum+j].cells[3].innerHTML = "<b>建筑景观</b>";
    }
    
}

/**
 * Created by achao_zju on 15/11/2016.
 */



function  addTAInput() {
    var addTANumber=3;
    var parent=document.createElement("div");
    parent.id="deletedAddTA";
    var grandparent=document.getElementById("TAInfo");
    grandparent.appendChild(parent);
    var newNode=document.createElement("h3");
    newNode.innerHTML="输入助教信息";
    parent.appendChild(newNode);

    var newNodeForm=document.createElement("form");
    newNodeForm.id="addedForm";
    parent.appendChild(newNodeForm);

    var newNodeDivRow=document.createElement("div");
    newNodeDivRow.className="row";
    parent.appendChild(newNodeDivRow);


    newNodeDivRow.innerHTML="<div class='col-sm-3'><label>学号</label> " +
        " </div> <div class='col-sm-3'> " + "<label >姓名</label> " + "</div>" +
        " <div class='col-sm-3'> <label>院系</label>  </div>" +
        " <div class='col-sm-3'> <label >专业</label> </div>";


    for(var i=0;i<addTANumber;i++){
        var child=document.createElement("div");
        child.className="row";
        child.innerHTML="<div class='col-sm-3'><input class='form-control' placeholder='学号'> " +
            "</div> <div class='col-sm-3'> <input class='form-control'  placeholder='姓名'>" +
            " </div> <div class='col-sm-3'> <input class='form-control' placeholder='院系'> " +
            "</div> <div class='col-sm-3'> <input class='form-control' placeholder='专业'></div>";
        parent.appendChild(child);
    }


    var newNodeButton=document.createElement("div");
    newNodeButton.className="row";
    parent.appendChild(newNodeButton);
    newNodeButton.innerHTML= " <div class='col-sm-9'>"+
        "<button type='button'  class='btn btn-primary' id='cancel_TA_button' onclick='cancelTA()'>取消录入</button></div>"+
        " <div class='col-sm-3'>"+
        " <button type='button'  class='btn btn-primary' id='add_TA_final'>确定录入</button></div>";

    var disabledButton=document.getElementById("add_TA_button");
    disabledButton.disabled=true;

}


function  cancelTA() {


    var parent=document.getElementById("TAInfo");
    var child=document.getElementById("deletedAddTA");
    var x=parent.removeChild(child);
    var disabledButton=document.getElementById("add_TA_button");
    disabledButton.disabled=false;

    // document.write("a");
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

    var exist=document.getElementById("TAInfoTable");
    if(exist==null) {


        var table = document.createElement("table");
        table.className = "table table-striped";
        table.id = "TAInfoTable";
        table.innerHTML = "<tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>操作</th></tr>";


        var jsonObj = [{
            "assistant_id": "3130101437",
            "assistant_name": "阿超",
            "department": "CS",
            "major": "SE"
        }, {"assistant_id": "3130101437", "assistant_name": "阿超", "department": "CS", "major": "SE"}];
        for (var i = 0; i < jsonObj.length; i++) {
            var assistantID = jsonObj[i].assistant_id;
            var assistantName = jsonObj[i].assistant_name;
            var department = jsonObj[i].department;
            var major = jsonObj[i].major;
            table.innerHTML += "<tr><th>" + assistantID + "</th><th>" + assistantName + "</th><th>" + department + "</th><th>" + major + "</th><th><a href='delete_TA.php?assistantID=$assistantID'>删除</a></th></tr>"


        }
        var parent = document.getElementById("TAInfo");
        var afterNode = document.getElementById("TA_info_row");
        parent.insertBefore(table, afterNode);

    }

}

// <table class="table table-striped" id="TAInfoTable">
//     <tr><th>学号</th><th>姓名</th><th>院系</th><th>专业</th><th>操作</th></tr>
//     <tr><th>3130101437</th><th>章世超</th><th>计算机学院</th><th>软件工程</th><th>删除</th></tr>
//     <tr><th>3130101437</th><th>章世超</th><th>计算机学院</th><th>软件工程</th><th>删除</th></tr>
// </table>


// -------------------------delete the info of a TA------------------------




// <form>
// <div class="row">
//     <div class="col-sm-3">
//     <label for="stu_id">学号</label>
//     <input class="form-control" id="stu_id" placeholder="学号">
//     </div>
//     <div class="col-sm-3">
//     <label for="stu_name">学号</label>
//     <input class="form-control" id="stu_name" placeholder="姓名">
//     </div>
//     <div class="col-sm-3">
//     <label for="stu_college">院系</label>
//     <input class="form-control" id="stu_college" placeholder="院系">
//     </div>
//     <div class="col-sm-3">
//     <label for="stu_major">专业</label>
//     <input class="form-control" id="stu_major" placeholder="专业">
//     </div>
//
//
//
//     </div>
//
//
//     <button type="button"  class="btn btn-primary" id="add_stu_button" onclick="addTA()">确定录入</button>
//     </form>

