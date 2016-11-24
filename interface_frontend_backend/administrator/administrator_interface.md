<table>
  <thead>
    <tr>
      <th>功能</th>
      <th>文件名</th>
      <th>请求方法</th>
      <th>请求数据示例</th>
      <th>响应数据示例</th>
      <th>备注</th>
    </tr>
  </thead>
  <tbody>
   <tr>
     <td>获取所有留言记录</td>
     <td>getMessageList.php</td>
     <td>get</td>
     <td></td>
     <td>
<pre><code>[
  {
    "message_id": 32415312,
    "name": "小明ss",
    "time": "2016-11-13 15:38",
    "content": "基本信息ENG是El.....",
    "read": false
  },
  ...
]</code></pre>
     </td>
     <td></td>
   </tr>
   
   <tr>
     <td>获取所有文章列表</td>
     <td>getArticleList.php</td>
     <td>get</td>
     <td></td>
     <td>
<pre><code>[
  {
    "article_id": 123456789,
    "title": "Java之JDK环境配置过程（图）",
    "articleDigest": "1、在Windows7操作系统...",
    "time": "2013-06-29 00:35",
    "commentNum": 7
  },
 ...
]</code></pre>
     </td>
     <td>articleDigest为文章摘要，可截取文章开头一小段</td>
   </tr>
   
   <tr>
     <td>取得某篇文章的内容及其评论</td>
     <td>getArticleDetail.php</td>
     <td>get</td>
     <td>
       <pre><code>{ "article_id": 23422423 }</code></pre>
     </td>
     <td>
<pre><code>{
  "article": {
    "title": "redis和memcache的区别",
    "author": "AlexandraStan",
    "time": "2016-11-09 09:45",
    "body": "性能方面：没有必要过多的关心性..."
  },
  "comment": [
    {
      "article_id": 234234,
      "floor": 12,
      "re_floor": 5,
      "floorMaster": "小明",
      "time": "2016-11-10 18:03",
      "content": "LZ我要成为你这样..."
    },
    ...
  ]
}</code></pre>  
     </td>
     <td>对文章的评论re_floor=0</td>
   </tr>
   
   <tr>
     <td>删除文章的某条评论</td>
     <td>deleteArticleComment.php</td>
     <td>get</td>
     <td>
<pre><code>{
  "article_id": 4214124,
  "floor": 4
}</code></pre>
     </td>
     <td></td>
     <td></td>
   </tr>
   
   <tr>
     <td>获取所有帖子记录</td>
     <td>getTopicList.php</td>
     <td>get</td>
     <td></td>
     <td>
<pre><code>[
  {
      "id": 12312431,
      "lesson": "软件工程管理",
      "kind": "答疑",
      "sight": "团队可见",
      "author": "小明",
      "time": "2014-08-22 20:14",
      "title": "关于计算最长的...",
      "responseNum": 13
  },
  ...
]</code></pre>
     </td>
     <td></td>
   </tr>
   
   <tr>
     <td>获取某个帖子及其评论</td>
     <td>getTopicDetail.php</td>
     <td>get</td>
     <td><pre><code>{ "topic_id": 2341314 }</code></pre></td>
     <td>
<pre><code>{
  topic: {
    "id": 1224234,
    "title": "Vim cryptmethod us...",
    "author": "atopuncw",
    "content": "On L421-L423 o...",
    "lesson": "软件需求工程",
    "kind": "答疑",
    "sight": "团队可见",
    "time": "2014-03-22 10:34",
    "responseNum": 32
  },
  response: [
    {
        "floor": 6,
        "floorMaster": "小明",
        "reFloor": 4,
        "time": "2016-3-21 5:34",
        "content": "Indeed. Bad re..."
    },
    ...
  ]
}</code></pre>
     </td>
     <td></td>
   </tr>
   
   <tr>
     <td>删除帖子</td>
     <td>deleteTopic.php</td>
     <td>get</td>
     <td><pre><code>{ "topic_id": 2342432 }</code></pre></td>
     <td></td>
     <td></td>
   </tr>
   
   <tr>
     <td>删除帖子回复</td>
     <td>deleteResponse.php</td>
     <td>get</td>
     <td><pre><code>{
  "topic_id": 234234,
  "floor": 5
}</code></pre></td>
     <td></td>
     <td></td>
   </tr>
   
   <tr>
     <td>增加教师</td>
     <td>addTeacher.php</td>
     <td>post</td>
     <td><pre><code>{
  "teacherId": 2342343,
  "teacherName": "xxxxx",
  "teacherIntroduction": "xxxxx"
}</code></pre></td>
     <td></td>
     <td></td>
   </tr>
   
   <tr>
     <td>增加课程</td>
     <td>addLesson.php</td>
     <td>post</td>
     <td><pre><code>{
  "lessonId": 2342343,
  "lessonName": "xxx",
  "lessonInfo": '{"国际国内背景":"xxx","课时安排":"xxx","使用教材":"xxxx","考核方式":"xxx"}'
}</code></pre></td>
     <td></td>
     <td>lessonInfo当做字符串存</td>
   </tr>
   
   <tr>
     <td>增加友情链接</td>
     <td>addLink.php</td>
     <td>post</td>
     <td><pre><code>{
  "linkName": "xxx",
  "linkAddress": "xxx"
}</code></pre></td>
     <td></td>
     <td></td>
   </tr>
   
   <tr>
     <td>获取所有友情链接记录</td>
     <td>getLinkList.php</td>
     <td>get</td>
     <td></td>
     <td><pre><code>[
  {
    "linkId": 22342134,
    "linkName": "浙江大学现代教务管理系统",
    "linkAddress": "http://jwbinfosys.zju.edu.cn"
  },
  ...
]</code></pre></td>
     <td></td>
   </tr>
   
   <tr>
     <td>删除友情链接</td>
     <td>deleteLink.php</td>
     <td>get</td>
     <td><pre><code>{ "linkId": 23423 }</code></pre></td>
     <td></td>
     <td></td>
   </tr>
   
   <tr>
     <td>添加网站更新信息</td>
     <td>addUpdateInfo.php</td>
     <td>post</td>
     <td><pre><code>{ "updateInfo": "sdafsadfasf" }</code></pre></td>
     <td></td>
     <td></td>
   </tr>
   
  </tbody>
</table>