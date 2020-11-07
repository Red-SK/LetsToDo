<%@ page contentType="text/html; charset=gb2312"%>

<%
        //获取Login.html提交来的信息
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String type = request.getParameter("type");
        //检查用户登录是否成功,这里假设用户名密码均为为admin就表示登录成功，

        if (name.equals("admin") && password.equals("admin")) {
            //验证码验证
                ///验证通过后，将用户信息写入session对象，
                session.setAttribute("name", name);
                session.setAttribute("password", password);
                session.setAttribute("type", type);
                ///根据用户选择的权限类型跳转页面，

                if (type.equals("teacher"))
                    response.sendRedirect("teacher.jsp");
                else if (type.equals("student"))
                    response.sendRedirect("student.jsp");
                else {
                    out.print("<script language='JavaScript' type='text/JavaScript'>alert('异常！请重新登录！');</script>");
                    response.sendRedirect("Login.jsp");
                }


    } else
        //登录失败，回到Login.jsp页面。
        {

            out.print("<script>alert('请正确填写信息！');window.location.href='Login.jsp'</script>");

        }
        %>