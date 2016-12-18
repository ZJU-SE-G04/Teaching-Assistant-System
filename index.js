/**
 * Created by Rexxar on 2016/12/14.
 */
var isLogin;
var user_id;

function logged() {
    if (isLogin) {
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("info").style.display = "inline";

        var a = document.getElementById("hello");
        a.innerHTML = '你好，' + user_id + ' <span class="caret"></span>';
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
        {action: "login", user_id: "John", password: "xxx"},
        function (status) {
            // alert("this is login, status = " + status);
            if (status) {
                // alert("status is true");
                isLogin = true;
                // alert(id);
                // document.cookie = "user_id = " + id + ";";
                document.cookie = id;
                user_id = id;
                // alert("cookie: " + document.cookie);
                logged();
                location.reload();
            }
            else {
                isLogin = false;
                document.cookie = null;
                // $.cookie('user_id', null);
                alert("账户或密码不正确");
                logged();
            }
        }
    );

}


function init() {
    // document.cookie = null;
    // alert("init begins");
    user_id = document.cookie;
    if (user_id == "null") {
        // alert("cookie is null");
        isLogin = false;
    }
    else {
        // alert(user_id);
        $.post("index.php",
            {action: "isLogin", user_id: user_id},
            function (status) {
                // alert("log status is " + status);
                if (status) {
                    isLogin = true;
                    document.cookie = user_id;
                    // $.cookie('user_id', user_id);
                    logged();
                }
                else {
                    isLogin = false;
                    document.cookie = null;
                    // $.cookie('user_id', null);
                    logged();
                }
            }
        );
    }
}


window.onload = init;