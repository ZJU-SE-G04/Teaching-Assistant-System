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

function test() {

    //找到所有名字的单元格a
    var name = $("tbody th:even");
    //给这些单元格注册鼠标点击事件
    name.click(function () {


        //找到当前鼠标单击的td
        var tdObj = $(this);
        //保存原来的文本
        var oldText = $(this).text();
        //创建一个文本框
        var inputObj = $("<input type='text' value='" + oldText + "'/>");
        //去掉文本框的边框
        inputObj.css("border-width", 0);
        inputObj.click(function () {
            return false;
        });
        //使文本框的宽度和td的宽度相同
        inputObj.width(tdObj.width());
        inputObj.height(tdObj.height());
        //去掉文本框的外边距
        inputObj.css("margin", 0);
        inputObj.css("padding", 0);
        inputObj.css("text-align", "center");
        inputObj.css("font-size", "16px");
        inputObj.css("background-color", tdObj.css("background-color"));
        //把文本框放到td中
        tdObj.html(inputObj);
        //文本框失去焦点的时候变为文本
        inputObj.blur(function () {
            var newText = $(this).val();
            tdObj.html(newText);
        });
        //全选
        inputObj.trigger("focus").trigger("select");
    });
};