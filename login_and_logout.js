/**
 * Created by Rexxar on 2016/12/14.
 */
var IsLogin;

function logged() {
    if (IsLogin) {
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("info").style.display = "inline";
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

    IsLogin = true;

    logged();
}
function init() {
    IsLogin = false;

    logged();
}


window.onload = init;