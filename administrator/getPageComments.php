<?php
	include 'connect.php';
	$article_id=$_POST["articleId"];
	$pageNum=$_POST["pageNum"];
//	$article_id=1;
//    $pageNum=1;
    $result = $conn->query("select * from article_table where article_id = '".$article_id."';");
	$arr = [];
	$comments=[];
	$result1 = $conn->query("select * from comment_table where article_id = '".$article_id."';");
	$i=1;
	while($row2 = mysqli_fetch_assoc($result1)){
		if($i>10*($pageNum-1)&&$i<=10*$pageNum){
			//$y['article_id']=(int)$row2['article_id'];
			$x['floor']=$row2['floor'];
			$a=$conn->query("select count(*) from re_comment_table where  article_id = '".$article_id."' and floor = '".$x['floor']."';");
	        $row3 = mysqli_fetch_assoc($a);
		    $x['reCommentCnt']=$row3['count(*)'];
			$b=$conn->query("SELECT user_name FROM user_table where id = '".$row2['id']."';");
			$row4 = mysqli_fetch_assoc($b);            
			$x['floorMaster']= $row4['user_name'];
			$x['time']=$row2['time'];
			$x['content']=$row2['content'];
			$reComments=[];
            $result2 = $conn->query("select * from re_comment_table where article_id = '".$article_id."' and floor = '".$x['floor']."';");
			while($row5 = mysqli_fetch_assoc($result2)){
				$y['floor']=$row5['re_floor'];
				$c=$conn->query("SELECT user_name FROM user_table where id = '".$row5['id']."';");
				$row6 = mysqli_fetch_assoc($c);            
				$y['Master']= $row6['user_name'];
				$y['time']=$row5['time'];
				$y['content']=$row5['content'];	
				$reComments[]=$y;		
	        }
			$x['reComments']=$reComments;
			$comments[]=$x;
			
		}
		$i=$i+1;
	}			
	$arr['articleId']=$article_id;
	$arr['comments']=$comments;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>
