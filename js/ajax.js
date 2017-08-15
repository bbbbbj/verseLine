window.onload=function(){
	var input = document.getElementById('input1');
var searchBtn = document.getElementById('btn');
var searchResult = document.getElementById('search-result');
input.onkeyup = function(){
	//发送ajax请求并处理
	/*var keyword=$("#input1").val();  
	alert(keyword);
        $.ajax({  
            type:"GET",  
            url:'php/ajax.php',   
            dataType:"json",   
            data:{'keyword':keyword},  
            success: function (json) {  
            //alert("test");  
            window.alert(json.length);
            window.alert(json.responseText);
            alert(keyword);
                    var html='';  
                      
                      html = html+json[0];  
                      
                    $("#search-result").html(html); 
                          
            }  
        }  
        )
}*/
	var request = new XMLHttpRequest();
		request.open("GET","php/ajax.php?keyword="+document.getElementById('input1').value);
		request.send();
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(request.status === 200){
					var li = document.createElement('li');
					searchResult.appendChild('li');
					var data = JSON.parse(request.responseText);
					li.innerHTML = data;
				}else{
					alert("发生错误：" + request.status);
				}
			}
		}
	}
}
