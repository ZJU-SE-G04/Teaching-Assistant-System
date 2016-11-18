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
    newNodeForm.id="addedForm"
    parent.appendChild(newNodeForm);

    var newNodeDivRow=document.createElement("div");
    newNodeDivRow.className="row"
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