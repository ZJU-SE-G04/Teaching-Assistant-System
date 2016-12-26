<?php
	include 'connect.php';
	$topicId=$_POST["topicId"];
	$pageNum=$_POST["pageNum"];
	//$topicId=1;
	//$pageNum=1;
	$arr = [];
	$responses=[];
	$result1 = $conn->query("select * from response_table where topic_id = '".$topicId."';");
	$i=1;
	while($row2 = mysqli_fetch_assoc($result1)){
		if($i>10*($pageNum-1)&&$i<=10*$pageNum){
			//$y['article_id']=(int)$row2['article_id'];
			$x['floor']=$row2['floor'];
			$a=$conn->query("select count(*) from re_response_table where topic_id = '".$topicId."' and floor = '".$x['floor']."';");
	        $row3 = mysqli_fetch_assoc($a);
		    $x['reResponseCnt']=$row3['count(*)'];
			$b=$conn->query("SELECT user_name FROM user_table where id = '".$row2['id']."';");
			$row4 = mysqli_fetch_assoc($b);            
			$x['floorMaster']= $row4['user_name'];
			$x['time']=$row2['time'];
			$x['content']=$row2['content'];
			$reResponses=[];
            $result2 = $conn->query("select * from re_response_table where topic_id = '".$topicId."' and floor = '".$x['floor']."';");
			while($row5 = mysqli_fetch_assoc($result2)){
				$y['floor']=$row5['re_floor'];
				$c=$conn->query("SELECT user_name FROM user_table where id = '".$row5['id']."';");
				$row6 = mysqli_fetch_assoc($c);            
				$y['Master']= $row6['user_name'];
				$d=$conn->query("SELECT user_name FROM user_table where id = '".$row5['re_id']."';");
				$row7 = mysqli_fetch_assoc($d); 
				$y['reto']= $row7['user_name'];
				$y['time']=$row5['time'];
				$y['content']=$row5['content'];	
				$reResponses[]=$y;		
	        }
			$x['reResponses']=$reResponses;
			$responses[]=$x;
			
		}
		$i=$i+1;
	}			
	$arr['topicId']=$topicId;
	$arr['responses']=$responses;
	echo json_encode($arr, JSON_UNESCAPED_UNICODE);
	$conn->close();
?>
