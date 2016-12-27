/**
 * Created by achao_zju on 13/11/2016.
 */


//一些全局变量

var old_id_update_TA;//用于更新助教信息


// ------------------show TAs' info-------------------------




function showTAInfo(){

    var t_add_area=$("#t-add-area");
    var t_update_area=t_add_area.next();
    t_add_area.hide();
    t_update_area.hide();

    $.ajax({
        url:"show_TA_info.php?class_id="+class_id,
        success:function(result){


            var t_info_loop=$("#t-info-loop");
            t_info_loop.children(".new").remove();
            for (var i = 0; i < result.length; i++) {
                var x=result[i];
                var tmp=t_info_loop.children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".t-id").html(x.id);
                tmp.find(".t-name").html(x.name);
                tmp.find(".t-depart").html(x.department);
                tmp.find(".t-major").html(x.major);
                tmp.find(".t-delete").click(deleteTA);
                tmp.find(".t-update").click(addTAUpdate);
                t_info_loop.append(tmp);
            }

        }
    });
    var t_add_in=t_add_area.children("#t-add-in");
    t_add_in.next().find("#t-add-final").click(addTA);
    t_add_in.next().find("#t-add-cancel").click(function () {
        t_add_area.hide();
    });
    t_update_area.find("#t-update-cancel").click(function () {
        t_update_area.hide();
    })


}


// ------------------添加输入框，输入框用于添加助教信息-------------------

function  addTAInput() {
    var t_select=document.getElementById("t-select");
    var index=t_select.selectedIndex;
    var num=t_select[index].value;//找到下拉框中值

    if(num==0){
        $("#t-add-area").hide();
        return;
    }
    var t_add_in=$("#t-add-in");
    t_add_in.children(".new").remove();
    var i=0;
    for (i = 0; i < num; i++) {
        var tmp = t_add_in.children(".old").clone().removeClass("old").addClass("new").show();
        t_add_in.append(tmp);
    }
    t_add_in.parent().show();


}

// ------------------添加助教信息,发送请求给后端-------------------




function addTA(){

    var id;
    var name;
    var depart;
    var major;
    var arr="";

    var t_add_in=$(this).parents("#t-add-area").children("#t-add-in");
    t_add_in.children(".new").each(function (i) {
        id=$(this).find(".t-add-id").val();
        arr=arr+"&id[]="+id;
        name=$(this).find(".t-add-name").val();
        arr=arr+"&name[]="+name;
        depart=$(this).find(".t-add-depart").val();
        arr=arr+"&department[]="+depart;
        major=$(this).find(".t-add-major").val();
        arr=arr+"&major[]="+major;
        if(id==""||name==""||depart==""||major==""){
            window.alert("信息不能为空");
            return;
        }
        console.log(arr);

    });


    $.ajax({
        url:"add_TA.php?class_id="+class_id+arr,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==0){
                alert(jsonObj["error_message"]);
            }
            else {
                alert("添加成功");
                var t_info_loop=$("#t-info-loop");
                var tmp=t_info_loop.children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".t-id").html(id);
                tmp.find(".t-name").html(name);
                tmp.find(".t-depart").html(depart);
                tmp.find(".t-major").html(major);
                tmp.find(".t-delete").click(deleteTA);
                tmp.find(".t-update").click(addTAUpdate);
                t_info_loop.append(tmp);
                t_info_loop.children(".s-choose").remove();

                $("#t-add-area").hide();
            }
        }
    })

}








// ------------------delete  a TA's info-------------------------


function deleteTA() {


    var tr=$(this).parent().parent();
    var t_id=tr.children(":first").text();

    $.ajax({
        type:"GET",
        url:"delete_TA.php?class_id="+class_id+"&id="+t_id,
        success:function (result) {
            if(result["if_success"]==0){
                window.alert(result["error_message"]);
            }
            else {
                tr.remove();
                window.alert("删除成功");
            }
        }
    });
}



// ------------------add a form  for updating TA-------------------------



function addTAUpdate() {
    var t_one_info=$(this).parents(".t-one-info");
    t_one_info.parent().children().removeClass("t-choose");
    old_id_update_stu=t_one_info.children(":first").text();
    t_one_info.addClass("t-choose");
    $("#t-update-area").show();
    $("#t-info-loop").append("<tr class='test'><th class='t-id'><input class='form-control'></th><th class='t-name'></th><th class='t-depart'></th><th class='t-major'></th> " +
        "<th><a class='glyphicon glyphicon-trash t-delete'></a></th> " +
        "<th><a class='glyphicon glyphicon-edit t-update'></a></th> " +
        "</tr>");
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
            }
            else{
                window.alert("修改成功");
                location.reload(true);
            }
        }
    });
    

}




$(document).ready(function(){
    var tds =$("td");
    tds.click(tdclick);
});

function tdclick(){
    var td =$(this);
    var tdtext =td.text();
    td.html("");
    var inputtext =$("<input>");
    inputtext.attr("value",tdtext);

    inputtext.keyup(function(event){
        var keycode = event || window.event;
        var code =keycode.keyCode;
        if(code == 13){
            var inputtext =$(this);
            var tdtext =inputtext.val();
            var ts =inputtext.parent();
            ts.html(tdtext);
            ts.click(tdclick);
        }

    });

    td.append(inputtext);
    var aa =inputtext.get(0);
    aa.select();
    td.unbind();

};



