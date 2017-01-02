/**
 * Created by achao_zju on 2017/1/1.
 */

$("#c-upload-file").fileinput({//bootstrap异步上传文件
    language: 'zh',
    uploadUrl: "../courseware_mod/php/upload.php", //异步上传地址
    maxFileCount: 1, //上传数量限制
    // allowedFileExtensions: ['ppt','pptx'],//无限制
    uploadExtraData: function(previewId, index) {   //额外参数的关键点
        var c_kind_select=document.getElementById("c-kind-select");
        var index=c_kind_select.selectedIndex;
        var kind=c_kind_select[index].innerHTML;
        console.log(kind);
        var data ={
            course_id:course_id,
            courseware_kind:kind
        };
        return data;
    }

    //previewFileIcon: "<i class='glyphicon glyphicon-king'></i>" //选择文件后缩略图
}).on("fileuploaded", function (event, data) {
    c_show_courseware();
    //异步上传后返回结果处理
    //后台一定要返回json对象,空的也行。否则会出现提示警告。
    //返回对象的同时会显示进度条，可以根据返回值进行一些功能扩展

});

function c_show_courseware() {
    $.ajax({
        url: "get_courseware.php?courseID=" + course_id,
        async: false,
        success: function (result, status) {
            $("#courseware_nonpreview_area").show();
            $("#courseware_pane .courseware_list").html("");
            $("video").remove();
            for (var i = 0; i < result.length; i++) {
                var item = result[i];
                var item_kind = item["courseware_kind"];
                var list_ele;
                switch (item_kind) {
                    case "课件":
                        list_ele = $("#course_ppts_list");
                        break;
                    case "模板":
                        list_ele = $("#tpls_list");
                        break;
                    case "参考资料":
                        list_ele = $("#refMaterial_list");
                        break;
                    case "以往优秀作业":
                        list_ele = $("#past_hw_list");
                        break;
                    case "教学视频":
                        list_ele = $("#teach_video_list");
                        break;
                    case "教学音频":
                        list_ele = $("#teach_audio_list");
                        break;
                    default:
                        console.log("课件资料类型错误\n");
                        break;
                }
                var item_ele = $("<div class='each_datum'></div>");
                var preview_link = $("<a></a>").attr("title", item['courseware_link']).text(item['courseware_name']);

                //如果是视频
                if (item_kind === "教学视频") {
                    preview_link.click(function () {
                        window.open("/Teaching-Assistant-System/courseware_mod/watch_video.html?vid=" + $(this).attr("title")+$(this).text());
                        // window.open("watch_video/watch_video.html?vid=/Teaching-Assistant-System/file/video/seven.mp4");

                    })
                }
                // //如果是ppt
                // if (item_kind === "课件") {
                //     // preview_link
                //     //TODO
                // }
                item_ele.append(preview_link);
                var download_area = $("<div class='download-btn right'></div>");
                var download_link = $("<a></a>").attr("href", item['courseware_link']+item['courseware_name']).attr("download", item['courseware_name']);
                download_link.append($("<span class='glyphicon-download glyphicon'></span>"));
                download_area.append(download_link);

                //-----add by achao----
                var c_delete_area = $("<div class='download-btn right' style='margin-left: 10px;margin-top: 5px'></div>");
                c_delete_area.append($("<span class='glyphicon-trash glyphicon c-trash'></span>"));
                c_delete_area.find(".c-trash").click(function () {
                    $(this).parents(".each_datum").remove();
                    var id=$(this).parents(".each_datum").find(".c-id").text();
                    $.ajax({
                        url: "../courseware_mod/php/delete_ware.php?ware_id=" + id,
                        success: function (result) {

                        }
                    });
                });
                item_ele.append(c_delete_area);
                var c_id=$("<div class='c-id' style='display: none'></div>");//c-id存储课件id
                c_id.html(item['courseware_id']);
                item_ele.append(c_id);
                //----------------


                item_ele.append(download_area);
                list_ele.append(item_ele);

            }

        }
    });
    
}