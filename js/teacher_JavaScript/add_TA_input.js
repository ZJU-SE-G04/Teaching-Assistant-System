/**
 * Created by achao_zju on 15/11/2016.
 */

function  addTAInput() {
    var addTANumber=3;
    var newNode=document.createElement("h3");
    newNode.innerHTML="输入助教信息";
    var parent=document.getElementById("TAInfo");
    parent.appendChild(newNode);

    var newNodeForm=document.createElement("form");
    parent.appendChild(newNode);

    var newNodeDivRow=document.createElement("row");
    newNodeDivRow.className="row"
    parent.appendChild(newNodeDivRow);


    newNodeDivRow.innerHTML="<div class='col-sm-3'><label>学号</label> " +
        " </div> <div class='col-sm-3'> " + "<label >学号</label> " + "</div>" +
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


    var newNodeButton=document.createElement("button");
    parent.appendChild(newNodeButton);
    newNodeButton.type="button";
    newNodeButton.className="btn btn-primary";
    newNodeButton.id="add_stu_button";
    newNodeButton.innerHTML="确定录入";

    var disabledButton=document.getElementById("add_TA_button");
    disabledButtong.disabled=true;

}


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