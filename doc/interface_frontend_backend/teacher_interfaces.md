##教师页面接口

###发布通知
<table>
    <thead>
    <tr>
        <td>功能接口</td>
        <td>前端调用后端的URL</td>
        <td>前端post过去的内容</td>
        <td>后端返回前端的数据（json）</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>添加新通知</td>
        <td>course_notice.php</td>
        <td>action=add, lesson_id=xxx, class_id=xxx, title=xxx, content=xxx</td>
        <td>成功/失败</td>
    </tr>
    <tr>
        <td>获取该老师在该门课的所有通知（倒序）</td>
        <td>course_notice.php</td>
        <td>action=request, lesson_id=xxx, class_id=xxx </td>
        <td>[{"notice_id":"xxx","title":"xxx","content":"xxx"},{"notice_id":"xxx","title":"xxx","content":"xxx"},...]</td>
    </tr>
    <tr>
        <td>删除某一条通知</td>
        <td>course_notice.php</td>
        <td>action=delete, notice_id=xxx</td>
        <td>成功/失败</td>
    </tr>
    <tr>
        <td>编辑某一条通知</td>
        <td>course_notice.php</td>
        <td>action=edit, notice_id=xxx,<br> title=xxx, content=xxx</td>
        <td>成功/失败</td>
    </tr>
    </tbody>
</table>

###发布实验报告
...
###批改实验报告
...

###发布测试
<table>
    <thead>
    <tr>
        <th>功能接口</th>
        <th>URL</th>
        <th>post</th>
        <th>后端返回的内容</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>发布测试</td>
        <td>release_quiz.php</td>
        <td>
            action="release_quiz",
            quiz_detail={"option_num":"2","essay_num":"2","quiz_name":"001",<br>
            "option_question":<br>
            [{"title":"111","a":"11","b":"12","c":"13","d":"14","answer":"c"},<br>
            {"title":"222","a":"21","b":"22","c":"23","d":"24","answer":"b"}],<br>
            "essay_question":[{"title":"333"},{"title":"444"}]}
        </td>
        <td>成功/失败</td>
    </tr>
    </tbody>
</table>