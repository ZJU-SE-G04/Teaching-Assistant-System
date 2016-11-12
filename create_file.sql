#先创建好数据库并打开
create database teaching_db;
use teaching_db;

#varchar可以突破长度限制
#用户表
create table user_table(
	id varchar(10),
	password varchar(16) not null,
	user_name varchar(20) not null,
	level int not null,
	email varchar(30),
	question varchar(60),
	answer varchar(60),
	primary key(id)
	);
#用户表创建完毕


#组队方面：
#队伍表：
create table team_table(
	team_id int not null auto_increment,
	team_name varchar(20),
	team_password varchar(16),
	primary key(team_id)
	);
#组队表：
create table orgnize_table(
	id varchar(10),
	team_id int,
	primary key(id,team_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (team_id) references team_table(team_id) on delete cascade
	);


#课程方面：

#课程表：
create table lesson_table(
	lesson_id varchar(10),
	lesson_name varchar(20),
	begin_time varchar(60),#用字符串存储所有上课时间
	lesson_address varchar(20),
	lesson_info varchar(1000),
	primary key(lesson_id)
	);

#教师学生助教信息和绑定
#教师信息和绑定表：
create table teachers_table(
	id varchar(10),
	name varchar(20),
	introduction varchar(1000),
	constraint foreign key (id) references user_table(id) on delete cascade,
	primary key(id)
	);
create table teach_table(
	id varchar(10),
	lesson_id varchar(10),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade,
	primary key(id,lesson_id)
	);

#学生信息和绑定表
create table student_table(
	id varchar(10),
	name varchar(20),
	department varchar(60),
	major varchar(20),
	constraint foreign key (id) references user_table(id) on delete cascade,
	primary key(id)
	);
create table study_table(
	id varchar(10),
	lesson_id varchar(10),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade,
	primary key(id,lesson_id)
	);

#助教信息和绑定表
create table assitant_table(
	id varchar(10),
	name varchar(20),
	department varchar(60),
	major varchar(20),
	constraint foreign key (id) references user_table(id) on delete cascade,
	primary key(id)
	);
create table assit_table(
	id varchar(10),
	lesson_id varchar(10),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade,
	primary key(id,lesson_id)
	);


#课程文章和通知课件等：
#通知表：
create table notice_table(
	notice_id int not null auto_increment,
	lesson_id varchar(10),
	id varchar(10),
	title varchar(20),
	content varchar(10000),
	primary key(notice_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	);
#文章表：
create table article_table(
	article_id int not null auto_increment,#自增属性
	lesson_id varchar(10),
	id varchar(10),
	title varchar(20),
	content varchar(10000),
	primary key(article_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	);
#评论：
create table comment_table(
	article_id int,
	id varchar(10),
	time datetime,
	content varchar(300),
	floor int,
	re_floor int,
	primary key(article_id,floor),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (article_id) references article_table(article_id) on delete cascade
	);
#课件表：
create table courseware_table(
	lesson_id varchar(10),
	courseware_name varchar(100),
	courseware_info varchar(200),
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	);


#作业部分：
#作业表
create table work_table(
	work_id int not null auto_increment,#自增属性
	work_name varchar(100),
	lesson_id varchar(10),
	id varchar(10),
	flag int,
	ddl datetime,
	primary key(work_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	);
#题目表
create table question_table(
	work_id int,
	question varchar(1000),
	answer varchar(1000),
	constraint foreign key (work_id) references work_table(work_id) on delete cascade
	);

#得分表
create table score_table(
	id varchar(10),
	work_id int,
	score numeric(12,2),
	state varchar(20),
	comment varchar(1000),
	primary key(id,work_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (work_id) references work_table(work_id) on delete cascade
	);

#论坛帖子部分：
#帖子
create table topic_table(
	topic_id int not null auto_increment,
	lesson_id varchar(10),
	topic_kind bool,#是否是答疑
	topic_sight bool,#是否是团队可见
	id varchar(10),
	time datetime,
	title varchar(150),
	content varchar(10000),
	response_teacher varchar(10),
	response_content varchar(10000),
	primary key(topic_id),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (response_teacher) references user_table(id) on delete cascade,
	constraint foreign key (lesson_id) references lesson_table(lesson_id) on delete cascade
	);
#回复
create table response_table(
	topic_id int,
	id varchar(10),
	time datetime,
	content varchar(300),
	floor int,
	re_floor int,
	primary key(topic_id,floor),
	constraint foreign key (id) references user_table(id) on delete cascade,
	constraint foreign key (topic_id) references topic_table(topic_id) on delete cascade
	);




	

