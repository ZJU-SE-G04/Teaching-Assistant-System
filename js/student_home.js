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
                    //是队长
                    $("#create_team_form").hide();
                    $("#you_have_joined_team").show()
                    $("#you_have_joined_team").html($("<p>你已经加入队伍" + data['teamName'] + "</p>"));
                } else {
                    $("#create_team_form").show();
                    $("#you_have_joined_team").hide();
                }
            })
        }
        $("a[href='#create_team_pane']").click(check_if_in_team);
        $("a[href='#join_team_pane']").click(function () {

            $.get("check_if_stu_in_team.php", function (data, status) {
                if(data['state'] == 0) {
                    //是队长
                    $("#join_team_by_apply_pane").hide();
                    $("#join_team_by_pass_pane").hide();
                    $("#have_joined_team_pane").show()
                    $("#have_joined_team_pane").html($("<p>你已经加入队伍" + data['teamName'] + "</p>"));
                } else {
                    $("#join_team_by_apply_pane").show();
                    $("#join_team_by_pass_pane").show();
                    $("#have_joined_team_pane").hide()
                }
            })
        });

        /****************************************加入队伍*************************************/
        //点击直接加入队伍的连接，通过团队名字和密码加入
        $("#direct_join_team_link").click(function () {
            $("#join_team_by_apply_pane").hide();
            $("#join_team_by_pass_pane").show();
        })

        //显示加入队伍主界面
        $("a[href='#join_team_pane']").click(function () {
            $("#join_team_by_apply_pane").show();
            $("#join_team_by_pass_pane").hide();
        });



        /****************************************处理入队申请*************************************/
        $("a[href='#deal_with_team_apply_pane']").click(function () {
            $.get("list_team_applications.php", function (data, status) {
                if(data['state'] == 0) {
                    for(var each in data['result']) {
                        var panel= $("<div class='panel panel-default'></div>")
                        var panel_body = $("<div class='panel-body'></div>");
                        panel_body.append($("<span></span>").append($("<a></a>").text(each['username']).attr("userid", each['uid'])));
                        panel_body.append($("<div class='right'><a>同意</a><a>拒绝</a></div>"));
                        panel.append(panel_body);
                        $("#deal_with_team_apply_pane").append(panel);
                    }
                } else if(data['state'] == 1) {
                        alert("你不是队长");
                }
            })
        })

        //设置初始状态

        //创建队伍区
        $("#create_team_form").hide();
        $("#you_have_joined_team").show();
        //加入队伍区
        $("#join_team_by_apply_pane").show();
        $("#join_team_by_pass_pane").hide();
    }
)
