
	var keyBox = document.getElementById('key-box');
	var keyBoxLi = keyBox.getElementsByTagName('li');
	var conDisplay = document.getElementById('con-display');
	var conPage = document.getElementsByClassName('con-page')[0];
	var arrayIcon = ['shayu','qiatongrenwu','guochandonghuatuijian','dongwu','liangcaitu','qiatongqiamian','zemu','minilong','feijicaise','nv-caise'];

	
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
	function keyBoxClick(e){
		e = e || window.event;
		el = e.srcElement || e.target;
		if(el.className == "searLi" || el.parentNode.className == "searLi"){
			var i=el.getAttribute("total");
				i===0?act='searchVerse':act='searchPoet';
				var conDisplayLi = conDisplay.getElementsByTagName('li');
				var request = new XMLHttpRequest();
				request.open("GET","php/ajax.php?action="+act+"&keyword="+document.getElementById('search-verse').value);
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
								li.innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-`+arrayIcon[Math.floor(Math.random()*10)]+`"></use>
												</svg>
												<h5>`+arrayIcon[Math.round(Math.random()*10)]+`</h5>
												<p>`+ searchVerse.value + `</p>
												<p>` + data[0][i]+ `</p>
												<i class="iconfont" my="0">&#xe61f;</i>
												<i class="iconfont" my="1">&#xe608;</i>
												<i class="iconfont" my="2">&#xe502;</i>
												<div class="display-wrap">
												<div class="wrap-top"></div>
													<div class="comment">
														<span class="comment-span">＜</span>
														<input type="text" placeholder="你想说点什么">
														<i class="iconfont" my="3">&#xe608;</i>
													</div>
												</div>`;
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
								var pageSpan = conPage.getElementsByTagName('span');
								pageSpan[0].style.backgroundColor = 'rgb(90,20,42)';
							}
							
							pageSpanClick();
							
						}else{
							alert("发生错误：" + request.status);
						}
					}
				}
		}
	}
	addEventHander(conPage,'click',pageSpanClick);
	addEventHander(keyBox,'click',keyBoxClick);
