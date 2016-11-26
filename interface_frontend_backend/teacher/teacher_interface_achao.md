### 助教模块


|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程当前班级的助教信息|show_TA_info.php?class_id=xxx      | [{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx"}{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx"}...]|无|否
|手动添加助教信息|add_TA.php?[{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}...] | 插入成功：{"success":1,error_message:"null"};插入失败：{"success":0,"error_messgae":"xxx"}|注明:成功或失败返回的是整数1或0,在网上查了下submit多行数据的用法，该功能后端php处理样例为/teacher/achao/php/add_TA.php|否
|根据助教id删除一行的助教信息|delete_TA.php?id=xxx | 删除成功：{"success":1,error_message:"null"};删除失败：{"success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|否


### 学生模块


|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程当前班级的学生信息|show_stu_info.php?class_id=xxx      | [{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx","team_name":"xxx"}{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx","team_name":"xxx"}...]|如果当前学生尚未组队,请返回:"未组队"|否
|手动添加学生信息|add_stu.php?[{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}...] | 插入成功：{"success":1,error_message:"null"};插入失败：{"success":0,"error_messgae":"xxx"}|注明:成功或失败返回的是整数1或0,与添加助教相同|否
|根据id删除一行的助教信息|delete_stu.php?id=xxx | 删除成功：{"success":1,error_message:"null"};删除失败：{"success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|否
|用Excel批量导入学生信息|add_stu_excel.php?file=xxx| 导入成功：{"success":1,error_message:"null"};导入失败：{"success":0,"error_messgae":"xxx"}|导入的信息包括学号,姓名,院系,专业,每次导入都是对原有学生信息的重置,注意!不是添加!成功或失败返回的是整数1或0|否



### To be continued……
- 其余尚未完成或者还未定型

···

