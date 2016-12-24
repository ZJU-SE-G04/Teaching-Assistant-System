/**
 * Created by dddong on 16/12/9.
 */

$(document).ready(
    function () {

//        $("#mod_pass_submit_btn").click(function () {
//        })
        $(".alert").bind("closed.bs.alert", function () {
            alert("警告框被关闭");

        })


        /****************************************创建队伍*************************************/

        function check_if_in_team() {
            $.get("check_if_stu_in_team.php", function (data, status) {
                if(data['state'] == 0) {
                    //已经加入队伍
                    $("#create_team_form").hide();
                    $("#you_have_joined_team").show();
                    $("#you_have_joined_team").html($("<p class='alert alert-info'>你已经加入队伍" + "<a class='alert-link' style='margin-left: 3px'>" + data['teamName'] + "</a></p>"));
                } else {
                    $("#create_team_form").show();
                    $("#you_have_joined_team").hide();
                }
            })
        }
        $("a[href='#create_team_pane']").click(check_if_in_team);


        /****************************************加入队伍*************************************/

        $("a[href='#join_team_pane']").click(function () {

            $.get("check_if_stu_in_team.php", function (data, status) {
                if(data['state'] == 0) {
                    //已经加入队伍
                    $("#join_team_by_apply_pane").hide();
                    $("#join_team_by_pass_pane").hide();
                    $("#have_joined_team_pane").show();
                    $("#have_joined_team_pane").html($("<p class='alert alert-info'>你已经加入队伍" + "<a class='alert-link' style='margin-left: 3px'>" + data['teamName'] + "</a></p>"));
                } else {
                    $("#join_team_by_apply_pane").show();
                    $("#join_team_by_pass_pane").hide();
                    $("#have_joined_team_pane").hide();

                    $.get("fetch_all_team.php", function (data, status) {
                        $("#join_team_table>tbody").children().remove();
                        for(var i = 0; i < data.length; i++) {
                            var tr = $("<tr></tr>").append($("<td></td>").text(data[i].teamName));
                            tr.attr("teamID", data[i].teamID);
                            tr.append($("<td></td>").text(data[i].joined + "/" + data[i].max));
                            tr.append($("<td></td>").html($("<a></a>").text("申请加入").click(function () {
                                var teamID = $(this).parent().parent().attr("teamID");
                                $.get("apply_for_team.php?teamID=" + teamID, function (data) {
                                    alert(data['msg']);
                                })
                            })));
                            $("#join_team_table>tbody").append(tr);
                        }

                    });
                }
            });
        });

        //点击直接加入队伍的连接，通过团队名字和密码加入
        $("#direct_join_team_link").click(function () {
            $("#join_team_by_apply_pane").hide();
            $("#join_team_by_pass_pane").show();
        })


        // //显示加入队伍主界面
        // $("a[href='#join_team_pane']").click(function () {
        //     $("#join_team_by_apply_pane").show();
        //     $("#join_team_by_pass_pane").hide();
        // });



        /****************************************处理入队申请*************************************/
        $("a[href='#deal_with_team_apply_pane']").click(function () {
            $.get("list_team_applications.php", function (data, status) {
                if(data['state'] == 0) {
                    $("#deal_with_team_apply_pane").html("");
                    for(var i = 0; i < data['result'].length; i++) {
                        var each = data['result'][i];
                        console.log(each);
                        var panel= $("<div class='panel panel-default'></div>")
                        var panel_body = $("<div class='panel-body'></div>");
                        panel_body.append($("<span></span>").append($("<a></a>").append(each['username']).append($("<span class='no-color'></span>").text(" 申请加入队伍")).attr("userid", each['uid'])));
                        var agree_btn = $("<a style='margin-right: 5px'>同意</a>").click(function () {
                            var userid = $(this).parent().prev().children().attr("userid");
                            $.get("deal_with_team_application.php?uid=" + userid + "&agree=1", function (data) {
                                alert(data['msg']);
                            });
                            $(this).parent().parent().parent().remove();    //移除这条入队申请
                        });
                        var refuse_btn = $("<a>拒绝</a>").click(function () {
                            var userid = $(this).parent().prev().children().attr("userid");
                            $.get("deal_with_team_application.php?uid=" + userid + "&agree=0", function (data) {
                                alert(data['msg']);
                            });

                            $(this).parent().parent().parent().remove();    //移除这条入队申请
                        });
                        panel_body.append($("<div class='right'></div>").append(agree_btn).append(refuse_btn));
                        panel.append(panel_body);
                        $("#deal_with_team_apply_pane").append(panel);
                    }
                } else if(data['state'] == 1) {
                        alert("你不是队长");
                }
            })
        })

        /********************************获取通知***********************************/
        $("a[href='#notice_pane']").click(function () {
            $.get("fetch_all_msg.php", function (data) {
                $("#notice_pane").html("");
                var alert_div = $("<div class='alert-info alert'></div>");
                for(var i = 0; i < data.length; i++) {
                    alert_div.attr("msg_id", data[i].id);
                    alert_div.html("");
                    alert_div.append($("<a class='close' type='button' data-dismiss='alert'></a>"))
                    alert_div.append(data[i].msg);
                    $("#notice_pane").append(alert_div);
                }
            })
        })
        //设置初始状态

        //创建队伍区
        $("#create_team_form").show();
        $("#you_have_joined_team").hide();
        //加入队伍区
        $("#join_team_by_apply_pane").show();
        $("#join_team_by_pass_pane").hide();
    }
)
