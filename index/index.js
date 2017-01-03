/**
 * Created by Rexxar on 2016/12/14.
 */
var isLogin;
var user_id, user_name;

function logged() {
    if (isLogin) {
        user_name = $.cookie('user_name');
        // document.getElementById("register").style.display = "none";//因为不需要注册
        document.getElementById("login").style.display = "none";
        document.getElementById("info").style.display = "inline";

        var a = document.getElementById("hello");
        a.innerHTML = '你好，' + user_name + ' <span class="caret"></span>';
    }
    else {
        // document.getElementById("register").style.display = "inline";//因为不需要注册,
        document.getElementById("login").style.display = "inline";
        document.getElementById("info").style.display = "none";
    }
}

function jumpToLesson(data) {
    var lessonId = data.getAttribute("data-id");
    $.post(
        "home.php",
        {action: "jump_to_lesson", user_id:user_id, lesson_id:lessonId },
        function (url) {
            // window.location.href = url; 
            window.open(url);
        }
    );
}

function login() {
    var id = document.getElementById("id").value;
    var password = document.getElementById("password").value;

    $.post("home.php",
        {action: "login", user_id: id, password: password},
        function (status) {
            if (status) {
                // alert(status);
                $.cookie('user_name', status);
                isLogin = true;
                $.cookie('user_id', id);
                user_id = id;
                user_name = status;
                logged();
                location.reload();
            }
            else {
                isLogin = false;
                $.cookie('user_id', null);
                alert("账户或密码不正确");
                logged();
            }
        }
    );

}

function logout() {
    $.cookie('user_id', null);
    isLogin = false;
    $.post("home.php",
        {action: "logout", user_id: user_id},
        function (status) {
            location.reload();
        }
    );
}


function init() {
    user_id = $.cookie('user_id');
    if (user_id == "null") {
        isLogin = false;
        logged();
    }
    else {
        $.post("home.php",
            {action: "isLogin", user_id: user_id},
            function (status) {
                if (status) {
                    isLogin = true;
                    logged();
                }
                else {
                    isLogin = false;
                    $.cookie('user_id', null);
                    logged();
                }
            }
        );
    }
}


window.onload = init;



//-----added by achao below---
function  giveId() {
    $('#login_detail').modal('hide');
    $('#fe_pwd_modal').modal('show');
    $("#fe_pwd_modal").find(".modal-title").html("步骤1:输入用户名");
    $("#fe_give_id").show();
    $('#fe_answer_question').hide();
    $('#reset_pwd').hide();
}
function  giveIdBa() {
    $('#login_detail').modal('show');
    $('#fe_pwd_modal').modal('hide');

}
function  answerQuestion() {
    var id=$("#fe_id").val();
    console.log(id);
    // $('#fe_give_id').hide();
    // $('#fe_answer_question').show();
    // $("#fe_pwd_modal").find(".modal-title").html("步骤2:回答密保问题");

    $.ajax({
        url:"index/php/fetch_question.php?id="+id,
        success:function (res) {
            if(res["if_success"]==0){
                window.alert(res["err_message"]);
            }else {
                // console.log(res['question']);
                // console.log(res["if_success"]);

                $('#fe_give_id').hide();
                $('#fe_answer_question').show();
                $('#fe_question').html(res['question']);
                $("#fe_pwd_modal").find(".modal-title").html("步骤2:回答密保问题");
            }
        }
    });

}
function answerQuestionBa() {
    $('#fe_give_id').show();
    $('#fe_answer_question').hide();
    $("#fe_pwd_modal").find(".modal-title").html("步骤1:输入用户名");

}
function  verifyQuestion() {
    var id=$("#fe_id").val();
    var answer=$("#fe_answer").val();
    console.log(answer);

    // $('#reset_pwd').show();
    // $('#fe_answer_question').hide();

    $.ajax({
        url:"index/php/verify_question.php?id="+id+"&answer="+answer,
        success:function (res) {
            if(res["if_success"]==0){
                window.alert(res["err_message"]);
            }else {
                $("#fe_pwd_modal").find(".modal-title").html("步骤3:重置密码");
                $('#reset_pwd').show();
                $('#fe_answer_question').hide();

            }
        }
    });
}
function  resetPwd() {
    var id=$("#fe_id").val();
    var new_pwd=$("#new_pwd").val();
    var re_new_pwd=$("#re_new_pwd").val();
    if(new_pwd!=re_new_pwd){
        window.alert("两次密码输入不一致");
        return;
    }
    // window.alert("重置密码成功,请牢记您的密码");
    // $('#fe_pwd_modal').modal("hide");

    $.ajax({
        url:"index/php/reset_pwd.php?id="+id+"&new_pwd="+new_pwd,
        success:function (res) {
            if(res["if_success"]==0){
                window.alert(res["err_message"]);
            }else {
                window.alert("重置密码成功,请牢记您的密码");
                $('#fe_pwd_modal').modal("hide");
            }
        }
    });

}