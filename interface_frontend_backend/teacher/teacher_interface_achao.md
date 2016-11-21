### 显示助教信息


|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|显示当前课程当前班级的助教信息|show_TA_info.php?class_id=xxx      | [{"TA_name":"xxx", "TA_id":"xxx", "department":"xxx", "major":"xxx"}{"TA_name":"xxx", "TA_id":"xxx", "department":"xxx", "major":"xxx"}...]|无|否



|功能名      |前端调用后端的URL                             | 后端返回前端的数据(json)                   |备注          |后端是否完成    |
|-----------------|-------------------------------------------|--------------------------------------------|---------------|----------|
|手动添加助教信息|add_TA.php?add_TA.php?[{"TA_id":"xxx","TA_name":"xxx","department":"xxx","major":"xxx"}{"TA_id":"xxx","TA_name":"xxx","department":"xxx","major":"xxx"}...] | 插入成功：{"success":1,error_message:"null"};插入失败：{"success":0,"error_messgae":xxx}|在网上查了下submit多行数据的用法，该功能后端php处理样例为/teacher/achao/php/add_TA.php|否

### To be continued……
- 其余尚未完成或者还未定型

···

