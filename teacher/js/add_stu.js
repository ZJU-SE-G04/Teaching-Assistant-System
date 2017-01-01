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
fodderType = function() {
    return class_id;
};


$("#x-upload-file").fileinput({//bootstrap异步上传文件
    language: 'zh',
    uploadUrl: "php/add_stu_excel.php", //异步上传地址
    maxFileCount: 1, //上传数量限制
    allowedFileExtensions: ['xls'],
    uploadExtraData: function(previewId, index) {   //额外参数的关键点
        var data ={
            argu:class_id
        };
        return data;
    }

    //previewFileIcon: "<i class='glyphicon glyphicon-king'></i>" //选择文件后缩略图
}).on("fileuploaded", function (event, data) {
   res=data.response;
    var stu_info_loop=$(".stu_info_loop");
    stu_info_loop.children(".new").remove();
    for (var i = 0; i < res.length; i++) {
        var x=res[i];
        var tmp=stu_info_loop.children(".old").clone().removeClass("old").addClass("new").show();
        tmp.find(".s-stu-id").html(x.id);
        tmp.find(".s-stu-name").html(x.name);
        tmp.find(".s-depart").html(x.department);
        tmp.find(".s-major").html(x.major);
        tmp.find(".s-team-name").html(x.team_name);
        stu_info_loop.append(tmp);
    }
    //异步上传后返回结果处理
    //后台一定要返回json对象,空的也行。否则会出现提示警告。
    //返回对象的同时会显示进度条，可以根据返回值进行一些功能扩展

});

