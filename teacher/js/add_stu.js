

//---------------show students' info-----------------

function showStuInfo(){
    $("#stuInfo").find(".fileinput-upload-button").attr("onclick","add_stu_excel()");

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

// function  add_stu_excel() {
//     // var file=$("#stuInfo").find(".btn-file").find(".file").files[0];
//     // var file=document.getElementById("stuInfo").getElementsByClassName("file").get[0].files[0];
//     // var file=$("input[type='file']").val();
//     // console.log(file);
//
//
//         var formData = new FormData($( "#x-file-upload" )[0]);
//     console.log(formData);
//         $.ajax({
//             url: 'php/add_stu_excel.php' ,
//             type: 'POST',
//             data: json,
//             async: false,
//             cache: false,
//             contentType: false,
//             processData: false,
//             success: function (returndata) {
//                 alert(returndata);
//             }
//             // error: function (returndata) {
//             //     alert(returndata);
//             // }
//         });
//
//
// }