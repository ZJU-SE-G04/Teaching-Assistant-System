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
            ⚠检查session来判断是否登录 <br>
            action=isLogin,<br>
            user_id=xxx <br>
        </td>
        <td>true/false</td>
    </tr>
    <tr>
        <td>登录</td>
        <td>index.php</td>
        <td>
            ⚠账户密码正确不要忘了存session <br>
            ⚠密码在数据库中应加密 <br>
            action=login, <br>
            user_id=xxx, <br>
            password=xxx <br>
        </td>
        <td>true/false</td>
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