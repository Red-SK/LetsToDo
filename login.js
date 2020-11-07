/**
 * Created by Kay on 2016/3/8.
 */
function login() {
 
    var username = document.getElementById("username");
    var pass = document.getElementById("password");
 
    if (username.value == "") {
 
        alert("请输入你的学号");
    } 
    else
    window.location.href="post.html";
}