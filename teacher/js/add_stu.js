/**
 * Created by achao_zju on 22/11/2016.
 */
//------------- 一些全局变量 -----------



var old_id_update_stu;

//---------------show students' info-----------------

function showStuInfo(){
    // $("#s-update-area").hide();
    // $("#s-add-area").hide();

    $.ajax({
        type:"GET",
        url:"show_stu_info.php?class_id="+class_id,
        success:function (result) {
            var stu_info_loop=$(".stu_info_loop");
            stu_info_loop.children(".new").remove();
            for (var i = 0; i < result.length; i++) {
                var x=result[i];
                var tmp=stu_info_loop.children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".s-stu-id").html(x.id);
                tmp.find(".s-stu-name").html(x.name);
                tmp.find(".s-depart").html(x.department);
                tmp.find(".s-major").html(x.major);
                tmp.find(".s-team-name").html(x.team_name);
                tmp.find(".s-delete").click(deleteStu);
                tmp.find(".s-update").click(addStuUpdate);
                stu_info_loop.append(tmp);
            }
        }
    });

}

//--------------- 增加 添加学生信息的 输入框-----------
//
//
// function addStuInput() {
//     var s_select=document.getElementById("addStuNumberSelect");
//     var index=s_select.selectedIndex;
//     var newAddStuNumber=s_select[index].value;//找到下拉框中值
//     if(newAddStuNumber==0){
//         return;
//     }
//     var s_add_in=$("#s-add-in");
//     s_add_in.children(".new").remove();
//     var i=0;
//     for (i = 0; i < newAddStuNumber; i++) {
//         var tmp = s_add_in.children(".old").clone().removeClass("old").addClass("new").show();
//
//         s_add_in.append(tmp);
//     }
//     s_add_in.parent().show();
//
// }

//----------- 取消输入框 ----------------
// function cancelStu() {
//     document.getElementById("stuInfo").removeChild(document.getElementById("deletedAddStu"));
//
// }



//-----------  将输入框的学生信息发送到后端,并处理返回结果---------------

function  addStu(){

    var t_stu_id=document.getElementsByClassName("s-add-id");
    var t_stu_name=document.getElementsByClassName("s-add-name");
    var t_stu_department=document.getElementsByClassName("s-add-depart");
    var t_stu_major=document.getElementsByClassName("s-add-major");

    var arr_value_id;
    var arr_value_name;
    var arr_value_department;
    var arr_value_major;

    var arr="";

    for(var i=0;i<t_stu_id.length;i++){

        arr_value_id=t_stu_id[i].value;
        alert(arr_value_id);
        arr=arr+"&id[]="+arr_value_id;

        arr_value_name=t_stu_name[i].value;
        arr=arr+"&name[]="+arr_value_name;

        alert(arr_value_name);


        arr_value_department=t_stu_department[i].value;
        arr=arr+"&department[]="+arr_value_department;

        alert(arr_value_department);


        arr_value_major=t_stu_major[i].value;
        arr=arr+"&major[]="+arr_value_major;
        alert(arr_value_major);




    }

    $.ajax({
        url:"add_stu.php?class_id="+class_id+arr,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==0){
                window.alert(jsonObj["error_message"]);

            }
            else {
                location.reload(true);
            }
        }
    });


}


//------------ delete a students' information -----------------


function deleteStu() {

    var tr=$(this).parent().parent();
    var stu_id=tr.children(":first").text();

    $.ajax({
        type:"GET",
        url:"delete_stu.php?class_id="+class_id+"&id="+stu_id,
        success:function (result) {
            var jsonObj=result;
            if(jsonObj["if_success"]==0){
                window.alert(jsonObj["error_message"]);
            }
            else {
                tr.remove();
                window.alert("删除成功");
            }
        }
    });
    
}

//--------------  add form for updating ------------------------

function addStuUpdate() {

    var s_one_info=$(this).parents(".s-one-info");
    s_one_info.parent().children().removeClass("s-choose");
    old_id_update_stu=s_one_info.children(":first").text();
    s_one_info.addClass("s-choose");
    $("#s-update-area").show();
    $("#update_TA_final").click(updateStu);
    
}


// ---------- 取消修改学生信息 -------------


function  cancelUpdateStu() {
   $("#s-update-area").hide();
}

// ---------- 向后端发送修改学生信息 -------------


function updateStu() {

    var s_update_in=$(this).parents("#s-update-area").children("#s-update-in");

    var id=s_update_in.find(".s-update-id").val();
    var name=s_update_in.find(".s-update-name").val();
    var depart=s_update_in.find(".s-update-depart").val();
    var major=s_update_in.find(".s-update-major").val();

    if(id==""||name==""||depart==""||major==""){
        alert("信息不能为空");
        return;
    }

    var arr="&id="+id+"&name="+name+"&department="+depart+"&major="+major;
    $.ajax({
        url:"update_stu.php?class_id="+class_id+"&old_id="+old_id_update_stu+arr,
        success:function(result){
            jsonObj = result;
            if(jsonObj["if_success"]==0) {
                alert(result["err_message"]);

            }
            else{
                window.alert("修改成功");
                var stu_info_loop=s_update_in.parents("#stuInfo").find(".stu_info_loop");
                var tmp=stu_info_loop.children(".old").clone().removeClass("old").addClass("new").show();
                tmp.find(".s-stu-id").html(id);
                tmp.find(".s-stu-name").html(name);
                tmp.find(".s-depart").html(depart);
                tmp.find(".s-major").html(major);
                tmp.find(".s-team-name").html("未组队");
                tmp.find(".s-delete").click(deleteStu);
                tmp.find(".s-update").click(addStuUpdate);
                stu_info_loop.append(tmp);
                stu_info_loop.children(".s-choose").remove();

                $("#s-add-area").hide();
            }
        }
    });


}
