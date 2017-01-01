### 管理助教模块


|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程当前班级的助教信息|show_TA_info.php?class_id=xxx      | [{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx"}{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx"}...]|无|是
|手动添加助教信息|add_TA.php?class_id=xxx[{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}...] | 插入成功：{"if_success":1,error_message:"null"};插入失败：{"if_success":0,"error_messgae":"xxx"}|注明:成功或失败返回的是整数1或0,在网上查了下submit多行数据的用法，该功能后端php处理样例为/teacher/achao/php/add_TA.php|是
|根据助教id删除一行的助教信息|delete_TA.php?class_id=xxx&id=xxx | 删除成功：{"if_success":1,error_message:"null"};删除失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|是
|修改其中一行的助教信息|update_TA.php?class_id=xxx&old_id=xxx&&name=xxx&&id=xxx&&department=xxx&major=xxx |  修改成功：{"if_success":1,error_message:"null"};修改失败：{"if_success":0,"error_messgae":"xxx"}|old_id是助教的原有id,因为老师可能输错了id,需要修改,成功或失败返回的是整数1或0|否,部分不能删除


### 管理学生模块


|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程当前班级的学生信息|show_stu_info.php?class_id=xxx      | [{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx","team_name":"xxx"}{"name":"xxx", "id":"xxx", "department":"xxx", "major":"xxx","team_name":"xxx"}...]|如果当前学生尚未组队,请返回:"未组队"|是
|手动添加学生信息|add_stu.php?class_id=xxx[{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}{"id":"xxx","name":"xxx","department":"xxx","major":"xxx"}...] | 插入成功：{"if_success":1,error_message:"null"};插入失败：{"if_success":0,"error_messgae":"xxx"}|注明:成功或失败返回的是整数1或0,与添加助教相同|被砍👀
|根据id删除一行的学生信息|delete_stu.php?class_id=xxx&id=xxx | 删除成功：{"if_success":1,error_message:"null"};删除失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|被砍
|用Excel批量导入学生信息|| 任意json对象,为空也可以|导入的信息包括学号,姓名,院系,专业,每次导入都是对原有学生信息的重置,注意!不是添加!|否
|修改其中一行的学生信息|update_stu.php?class_id=xxx&old_id=xxx&&name=xxx&&id=xxx&&department=xxx&major=xxx&team_name=xxx |  修改成功：{"if_success":1,error_message:"null"};修改失败：{"if_success":0,"error_messgae":"xxx"}|old_id是学生的原有id,因为老师可能输错了id,需要修改,成功或失败返回的是整数1或0|被砍


### 管理班级
|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程的所有班级的class_id和上课时间|show_class.php?course_id=xxx| [{"class_id":"xxx", "begin_time":"xxx"}{"class_id":"xxx", "begin_time":"xxx"}...]|无|是

### 课程资料
|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|上传课程资料|upload_courseware.php?lesson_id=xxx&courseware_kind=xxx&file=xxx|无 |courseware_name后端根据传过去的file获取,courseware_link是文件存储在服务器上路径,后端自己安排,成功或失败返回的是整数1或0|否
|删除课程资料|delete_courseware.php?courseware_id=xxx|上传成功：{"if_success":1,error_message:"null"};上传失败：{"if_success":0,"error_messgae":"xxx"} |成功或失败返回的是整数1或0|否


### 文章模块
|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示文章列表|show_article_list.php?lesson_id=xxx|[{"article_id":"xxx","title":"xxx","id":"xxx","user_name":"xxx","short_content":"xxx","time":"xxx"}{"article_id":"xxx","title":"xxx","id":"xxx","user_name":"xxx","short_content":"xxx","time":"xxx"}...]|id是发布人账号，short_content是文章内容前140个字符,user_name是作者姓名|是
|删除文章|delete_article.php?article_id=xxx|删除成功：{"if_success":1,error_message:"null"};删除失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0|是
|发布文章|add_article.php?lesson_id=xxx&id=xxx&title=xxx&content=xxx|发布成功：{"if_success":1,error_message:"null"};发布失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0,时间由后端获取|是
|修改文章|update_article.php?article_id=xxx&title=xxx&content=xxx|修改成功：{"if_success":1,error_message:"null"};修改失败：{"if_success":0,"error_messgae":"xxx"}|成功或失败返回的是整数1或0,时间由后端获取|是
|显示文章详情和评论区一级评论内容|show_article_detail.php?article_id=xxx|{"article_content":"xxx","comment_number":"xxx","comment":[{"id":"xxx","floor":"xxx","user_name":"xxx","time":"xxx","content":"xxx"}{"id":"xxx","floor":"xxx","user_name":"xxx","time":"xxx","content":"xxx"}......]}|article_content是文章的所有内容,comment_number是评论楼层数目,id是评论(一级)人id,user_name是评论(一级)人用户名,content是评论内容|是
|显示二级评论区内容|show_second_comment.php?article_id=xxx&floor=xxx|{"second_comment_number":"xxx","second_comment":[{"re_floor":"xxx","time":"xxx","id":"xxx","user_name":"xxx","re_id":"xxx","re_user_name":"xxx","content":"xxx","re_floor":"xxx"}{"re_floor":"xxx","time":"xxx","id":"xxx","user_name":"xxx","re_id":"xxx","re_user_name":"xxx","content":"xxx","re_floor":"xxx"}...]}|注意:!!!如果没有被回复人,re_id和re_user_name返回'0'.id是回复人id,re_id是被回复人id,user_name是回复人姓名,re_user_name是被回复人姓名|是
|删除一条二级评论区内容|delete_second_comment.php?article_id=xxx&floor=xxx&re_floor=xxx|成功:{"if_success":1,"error_message":"null"},失败:{"if_success":0,"error_message":"xxx"}|失败要有具体错误信息,成功或失败返回的是整数1或0|是
|删除一条一级评论区内容|delete_comment.php?article_id=xxx&floor=xxx|成功:{"if_success":1,"error_message":"null"},失败成功:{"if_success":0,"error_message":"xxx"}|失败要有具体错误信息,成功或失败返回的是整数1或0|是
|添加一条二级回复|add_second_comment.php?article_id=xxx&id=xxx&time=xxx&content=xxx&floor=xxx&re_id=xxx|成功:{"if_success":1,"error_message":"null"},失败成功:{"if_success":0,"error_message":"xxx"}|!!!为了方便局部刷新,这里的时间由前段获取,后端不必重复获取;前端re_floor不方便获取,希望后端根据当前最大楼中楼楼层号+1生成;如果没有被回复人,re_id为'0'(字符'0')|是
|添加一条一级回复|add_comment.php?article_id=xxx&id=xxx&time=xxx&content=xxx|成功:{"if_success":1,"error_message":"null"},失败成功:{"if_success":0,"error_message":"xxx"}|!!!为了方便局部刷新,这里的时间由前段获取,后端不必重复获取;前端floor不方便获取,希望后端根据当前最大楼层号+1生成;|是
|搜索文章标题显示符合要求的文章列表|show_article_list.php?lesson_id=xxx&&needed_title=xxx|[{"article_id":"xxx","title":"xxx","id":"xxx","user_name":"xxx","short_content":"xxx","time":"xxx"}{"article_id":"xxx","title":"xxx","id":"xxx","user_name":"xxx","short_content":"xxx","time":"xxx"}...]|前端要做到代码重用,id是发布人账号，short_content是文章内容前140个字符,user_name是作者姓名|是

### bug(备忘)
- jquery.min.js版本冲突
- 删除助教表信息导致用户表信息删除


&#10004;
···

