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
	$q="SELECT * FROM poet where name like '%$keyword%'";
	$result = mysql_query($q);
	$row = mysql_fetch_array($result);
	$poet = array();
	$poet[0] = $row['name'];
	echo json_encode($poet);
?>