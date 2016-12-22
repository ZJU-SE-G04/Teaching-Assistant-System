### 每个学生个人管理页面的API

#### 密码格式: 6~16位字母或数字

|功能号|功能名            |前端调用后端的URL                             |post数据                    | 后端返回前端的数据(json)                     |备注          |
|------|-----------------|--------------------------------------------|----------------------------|--------------------------------------------|---------------|
|h1|修改密码           |modify_pass.php?oldpass=xxx&newpass=xxx|无                              | { "state": 0, "msg": "xxx" }   | state可取0或1或2或3， 0表示修改成功，1表示原密码不正确，2表示新密码格式不正确，msg就是对state的文字描述
|h2|设置密保问题        |set_passpro.php                            |question=xxxxxx&answer=xxx  | { "state": 0, "msg": "xxx" }   | state可取0或1， 0表示设置成功，1表示失败|
|h3|创建队伍           | create_team.php?teamName=xxx&pass=xxx&capacity=6|无                               | { "state": 0, "msg": "xxx" }      | state可取0或1， 0表示创建成功， 1表示创建失败. 参数里面capacity表示队伍容量|
|h4|直接加入队伍        | direct_join_team.php?teamName=xxx&pass=xxx|无                  |{ "state": 0, "msg": "xxx"}        | state可取0或1， 0表示成功， 1表示创建失败  |
|h5|检查队伍名称是否重复  |check_team_name_dup.php?teamName=xxx      |无                  | true或false        |true表示不重复， false表示重复      |
|h6|申请加入队伍         |apply_for_team.php?teamID=xxx            |无                  | { "state": 0, "msg": "xxx" }      | state可取0或1， 0表示申请成功，1表示申请失败 |
|h7|显示所有的入队申请    |list_team_applications.php            |无                   | { "state": 0, "msg": "xxx", "result": [{"uid": "xxx", "username": "xxx"}, ...] } |state为0表示获取成功，result里面填具体信息， 1表示你不是队长，result为空
|h8|处理入队申请         |deal_with_team_application.php?uid=xxx&agree=1 |                    | { "state": 0, "msg": "xxx" }           | URL中agree表示为1表示同意某人的入队申请，为0表示不同意. state为0表示处理成功，为1表示处理失败。
|h9|获取所有队伍列表      |fetch_all_team.php                             |无                   | [{ "teamName":"xxx", "max":6, "joined":4 }, ... ]   | max是队伍的总容量，joined是当前加入的人数 
|h10|检查该学生是否已经加入队伍  |check_if_stu_in_team.php                   |无                   | { "state": 0, "teamName": "xxx" }        | state是0表示已经加入队伍, 是1表示尚未加入队伍， teamName是已经加入的队伍名

