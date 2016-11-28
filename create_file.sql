#删除已有数据库
drop database if exists teaching_db;
#先创建好数据库并打开	设置UTF-8编码格式
create database teaching_db
CHARACTER SET 'utf8'  
COLLATE 'utf8_general_ci';  

use teaching_db;


#varchar可以突破长度限制
#用户表
create table user_table(
	id varchar(10),#用户ID
	password varchar(16) not null,#用户密码
	user_name varchar(20) not null,#用户名
	level int not null,#权限级别（身份）
	email varchar(30),#邮箱地址
	question varchar(60),#密保问题
	answer varchar(60),#答案
	primary key(id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#用户表创建完毕


#组队方面：
#队伍表：
create table team_table(
	team_id int not null auto_increment,#队伍ID
	team_name varchar(20),#队伍名
	team_password varchar(16),#队伍密码
	primary key(team_id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#组队表：
create table orgnize_table(
	id varchar(10),#用户ID
	team_id int,#队伍ID
	flag boolean,#标识，是否已加入成功
	primary key(id,team_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (team_id) references team_table(team_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;


#课程方面：

#课程表：
create table lesson_table(
	lesson_id varchar(10),#课程号
	lesson_name varchar(20),#课程名
	lesson_info varchar(1000),#课程介绍
	primary key(lesson_id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#班级表
create table class_table(
	class_id int not null auto_increment,#自增的班级号
	lesson_id varchar(10),#课程号
	begin_time varchar(60),#用字符串存储所有上课时间
	lesson_address varchar(200),#上课地址
	primary key(class_id),
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#教师学生助教信息和绑定
#教师信息和绑定表：
create table teacher_table(
	id varchar(10),#用户账号
	name varchar(20),#教师真名
	introduction varchar(1000),#教师介绍
	constraint foreign key (id) references user_table(id) on delete cascade,
	primary key(id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table teach_table(
	id varchar(10),#教师账号
	lesson_id varchar(10),#课程号
	class_id int,#班级号
	constraint foreign key (id) references teacher_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade,
	constraint foreign key (class_id) references class_table(class_id) on delete cascade,
	primary key(id,class_id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#学生信息和绑定表
create table student_table(
	id varchar(10),#学生账号
	name varchar(20),#学生真名
	department varchar(60),#学生院系
	major varchar(20),#学生专业
	constraint foreign key (id) references user_table(id) on delete cascade,
	primary key(id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table study_table(
	id varchar(10),#学生账号
	lesson_id varchar(10),#课程号
	class_id int,#班级号
	constraint foreign key (id) references student_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade,
	constraint foreign key (class_id) references class_table(class_id) on delete cascade,
	primary key(id,class_id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#助教信息和绑定表
create table assitant_table(
	id varchar(10),#助教账号
	name varchar(20),#助教真名
	department varchar(60),#助教院系
	major varchar(20),#助教专业
	constraint foreign key (id) references user_table(id) on delete cascade,
	primary key(id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
create table assit_table(
	id varchar(10),#助教账号
	lesson_id varchar(10),#课程号
	class_id int,#班级号
	constraint foreign key (id) references assitant_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade,
	constraint foreign key (class_id) references class_table(class_id) on delete cascade,
	primary key(id,class_id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;


#课程文章和通知课件等：
#通知表：
create table notice_table(
	notice_id int not null auto_increment,#通知ID
	lesson_id varchar(10),#课程号
	id varchar(10),#发布人账号
	title varchar(20),#标题
	content varchar(10000),#内容
	time datetime,#发布时间
	primary key(notice_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#文章表：
create table article_table(
	article_id int not null auto_increment,#自增属性
	lesson_id varchar(10),#课程号
	id varchar(10),#发布人账号
	title varchar(20),#标题
	content varchar(10000),#内容
	time datetime,#发布时间
	primary key(article_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#评论：
create table comment_table(
	article_id int,#文章号
	id varchar(10),#评论人账号
	time datetime,#评论时间
	content varchar(300),#评论内容
	floor int,#楼层号
	primary key(article_id,floor),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (article_id) references article_table(article_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#二级评论：
create table re_comment_table(
	article_id int,#文章号
	id varchar(10),#评论人ID
	time datetime,#评论时间
	content varchar(300),#评论内容
	floor int,#楼层号
	re_floor int,#楼中楼层号
	re_id varchar(10),#回复人ID
	primary key(article_id,floor,re_floor),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (article_id) references article_table(article_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#课件表：
create table courseware_table(
	courseware_id int not null auto_increment,#课件标志号
	lesson_id varchar(10),#课程号
	courseware_name varchar(100),#课件名
	courseware_info varchar(200),#课件地址
	courseware_kind varchar(20),#课件类型
	primary key(courseware_id),
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;


#作业部分：

#实验表
create table report_table(
	report_id int not null auto_increment,#自增属性
	report_name varchar(100),#实验名
	lesson_id varchar(10),#课程号
	class_id int,#班级号
	id varchar(10),#布置教师
	file varchar(60),#模板文件路径
	ddl datetime,#DDL
	detail varchar(300),#实验要求
	primary key(report_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#报告表
create table commit_table(
	report_id int,#实验号
	id varchar(10),#学生号
	file varchar(60),#学生提交的文件路径
	filename varchar(30),#学生提交的文件名
	commit_time datetime,#提交时间
	score int,#分数，默认-1
	comment varchar(300),#评价
	state int,#是否批改状态
	primary key(report_id,id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (report_id) references report_table(report_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#作业表
create table work_table(
	work_id int not null auto_increment,#自增属性
	work_name varchar(100),#作业名
	lesson_id varchar(10),#课程号
	class_id int,#班级号
	id varchar(10),#发布人账号
	ddl datetime,#截止时间
	detail varchar(300),#实验要求
	primary key(work_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (class_id) references class_table(class_id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#题目表
create table question_table(
	work_id int,#作业号
	number int,#题目序号
	question varchar(1000),#问题
	a varchar(300),
	b varchar(300),
	c varchar(300),
	d varchar(300),#四个选项
	answer varchar(10),#答案
	constraint foreign key (work_id) references work_table(work_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#问答题表
create table ask_table(
	work_id int,#作业号
	number int,#题目序号
	question varchar(1000),#问题
	constraint foreign key (work_id) references work_table(work_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#存储问答题答案，方便给老师看
create table answer_table(
	id varchar(10),#学生学号
	work_id int,#作业号
	number int,#题目序号
	answer varchar(1000),#答案
	constraint foreign key (work_id) references work_table(work_id) on delete cascade,
	constraint foreign key (id) references user_table(id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#得分表，得分是一次作业选择题问答题一起的，批改问答题后将问答题得分直接加上即可
create table score_table(
	id varchar(10),#学生账号
	work_id int,#作业号
	score numeric(12,2),#分数
	state int,#完成状态
	comment varchar(1000),#评价
	primary key(id,work_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (work_id) references work_table(work_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#论坛帖子部分：
#帖子
create table topic_table(
	topic_id int not null auto_increment,#帖子号
	lesson_id varchar(10),#课程号
	topic_kind int,#是否是答疑
	id varchar(10),#发布人账号
	time datetime,#发帖时间
	title varchar(150),#标题
	content varchar(10000),#内容
	primary key(topic_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;
#回复
create table response_table(
	topic_id int,#帖子号
	id varchar(10),#回复人账号
	time datetime,#回复时间
	content varchar(300),#回复内容
	floor int,#楼层号
	primary key(topic_id,floor),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (topic_id) references topic_table(topic_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#二级回复
create table re_response_table(
	topic_id int,#帖子号
	id varchar(10),#回复人账号
	time datetime,#回复时间
	content varchar(300),#回复内容
	floor int,#楼层号
	re_floor int,#楼中楼层号
	re_id varchar(10),#回复人ID
	primary key(topic_id,floor,re_floor),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (topic_id) references topic_table(topic_id) on delete cascade
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#留言
create table words_table(
	id int not null auto_increment,#主键，非空自增
	name varchar(30),#留言人，可以为空
	time datetime,#留言时间
	flag bool,#朕已阅
	content varchar(300),
	primary key(id)
	)ENGINE=InnoDB DEFAULT CHARSET=utf8;