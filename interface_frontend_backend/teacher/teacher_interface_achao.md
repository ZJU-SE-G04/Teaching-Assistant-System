### 管理助教模块


|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程当前班级的助教信息|show_TA_info.php?class_id=xxx      | [{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx"}{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx"}...]|无|是
|手动添加助教信息|add_TA.php?class_id=xxx[{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}...] | 插入成功：{"if_success":1,error_message:"null"};插入失败：{"if_success":0,"error_messgae":"xxx"}|注明:成功或失败返回的是整数1或0,在网上查了下submit多行数据的用法，该功能后端php处理样例为/teacher/achao/php/add_TA.php|是
|根据助教id删除一行的助教信息|delete_TA.php?class_id=xxx&id=xxx | 删除成功：{"if_success":1,error_message:"null"};删除失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|是
|修改其中一行的助教信息|update_TA.php?class_id=xxx&old_id=xxx&&name=xxx&&id=xxx&&department=xxx&major=xxx |  修改成功：{"if_success":1,error_message:"null"};修改失败：{"if_success":0,"error_messgae":"xxx"}|old_id是助教的原有id,因为老师可能输错了id,需要修改,成功或失败返回的是整数1或0|是


### 管理学生模块


|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程当前班级的学生信息|show_stu_info.php?class_id=xxx      | [{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx","team_name":"xxx"}{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx","team_name":"xxx"}...]|如果当前学生尚未组队,请返回:"未组队"|是
|手动添加学生信息|add_stu.php?class_id=xxx[{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}...] | 插入成功：{"if_success":1,error_message:"null"};插入失败：{"if_success":0,"error_messgae":"xxx"}|注明:成功或失败返回的是整数1或0,与添加助教相同|是
|根据id删除一行的学生信息|delete_stu.php?class_id=xxx&id=xxx | 删除成功：{"if_success":1,error_message:"null"};删除失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|是
|用Excel批量导入学生信息|add_stu_excel.php?class_id=xxx&file=xxx| 导入成功：{"if_success":1,error_message:"null"};导入失败：{"if_success":0,"error_messgae":"xxx"}|导入的信息包括学号,姓名,院系,专业,每次导入都是对原有学生信息的重置,注意!不是添加!成功或失败返回的是整数1或0|否
|修改其中一行的学生信息|update_stu.php?class_id=xxx&old_id=xxx&&name=xxx&&id=xxx&&department=xxx&major=xxx&team_name=xxx |  修改成功：{"if_success":1,error_message:"null"};修改失败：{"if_success":0,"error_messgae":"xxx"}|old_id是学生的原有id,因为老师可能输错了id,需要修改,成功或失败返回的是整数1或0|是


### 管理班级
|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程的所有班级的class_id和上课时间|show_class.php?course_id=xxx| [{"class_id":"xxx", "begin_time":"xxx"}{"class_id":"xxx", "begin_time":"xxx"}...]|无|是

### 课程资料
|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|上传课程资料|upload_courseware.php?lesson_id=xxx&courseware_kind=xxx&courseware_name=xxx&file=xxx|上传成功：{"if_success":1,error_message:"null"};上传失败：{"if_success":0,"error_messgae":"xxx"} |成功或失败返回的是整数1或0|否
|删除课程资料|delete_courseware.php?courseware_id=xxx|上传成功：{"if_success":1,error_message:"null"};上传失败：{"if_success":0,"error_messgae":"xxx"} |成功或失败返回的是整数1或0|否


### 文章模块
|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示文章列表|show_article_list.php?lesson_id=xxx|[{"article_id":"xxx","title":"xxx","id":"xxx","user_name":"xxx","short_content":"xxx","time":"xxx"}{"article_id":"xxx","title":"xxx","id":"xxx","user_name":"xxx","short_content":"xxx","time":"xxx"}...]|id是发布人账号，short_content是文章内容前140个字符,user_name是作者姓名|否
|删除文章|delete_article.php?article_id=xxx|删除成功：{"if_success":1,error_message:"null"};删除失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|否
|发布文章|add_article.php?lesson_id=xxx&id=xxx&title=xxx&content=xxx&datetime=xxx|删除成功：{"if_success":1,error_message:"null"};删除失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|是


### To be continued……
- 其余尚未完成或者还未定型

···

