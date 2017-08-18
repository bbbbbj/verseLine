var con = document.getElementById('container');
	var oCircle = document.getElementById('circle');
	var oLi = oCircle.getElementsByTagName('li');
	var oWidth = document.documentElement.clientWidth || document.body.clientWidth;
	var oHeight = document.documentElement.clientHeight || document.body.clientHeight;
	var searchVerse = document.getElementById('search-verse');
	var searchBox = document.getElementById('search-box');
	var searchBoxP = searchBox.getElementsByTagName('p');
	var keyBox = document.getElementById('key-box');
	var keyBoxLi = keyBox.getElementsByTagName('li');
	window.onscroll = function(){
		sTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(sTop === 0){
			scroll = false;
			oLi[0].style.top = -180 + 'px';
			for(var i=1;i<oLi.length;i++){
				oLi[i].style.transform = 'scale(1)';
			}
		}else{
			oLi[0].style.top = -220 + 'px';
			for(var i=1;i<oLi.length;i++){
				oLi[i].style.transform = 'scale(0.8)';
				oLi[i].style.transition = 'all 1s';
			}
		}
		
	}
	//搜索框获得焦点
	function searchVerseFocus(){
		searchVerse.placeholder = '';
	}
	//搜索框输入
	function searchVerseKeyup(){
		if(searchVerse.value !=='') {
			var keyBoxSpan1 = keyBoxLi[0].getElementsByTagName('span')[0];
			var keyBoxSpan2 = keyBoxLi[1].getElementsByTagName('span')[0];
			for(var i=0;i<searchBoxP.length;i++){
				searchBoxP[i].style.display = 'none';
			}
			keyBox.style.display = 'block';
			if(searchVerse.value.length<=16){
				keyBoxSpan1.innerHTML = '查找' + searchVerse.value + '的无情对';
				keyBoxSpan2.innerHTML = '查找作者' + searchVerse.value;
			}
			
		}
		if(searchVerse.value === ''){
			for(var i=0;i<searchBoxP.length;i++){
				searchBoxP[i].style.display = 'block';
			}
			keyBox.style.display = 'none';
		}
	}
	//搜索框失去焦点
	function searchVerseBlur(){
		searchVerse.placeholder = 'Shake chili';
	}
	
	
	/*addEventListener:监听DOM元素的事件

	target: 监听对象
	type: 监听函数类型，如click，mouseover
	func: 监听函数*/
	function addEventHander(target,type,func){
		if(target.addEventListener){
			//监听IE9，谷歌和火狐
			target.addEventListener(type,func,false);
		}else if(target.attachEvent){
			target.attachEvent('on' + type, func);
		}else{
			target['on' + type] = func;
		}
	}
	/*
	removeEventHandler:移除DOM元素的事件

	target：监听对象
	type：监听函数类型，如click，mouseover
	Func：监听函数
	 */
	function removeEventHandler(target, type, func){
		if(target.removeEventlistener){
			//监听IE9，谷歌和火狐
			target.removeEventlistener(type, func, false);
		}else if(target.detachEvent){
			target.detachEvent('on' + type, func);
		}else{
			delete target['on' + type];
		}
	}
	addEventHander(searchVerse,'focus',searchVerseFocus);
	addEventHander(searchVerse,'keyup',searchVerseKeyup);
	addEventHander(searchVerse,'blur',searchVerseBlur);
	addEventHander(searchVerse,'focus',searchVerseFocus);
	addEventHander(searchVerse,'focus',searchVerseFocus);
	addEventHander(searchVerse,'focus',searchVerseFocus);