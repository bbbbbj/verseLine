window.onload=function(){
	console.log('aaa');
	var input = document.getElementById('input1');
	var searchResult = document.getElementById('search-result');
	var searchBox = document.getElementById('search-box');
	var keyBox = document.getElementById('key-box');
	var keyBoxLi = keyBox.getElementsByTagName('li');
	var conDisplay = document.getElementById('con-display');
	var conPage = document.getElementsByClassName('con-page')[0];
	var arrayIcon = ['nv-caise','qiatongrenwu','dongwu','dianhua-cai','liangcaitu','qiatongqiamian','zemu','minilong','feijicaise','caise'];

	//查询结果分页
	
	keyBoxLi[0].onclick = function(){ 
		var conDisplayLi = conDisplay.getElementsByTagName('li');
		var request = new XMLHttpRequest();
		request.open("GET","php/ajax.php?action=searchVerse&keyword="+document.getElementById('search-verse').value);
		request.send();
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(request.status === 200){
					var data = JSON.parse(request.responseText);
					var inum = data[3][0];
					conDisplay.innerHTML = '';
					conPage.innerHTML = '';
					for(var i=0;i<inum;i++){
						var li = document.createElement('li');
						li.innerHTML = '<svg class="iconfont search-icon" aria-hidden="true">'+
											'<use xlink:href="#icon-'+arrayIcon[Math.round(Math.random()*10)]+'"></use>'+
										'</svg>'+
										'<h5>'+arrayIcon[Math.round(Math.random()*10)]+'</h5>'+
										'<p>'+ searchVerse.value + '</p>'+
										'<p>' + data[0][i]+ '</p>';
						conDisplay.appendChild(li);
					}
					keyBox.style.display = 'none';
					for(var i=0;i<searchBoxP.length;i++){
						searchBoxP[i].style.display = 'block';
					}
					searchVerse.value ='';
					pageSpanClick();
					
				}else{
					alert("发生错误：" + request.status);
				}
			}
		}
	}
	
	keyBoxLi[1].onclick = function(){ 
		var conDisplayLi = conDisplay.getElementsByTagName('li');
		var request = new XMLHttpRequest();
		request.open("GET","php/ajax.php?action=searchPoet&keyword="+document.getElementById('search-verse').value);
		request.send();
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(request.status === 200){
					var data = JSON.parse(request.responseText);
					var inum = data[3][0];
					var a=1;
					conDisplay.innerHTML = '';
					conPage.innerHTML = ''
					for(var i=0;i<inum;i++){
						var li = document.createElement('li');
						li.innerHTML = '<svg class="iconfont search-icon" aria-hidden="true">'+
											'<use xlink:href="#icon-'+arrayIcon[Math.floor(Math.random()*10)]+'"></use>'+
										'</svg>'+
										'<h5>'+arrayIcon[Math.round(Math.random()*10)]+'</h5>'+
										'<p>'+ searchVerse.value + '</p>'+
										'<p>' + data[0][i]+ '</p>';
						conDisplay.appendChild(li);
						if(i<6){
							conDisplayLi[i].style.display = 'block';
						}else{
							conDisplayLi[i].style.display = 'none';
						}
					}
					keyBox.style.display = 'none';
					for(var i=0;i<searchBoxP.length;i++){
						searchBoxP[i].style.display = 'block';
					}
					searchVerse.value ='';
					if(inum/6>1){
						for(let i=0;i<inum/6;i++){
							var pageSpan = document.createElement('span');
							pageSpan.innerHTML = a;
							conPage.appendChild(pageSpan);
							a++;
						}
					}
					var pageSpan = conPage.getElementsByTagName('span');
					pageSpan[0].style.backgroundColor = 'rgb(90,20,42)';
					pageSpanClick();
					
				}else{
					alert("发生错误：" + request.status);
				}
			}
		}
	}
	
	function pageSpanClick(){
		console.log('ddd');
		var conDisplayLi = conDisplay.getElementsByTagName('li');
		var pageSpan = conPage.getElementsByTagName('span');
		for(let i=0;i<pageSpan.length;i++){
			console.log('bbb');
			pageSpan[i].onclick = function(){
				console.log('jjj');
				for(var x=0;x<pageSpan.length;x++){
					pageSpan[x].style.backgroundColor = '';
				}
				pageSpan[i].style.backgroundColor = 'rgb(90,20,42)';
				for(var j=0;j<conDisplayLi.length;j++){
					if(j<6*i || j>6*i+5){
						conDisplayLi[j].style.display = 'none';
					}else{
						conDisplayLi[j].style.display = 'block';
					}
				}
			}
			
		}
		
	}
	addEventHander(conPage,'click',pageSpanClick);
}
