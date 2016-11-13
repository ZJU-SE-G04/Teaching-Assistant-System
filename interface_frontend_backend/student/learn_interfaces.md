## 学生页面接口

|功能名            |前端调用后端的URL                             | 后端返回前端的数据(json)                   |
|-----------------|-------------------------------------------|--------------------------------------------|
|获取课程介绍信息   |get_course_intro.php?courseID=xxx            | {"国际国内背景":"xxx", "课时安排":"xxx", "教学计划":"xxx", "使用教材":"xxx", "考核方式":"xxx"}
|获取该课程所有老师姓名| get_course_teacher.php?courseID=xxx       | [{"id":"xxx", "name":"xxx"},{"id":"xxx", "name":"xxx"},...]
|获取某个老师的详细介绍| get_teacher_intro.php?teacherID=xxx       | {"introduction":"xxxxxxxx"}               |
|获取所有课件资料     | get_courseware.php?courseID=xxx       |[{"courseware_name":"xxx", "courseware_info":"xxx"}, {"courseware_name":"xxx", "courseware_info":"xxx"}]

