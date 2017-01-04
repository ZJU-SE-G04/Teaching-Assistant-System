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
                tmp.find(".t-update").click(getOldId);
                t_info_loop.append(tmp);
            }

        }
    });
    var t_add_in=t_add_area.children("#t-add-in");
    t_add_in.next().find("#t-add-final").click(addTA);//录入助教信息click
    
}



// ------------------添加助教信息,发送请求给后端-------------------

function addTA(){

    var id;
    var name;
    var depart;
    var major;
    var arr="";

    var t_add_in=$("#t-add-in");
        id=t_add_in.find(".t-add-id").val();
        arr=arr+"&id[]="+id;
        name=t_add_in.find(".t-add-name").val();
        arr=arr+"&name[]="+name;
        depart=t_add_in.find(".t-add-depart").val();
        arr=arr+"&department[]="+depart;
        major=t_add_in.find(".t-add-major").val();
        arr=arr+"&major[]="+major;
        if(id==""||name==""||depart==""||major==""){
            window.alert("信息不能为空");
            return;
        }
        console.log(arr);


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
                tmp.find(".t-name").html(name+'助教');
                tmp.find(".t-depart").html(depart);
                tmp.find(".t-major").html(major);
                tmp.find(".t-delete").click(deleteTA);
                tmp.find(".t-update").click(getOldId);
                $('#t-add-modal').modal('hide')
                t_info_loop.prepend(tmp);
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



function getOldId() {
    var t_one_info=$(this).parents(".t-one-info");
    var t_info_loop=t_one_info.parent();
    t_info_loop.find(".t-chosen").removeClass("t-chosen");
    t_one_info.addClass("t-chosen");
}


// ------------------update a TA's info-------------------------


function updateTA() {

    var t_update_in=$("#t-update-in");
    var id=t_update_in.find(".t-update-id").val();
    var name=t_update_in.find(".t-update-name").val();
    var depart=t_update_in.find(".t-update-depart").val();
    var major=t_update_in.find(".t-update-major").val();

    var t_chosen=$(".t-chosen");
    var old_id=t_chosen.find(".t-id");

    var arr="&id="+id+"&name="+name+"&department="+depart+"&major="+major;
    $.ajax({
        url:"update_TA.php?class_id="+class_id+"&old_id="+old_id+arr,
        success:function(res){
            if(res["if_success"]==0) {
                window.alert(res["err_message"]);
            }
            else{
                window.alert("修改成功");
                $('#t-update-modal').modal('hide');
                t_chosen.find(".t-id").html(id);
                t_chosen.find(".t-name").html(name);
                t_chosen.find(".t-depart").html(depart);
                t_chosen.find(".t-major").html(major);
            }
        }
    });
    

}




