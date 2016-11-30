/**
 * Created by achao_zju on 26/11/2016.
 */

var class_id=1;

function show_class() {
    var course_name="茶与健康";
    var class_time="周二78节周四12节";

    document.getElementById("class_manage_course_name").innerHTML=course_name+":&nbsp&nbsp";
    document.getElementById("class_manage_class_time").innerHTML=class_time;





}

function change_class() {
    var class_manage_select=document.getElementById("class_manage_select");
    var index=class_manage_select.selectedIndex;
    window.alert(index);
    var class_time=class_manage_select[index].value;

    document.getElementById("class_manage_class_time").innerHTML=class_time;


}