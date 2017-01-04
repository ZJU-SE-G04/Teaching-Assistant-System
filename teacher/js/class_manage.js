//--------- 一些全局变量 ------
//这些全局变量在get_notice.js中初始化初始化

var class_id;
var class_time;

var course_name;
var course_id;
var user_name;
var user_id;
var level;



//--------- 显示当前课程的所有班级---------

function show_class() {
    
    document.getElementById("class_manage_course_name").innerHTML=course_name;

    $(".x-class-manage-btn").click(change_class);


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
    class_id=class_manage_select[index].id;

    $("#class_manage_class_time").text(class_time);

    $(".x-class-time").text(class_time);


}
//-----根据course_id初始class_id----
//这个函数在页面加载时被调用

function show_class_init() {
    $.ajax({
            url:"show_class.php?lesson_id="+course_id,
            success:function(result){
                for (var i=0;i<1;i++){
                    class_id=result[i].class_id;
                    class_time=result[i].begin_time;
                }
                $(".x-class-time").text(class_time);
            }
        }
    );

}