###  查看文章详情模块

#### 参数：
- 课程id(lesson_id)

#### 返回所有文章
- 文章全部内容，content(article_table)
-  文章标题 title(article_table)
-  文章作者 author(article_table)
-  发布文章的时间 time(article_table)
-  评论，包括：
- 评论者 name(teacher_table)or name(assistant_table) or name(student_table)如果是游客，则显示为“游客”
- 评论时间time(comment_table)
- 评论内容 content (comment_table)
- 楼层号 floor(comment_table)
- 被回复楼层号 re_floor(comment_table) 如果没有被回复楼层，则此参数返回为0
