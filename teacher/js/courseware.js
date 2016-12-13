/**
 * Created by achao_zju on 07/12/2016.
 */

$(document).ready(
    function () {

        

        //课件资料页面改变下拉列表项的箭头
        $(".titleBox").click(function () {
                var content = $(this).next();
                var arrow_btn = $(this).children()[0];
                content.toggle();
                if (content[0].style.display == 'none') {
                    arrow_btn.className = "glyphicon glyphicon-menu-up";
                } else {
                    arrow_btn.className = "glyphicon glyphicon-menu-down";
                }
            }
        );

        $("a[href='#courseware_pane']").click(function () {
            $.ajax({
                url: "get_courseware.php?courseID=" + course_id,
                success: function (result, status) {
                    $("#courseware_nonpreview_area").show();
                    $("#courseware_pane .courseware_list").html("");
                    $("video").remove();
                    for(var i = 0; i < result.length; i++) {
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
                        var preview_link = $("<a></a>").text(item['courseware_name']);

                        //如果是视频
                        if(item_kind === "教学视频") {
                            preview_link.click(function () {
                                var video_area = $("<video id='my-video' class='video-js' controls preload='auto' width='1280' height='528' data-setup='{}'></video>");
                                video_area.css("width", 800).css("height", "450");
                                video_area.append($("<source>").attr("src", item['courseware_link']));
                                video_area.append($('<p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>'));
                                $("#courseware_nonpreview_area").hide();

                                $("#courseware_pane video").remove();
                                $("#courseware_pane").append(video_area);
                            })
                        }
                        //如果是ppt
                        if(item_kind == "课件") {
                            preview_link
                            //TODO
                        }
                        item_ele.append(preview_link);
                        var download_area = $("<div class='download-btn right'></div>");
                        var download_link = $("<a></a>").attr("href", item['courseware_link']);
                        download_link.append($("<span class='glyphicon-download glyphicon'></span>"));
                        download_area.append(download_link);
                        item_ele.append(download_area);
                        list_ele.append(item_ele);

                    }

                }
            });
            $(".courseware_list").hide();
        });
        $("#choose_posts_catagory ul li a").click(function () {
            $("#posts_catagory_ddMenu div").html($(this).html());
        });


    }
);