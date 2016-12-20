##主页接口

###登录
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
        <td>index.php</td>
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
        <td>index.php</td>
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
        <td>index.php</td>
        <td>
            action=logout, <br>
            user_id=xxx, <br>
        </td>
        <td>true/false</td>
    </tr>
    </tbody>
</table>