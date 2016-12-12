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

        //设置初始状态
        //加入队伍区
        $("#join_team_by_apply_pane").show();
        $("#join_team_by_pass_pane").hide();
    }
)
