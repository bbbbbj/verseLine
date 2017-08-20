<?php
	//header("Content-Type:text/plain;charset=utf-8");
    //header("Content-Type:application/json;charset=utf-8");
    //header("Content-Type:text/html;charset=utf-8");
    //header("Content-Type:text/json;charset=utf-8");
    //header("Content-Type:application/javascript;charset=utf-8");
	$db = mysql_connect("localhost","root","123")
		or die("连接数据库失败");
	mysql_query("set names utf8");
	mysql_select_db("verse")
		or die("不能连接到Verse".mysql_error());
	switch($_GET['action']){
		//搜索诗句
		case 'searchVerse': {
			$keyword=$_GET['keyword'];
			$q="SELECT count(*) FROM 属性 where 词性=(SELECT 词性 FROM 属性 where 诗句='{$keyword}')";
			$result1 = mysql_query($q);
			 if (!$result1) echo "SQL错误：".mysql_error();
			$row1 = mysql_fetch_array($result1);
			$allnum=$row1[0];
			$k="SELECT * FROM 属性 where 词性=(SELECT 词性 FROM 属性 where 诗句='{$keyword}')";

			$result = mysql_query($k);
			 if (!$result) echo "SQL错误：".mysql_error();

			$rownum = mysql_num_rows($result);
			$verse=array(array());
			for($i=0;$i<$rownum;$i++){
				$row = mysql_fetch_assoc($result);
				$verse[0][$i] = $row['诗句'];
				$verse[1][$i] = $row['作者'];
				$verse[2][$i] = $row['词性'];
			}
			$verse[3][0]=$allnum;
			echo json_encode($verse);
			break;
		}
		case 'searchPoet': {
			$keyword=$_GET['keyword'];
			$q="SELECT count(*) FROM 属性 where 作者='{$keyword}'";
			$result1 = mysql_query($q);
			 // if (!$result1) echo "SQL错误：".mysql_error();
			$row1 = mysql_fetch_array($result1);
			$allnum=$row1[0];
			$k="SELECT * FROM 属性 where 作者='{$keyword}'";

			$result = mysql_query($k);
			 // if (!$result) echo "SQL错误：".mysql_error();

			$rownum = mysql_num_rows($result);
			$verse=array(array());
			for($i=0;$i<$rownum;$i++){
				$row = mysql_fetch_assoc($result);
				$verse[0][$i] = $row['诗句'];
				$verse[1][$i] = $row['作者'];
				$verse[2][$i] = $row['词性'];
			}
			$verse[3][0]=$allnum;
			echo json_encode($verse);
			break;
		}
		case 'insertUser': {
			$username=$_GET['username'];
			$password=$_GET['password'];
			$tel=$_GET['tel'];
			$email=$_GET['email'];
			$q="insert into user(用户名,密码,手机号,邮箱) values('$username','$password','$tel','$email')";
			$result=mysql_query($q);
			if($result){
				echo '注册成功';
			}
			break;
		}
		case 'regiUser': {
			$keyword=$_GET['keyword'];
			$q="SELECT * FROM user where 用户名='{$keyword}'";
			$result = mysql_query($q);
			$test = mysql_fetch_row($result);
			if(is_array($test)){
				echo'该用户名已存在';
			}else{
				echo '<svg class="iconfont search-icon" aria-hidden="true">
							<use xlink:href="#icon-duihao"></use>
					</svg>';
			}
			break;
		}
		case 'userService': {
			$username=$_GET['username'];
			$password=$_GET['password'];
			$q="SELECT * FROM user where 用户名='{$username}'";
			$result=mysql_query($q);
			$test=mysql_fetch_row($result);
			$k="SELECT * FROM user where 用户名='{$username}' and 密码='{$password}'";
			$result1=mysql_query($k);
			$test1=mysql_fetch_row($result1);
			echo $row['密码'];
			if(!is_array($test)){
				echo '该用户不存在';
			}else if(!is_array($test)){
				echo '密码错误';
			}else{
				echo '登录成功';
			}
		}
		
	}
	
?>