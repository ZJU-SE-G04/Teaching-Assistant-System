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

#### 取回密码模块
|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|根据用户id返回用户的密保问题|index/php/fetch_question.php?id=xxx      | 失败:{"if_success":0,"err_message":"xxx"},成功:{"if_success":1,"question":"xxx"}|"if_success"为整数0或1 err_message包括但不限于:1."不存在此用户,返回上一步重新输入";2."您未设置密码问题,请回忆您的初始密码或者联系网站管理员"|是
|验证用户的回答密码问题是否正确|index/php/verify_question.php?id=xxx&answer=xxx      | 失败:{"if_success":0,"err_message":"xxx"},成功:"if_success":1|"if_success"为整数0或1 err_message包括但不限于:1."回答错误,请返回上一步重新输入答案或联系网站管理员"|是
|重置密码|index/php/reset_pwd.php?id=xxx&new_pwd=xxx      | 失败:{"if_success":0,"err_message":"xxx"},成功:"if_success":1|无|是
|获取友情链接| get_friend_link.php                        | [{ "link_name":"xxx", "link_address":"xxx }, ...] | |
