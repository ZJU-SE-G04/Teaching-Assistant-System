/**
 * Created by achao_zju on 26/11/2016.
 */

//--------- 一些全局变量 ------
    //这些全局变量在进入用户进入课程后初始化

var class_id=1;
var course_name="软件工程管理";

var course_id="ABCDE1";
var class_time="周二345";

var user_name="zero";
var user_id="3140100000";

//--------- 显示当前课程的所有班级---------

function show_class() {


    document.getElementById("class_manage_course_name").innerHTML=course_name;
    

    $.ajax({
        type:"GET",
        url:"show_class.php?lesson_id="+course_id,
        success:function(result){
            jsonObj=result;



            var class_manage_select=document.getElementById("class_manage_select");

            if(class_manage_select.length>0){
                return;
            }

            var option;
            for (var i=0;i<jsonObj.length;i++){
                option=document.createElement("option");
                option.id=jsonObj[i].class_id;
                option.innerHTML=jsonObj[i].begin_time;
                if(i==0){
                    document.getElementById("class_manage_class_time").innerHTML=option.innerHTML;
                }
                class_manage_select.appendChild(option);
            }

        }
    }
    );

}

// -------- 选择不同班级,可以触发此函数 ----------

function change_class() {
    var class_manage_select=document.getElementById("class_manage_select");
    var index=class_manage_select.selectedIndex;

    class_time=class_manage_select[index].innerHTML;

    document.getElementById("class_manage_class_time").innerHTML=class_time;


}