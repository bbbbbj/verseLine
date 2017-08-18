window.onload=function(){
	console.log('aaa');
	var input = document.getElementById('input1');
	var searchResult = document.getElementById('search-result');
	var searchBox = document.getElementById('search-box');
	var keyBox = document.getElementById('key-box');
	var keyBoxLi = keyBox.getElementsByTagName('li');
	var conDisplay = document.getElementById('con-display');
	var conDisplayLi = conDisplay.getElementsByTagName('li');
	keyBoxLi[0].onclick = function(){ 
		var request = new XMLHttpRequest();
		request.open("GET","php/ajax.php?keyword="+document.getElementById('search-verse').value);
		request.send();
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(request.status === 200){
					var data = JSON.parse(request.responseText);
					var inum = data[3][0];
					for(var i=0;i<inum;i++){
						var displayLiP = conDisplayLi[i].getElementsByTagName('p');
						displayLiP[0].innerHTML = searchVerse.value;
						displayLiP[1].innerHTML = data[0][i];
					}
					keyBox.style.display = 'none';
					for(var i=0;i<searchBoxP.length;i++){
						searchBoxP[i].style.display = 'block';
					}
					searchVerse.value ='';

					
				}else{
					alert("发生错误：" + request.status);
				}
			}
		}
	}
	
	keyBoxLi[1].onclick = function(){ 
		var request = new XMLHttpRequest();
		request.open("GET","php/ajax1.php?keyword="+document.getElementById('search-verse').value);
		request.send();
		request.onreadystatechange = function(){
			if(request.readyState === 4){
				if(request.status === 200){
					var data = JSON.parse(request.responseText);
					var inum = data[3][0];
					for(var i=0;i<inum;i++){
						if(i<6){
							var displayLiP = conDisplayLi[i].getElementsByTagName('p');
							displayLiP[0].innerHTML = searchVerse.value;
							displayLiP[1].innerHTML = data[0][i];
						}else if(i>=6){
							var li = document.createElement('li');
							li.innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
												<use xlink:href="#icon-qiatongrenwu"></use>
											</svg>
											<h5>katong</h5>
											<p>`+ searchVerse.value + `</p>
											<p>` + data[0][i]+ '</p>';
							conDisplay.appendChild('li');
						}
						
					}
					keyBox.style.display = 'none';
					for(var i=0;i<searchBoxP.length;i++){
						searchBoxP[i].style.display = 'block';
					}
					searchVerse.value ='';

					
				}else{
					alert("发生错误：" + request.status);
				}
			}
		}
	}
	
}
