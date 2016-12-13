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
        <td>action=delete, lesson_id=xxx, notice_id=xxx</td>
        <td>成功/失败</td>
    </tr>
    <tr>
        <td>编辑某一条通知</td>
        <td>course_notice.php</td>
        <td>action=edit, lesson_id=xxx, class_id=xxx, noticeID=xxx, title=xxx, content=xxx</td>
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
            ⚠由于js复杂，若出现bug，<br>
            请用echo检查我代码中的问题，并告诉我哪里有bug<br>
            action=releaseQuiz,<br>
            quizName=xxx,<br>
            option_num=3,essay_num=4<br>
            1_question=第一题题目,<br>
            1_a=第一题选项A的内容,1_b=xxx,1_c,1_d,<br>
            1_answer=d(第一题答案为d)<br>
            2_question=... <br>
        </td>
        <td>成功/失败</td>
    </tr>
    </tbody>
</table>