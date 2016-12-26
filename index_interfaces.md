##主页接口

<table>
    <thead>
    <tr>
        <td>功能接口</td>
        <td>前端调用后端的URL</td>
        <td>post</td>
        <td>后端返回</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>检查是否登录</td>
        <td>home.php</td>
        <td>
            action=isLogin,<br>
            user_id=xxx <br>
        </td>
        <td>
            true/false<br>
            ⚠我在客户端存了cookie，<br>
            所以不用返回user_name<br>
        </td>
    </tr>
    <tr>
        <td>登录</td>
        <td>home.php</td>
        <td>
            action=login, <br>
            user_id=xxx, <br>
            password=xxx <br>
        </td>
        <td>
            成功：user_name<br>
            失败：false</td>
    </tr>
    <tr>
        <td>退出登录</td>
        <td>home.php</td>
        <td>
            action=logout, <br>
            user_id=xxx, <br>
        </td>
        <td>true/false</td>
    </tr>
    <tr>
        <td>跳转至课程页面</td>
        <td>home.php</td>
        <td>
            action=jump_to_lesson, <br>
            user_id=xxx, <br>
            lesson_id=xxx <br>
        </td>
        <td>
            具体页面的URL <br>
            (区分不同课程，不同身份) <br>
        </td>
    </tr>
    </tbody>
</table>