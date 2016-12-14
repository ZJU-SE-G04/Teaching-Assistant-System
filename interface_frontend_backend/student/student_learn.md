## 学生页面接口

|功能名            |前端调用后端的URL                             |post| 后端返回前端的数据(json)                   |备注          |
|-----------------|-------------------------------------------|------|--------------------------------------------|---------------|
|获取课程介绍信息     |get_course_intro.php?courseID=xxx        |无      | {"国际国内背景":"xxx", "课时安排":"xxx", "教学计划":"xxx", "使用教材":"xxx", "考核方式":"xxx"}|无
|获取该课程所有老师姓名| get_course_teacher.php?courseID=xxx     |无          | [{"id":"xxx", "name":"xxx"},{"id":"xxx", "name":"xxx"},...]                               |无 
|获取某个老师的详细介绍| get_teacher_intro.php?teacherID=xxx      |无         | {"introduction":"xxxxxxxx"}                                                               |无
|获取所有课件资料     | get_courseware.php?courseID=xxx         |无            |[{"courseware_name":"xxx", "courseware_info":"xxx", "courseware_kind":"xxx"}, {"courseware_name":"xxx", "courseware_info":"xxx", "course_kind":"xxx"}]|无
|获取某个板块的所有帖子列表|posts_handler.php?action=fetchAll&courseID=xxx&post_kind=0|无 | [{"topic_id","title":"xxx", "datetime":"xxx", "publisher":"xxx"}, ... ]|请求参数中post_kind,值为0表示老师答疑区,值为1表示综合讨论区,值为2表示小组答疑区
|获取某个帖子的详情          |posts_handler.php?action=fetchDetail&topic_id=xxx   |无 | {"title":"xxx", "content", "xxxxxx", "datetime":"xxx", "publisher":"xxx"}|无
|获取某个帖子的所有一级回复(只获取第一页)|posts_handler.php?action=fetchRe&topic_id=xxx&offset=0&count=10 |无| [{"username":"xxx", "userid":"xxx", "content":"xxxxxx", "time":"xxx", "floor": 1}, ...] |结果按照楼层号排序,从第offset条记录开始,返回count条记录
|获取某个一级回复的所有二级回复|posts_handler.php?action=fetchReRe&topic_id=xxx&floor=xxx        |无| [{"userid":"xxx", "username":"xxx","username_of_be_re":"xxx","id_of_be_re":"xxx", "re_content":"xxxxxx", "re_time":"xxx", "re_floor": 1}, ...]|id_of_be_re为0表示回复对象是一级回复的楼主
|发表一级回复                |posts_handler.php                  |action=submitRe&topic_id=xxx&content=xxx| { "state": 0, "msg":"xxx" } |state为0表示发表成功，为1表示发表失败|
|发表二级回复                |posts_handler.php                   |action=submitReRe&topic_id=xxx&floor=2&id_be_re=xxx&name_be_re=xxx&content=xxx&floor_be_re=0 | { "state": 0, "msg":"xxx" } |state为0表示发表成功，为1表示发表失败. post的参数中id_be_re是被回复人的id，floor是一级回复的楼层号. floor_be_re是被回复的楼层（二级回复)，如果是0表示被回复的对象是一级回复，否则是二级回复| 
|获取某个板块的帖子总数    |posts_handler.php?action=fetchNum&courseID=xxx&post_kind=0|无| { "num": 10 } |无
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
        <td>action=request_quiz_list,lesson_id=xxx, class_id=xxx, stu_id=xxx（学生id，为了方便你辨别，我用了stu_id）</td>
        <td>
            [{"work_id": xxx,<br>
            "work_name":"xxx",<br>
            "ddl":"2016-12-05 23:59:59",<br>
            "state": 0/1(未完成或已完成),<br>
            "score": xxx(score_table)},<br>
            {...}]
        </td>
    </tr>
    <tr>
        <td>获取实验报告列表</td>
        <td>quiz_and_report.php</td>
        <td>action=request_report_list, lesson_id=xxx, class_id, stu_id=xxx</td>
        <td>
            [{"report_id": xxx,<br>
            "report_name": "xxx",<br>
            "state": 0/1(未提交或已提交),<br>
            "ddl": "xxx",<br>
            "detail": "xxx",<br>
            "file": "http://www.baidu.com/1.docx",<br>
            "score": xxx,<br>
            "comment": "xxx"},<br>
            {...}]
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
        <td>action=request_quiz_detail,<br>
            lesson_id=xxx, class_id=xxx,
            <br>work_id=xxx, stu_id=xxx
        </td>
        <td>{（注意看清JSON的格式！）<br>
            "work_name": "xxx",<br>
            "question":[<br>
            {"number": xxx,<br>
            "question_type": "option",<br>
            "question": "xxx",<br>
            "a": "xxx", "B": "xxx", "C": "xxx", "D": "xxx"},<br>
            {"number": xxx,<br>
            "question_type": "essay",<br>
            "question": "xxx"<br>
            }]<br>
            }
        </td>
    </tr>
    <tr>
        <td>提交quiz结果</td>
        <td>quiz_and_report.php</td>
        <td>action=submit_quiz_result, lesson_id=xxx, <br>
            class_id=xxx, work_id=xxx, stu_id=xxx,<br>
            1=C, 2=B, 3=D, 4=A, 5=C,... <br>
            （如果第1题没有选择答案，<br>那么1以及1的值不会被post过去，<br>我不知道后端可以怎么解决）
        </td>
        <td>成功/失败</td>
    </tr>
    </tbody>
</table>