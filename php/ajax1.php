<?php
	//header("Content-Type:text/plain;charset=utf-8");
    //header("Content-Type:application/json;charset=utf-8");
    //header("Content-Type:text/html;charset=utf-8");
    header("Content-Type:text/json;charset=utf-8");
    //header("Content-Type:application/javascript;charset=utf-8");
	$db = mysql_connect("localhost","root","123")
		or die("连接数据库失败");
	mysql_query("set names utf8");
	mysql_select_db("verse")
		or die("不能连接到Verse".mysql_error());
	$keyword=$_GET['keyword'];
	$q="SELECT count(*) FROM 属性 where 作者='{$keyword}'";
	$result1 = mysql_query($q);
	 if (!$result1) echo "SQL错误：".mysql_error();
	$row1 = mysql_fetch_array($result1);
	$allnum=$row1[0];
	$k="SELECT * FROM 属性 where 作者='{$keyword}'";

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
	// $q="SELECT * FROM 属性 where 诗句 like '%$keyword%'";
	// $result = mysql_query($q);
	// $row = mysql_fetch_array($result);
	// $poet = array();
	// $poet[0] = $row['诗句'];
	// echo json_encode($poet);
?>