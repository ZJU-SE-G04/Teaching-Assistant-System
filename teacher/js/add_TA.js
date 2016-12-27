/**
 * Created by achao_zju on 13/11/2016.
 */


//一些全局变量

var old_id_update_TA;//用于更新助教信息


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

    t_add_in.next().find("#t-add-final").click(addTA);
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


// ------------------取消修改助教信息------------------------



function  cancelTA() {
    $("#t-add-area").hide();
}

// ------------------show TAs' info-------------------------




function showTAInfo(){

    $("#t-update-area").hide();
    $("#t-add-area").hide();

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



// ------------------add a form  for updating TA-------------------------



function addTAUpdate(old_id) {
}


// ------------------取消修改助教信息-------------------------


function  cancelUpdateTA() {
    document.getElementById("TAInfo").removeChild(document.getElementById("updatedAddTA"));
}




