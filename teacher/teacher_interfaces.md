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
        <td>action=add, courseID=xxx, title=xxx, content=xxx</td>
        <td>成功/失败</td>
    </tr>
    <tr>
        <td>获取该老师在该门课的所有通知（倒序）</td>
        <td>course_notice.php?courseID=xxx&action=request</td>
        <td>N/A</td>
        <td>[{"notice_id":"xxx","title":"xxx","content":"xxx"},{"notice_id":"xxx","title":"xxx","content":"xxx"},...]</td>
    </tr>
    <tr>
        <td>删除某一条通知</td>
        <td>course_notice.php?courseID=xxx&action=delete&amp;noticeID=xxx</td>
        <td>N/A</td>
        <td>成功/失败</td>
    </tr>
    <tr>
        <td>编辑某一条通知</td>
        <td>course_notice.php</td>
        <td>action=edit, courseID=xxx, noticeID=xxx, title=xxx, content=xxx</td>
        <td>成功/失败</td>
    </tr>
    </tbody>
</table>

###发布实验报告
...
###批改实验报告
...
