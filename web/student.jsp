<%@ page contentType="text/html; charset=gb2312"%>
<%
    //由于password是跳转的依据，因此借助session中是否有password信息来判断用户是否有登录，

    if (session.getValue("password") == null)
        out.print("<script>alert('请学生先登录！');window.location.href='Login.html'</script>");
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
    <title>学生登录</title>

</head>
<body>欢迎学生登录！
</body>
</html>