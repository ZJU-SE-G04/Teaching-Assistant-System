/**
 * Created by Rexxar on 2016/12/14.
 */
var isLogin;
var user_id, user_name;

function logged() {
    if (isLogin) {
        user_name = $.cookie('user_name');
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("info").style.display = "inline";

        var a = document.getElementById("hello");
        a.innerHTML = '你好，' + user_name + ' <span class="caret"></span>';
    }
    else {
        document.getElementById("register").style.display = "inline";
        document.getElementById("login").style.display = "inline";
        document.getElementById("info").style.display = "none";
    }
}

function login() {
    var id = document.getElementById("id").value;
    var password = document.getElementById("password").value;

    $.post("index.php",
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
    $.post("index.php",
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
        $.post("index.php",
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