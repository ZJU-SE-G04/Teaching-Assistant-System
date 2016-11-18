## 学生页面接口

|功能名            |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|获取课程介绍信息     |get_course_intro.php?courseID=xxx      | {"国际国内背景":"xxx", "课时安排":"xxx", "教学计划":"xxx", "使用教材":"xxx", "考核方式":"xxx"}|无|否
|获取该课程所有老师姓名| get_course_teacher.php?courseID=xxx   | [{"id":"xxx", "name":"xxx"},{"id":"xxx", "name":"xxx"},...]                               |无  |是
|获取某个老师的详细介绍| get_teacher_intro.php?teacherID=xxx   | {"introduction":"xxxxxxxx"}                                                               |无|是
|获取所有课件资料     | get_courseware.php?courseID=xxx       |[{"courseware_name":"xxx", "courseware_info":"xxx", "courseware_kind":"xxx"}, {"courseware_name":"xxx", "courseware_info":"xxx", "course_kind":"xxx"}]|无|否

###选择测试或实验报告
<table>
    <thead>
    <tr>
        <td>功能名</td>
        <td>URL</td>
        <td>post</td>
        <td>后端返回前端的数据</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>获取测试列表</td>
        <td>quiz_and_report.php</td>
        <td>action=request_quiz_list, courseID=xxx, studentID=xxx</td>
        <td>
            [{"quiz_id":"xxx", "state"="0/1"(未完成或已完成), "deadline""xxx", "title"="xxx", "detail"="xxx", "score"=xxx, quiz_link=(可能需要)},{...}]
        </td>
    </tr>
    <tr>
        <td>获取实验报告列表</td>
        <td>quiz_and_report.php</td>
        <td>action=request_report_list, courseID=xxx, studentID=xxx</td>
        <td>
            [{report_id=xxx, state=0/1(未提交或已提交), deadline=xxx, title=xxx, detail=xxx, score=xxx, report_upload_link=(可能需要)},{...}]
        </td>
    </tr>
    <tr>
        <td>学生上传实验报告</td>
        <td>quiz_and_report.php</td>
        <td>action=submit_report, courseID=xxx, studentID=xxx, 上传文件的方法我还不会</td>
        <td>成功/失败</td>
    </tr>
    </tbody>
</table>

###测试详细页面
<table>
    <thead>
    <tr>
        <td>功能名</td>
        <td>URL</td>
        <td>post</td>
        <td>后端返回前端的数据</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>获取某一测试题目</td>
        <td>quiz_and_report.php</td>
        <td>action=request_quiz_detail, courseID=xxx, quizID=xxx, studentID=xxx</td>
        <td>
            [{question_id=1、2、3(每个测试的id都从1开始，1、2、3...),A=xxx, B=xxx, C=xxx, D=xxx},{}]
        </td>
    </tr>
    <tr>
        <td>提交quiz结果</td>
        <td>quiz_and_report.php</td>
        <td>action=submit_quiz_result, courseID=xxx, quizID=xxx, studentID=xxx, 1=C, 2=B, 3=D, 4=A, 5=C,...（如果第1题没有选择答案，那么1以及1的值不会被post过去，我不知道后端可以怎么解决）</td>
        <td>成功/失败</td>
    </tr>
    </tbody>
</table>