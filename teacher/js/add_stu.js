/**
 * Created by achao_zju on 22/11/2016.
 */
//------------- 一些全局变量 -----------



var old_id_update_stu;

//---------------show students' info-----------------

function showStuInfo(){

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

                stu_info_loop.append(tmp);
            }
        }
    });

}
