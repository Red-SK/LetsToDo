<%@ page contentType="text/html; charset=utf-8"%>
<html>
<head>
</head>
<body>
<div align="center" style="padding-top: 2em">
    <span style="font-size: 3em">用户登录/LOGIN</span> <br>
    ——————————————————————
    <form action="loginCheck.jsp" method="post">
        <table style="padding-left: 1em;">
            <tr>
                <td>用户名：</td>
                <td><input type=text name=name />
                </td>
            </tr>
            <tr>
                <td>密&nbsp;&nbsp;&nbsp;码：</td>
                <td><input type="password" name="password" />
                </td>
            </tr>
        </table>
        <table style="padding-left: 0.6em">
            <tr>
                <td> <input
                        type=radio name=type value=teacher>教师 <input type=radio name=type value=student checked>学生 </td>
            </tr>
            <tr>
                <td><input type="submit" value="登录" /> <input type="reset" value="重置" />
                </td>
            </tr>
        </table>
    </form>
</div>
</body>
</html>
