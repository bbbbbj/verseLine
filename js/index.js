window.onload = function(){
	if(localStorage.getItem('name')){
		popUpInput[5].value = localStorage.getItem('name');
		popUpInput[6].value = localStorage.getItem('pwd');
		login();
	}
	var name = localStorage.getItem('name');
	var conDisplayLiI = conDisplay.getElementsByTagName('i');
	for(let i=0;i<conDisplayLiI.length;i++){
		var p = conDisplayLiI[i].parentNode.getElementsByTagName('p')[0].innerHTML + '<br>' + conDisplayLiI[i].parentNode.getElementsByTagName('p')[1].innerHTML;
		if(localStorage.getItem(name+p)){
			conDisplayLiI[i].style.color = 'rgb(90,20,42)';
		}
	}

}
	var storage = window.localStorage;
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
	var oI = document.getElementsByClassName('iconClick');//登录注册喜好图标
	var popUp = document.getElementById('pop-up-box');//弹出层
	var popUpLi = popUp.getElementsByTagName('li');//弹出层所有li
	var popUpInput = popUp.getElementsByTagName('input');//注册登录的所有的输入框
	var popUpSpan = popUp.getElementsByTagName('span');//注册登录的所有的span
	var loginBox = document.getElementsByClassName('login-box')[0];//登录框
	var wrapBox = document.getElementsByClassName('wrap-box')[0];//遮罩层
	var regiBox = document.getElementsByClassName('regi-box')[0];//注册框
	var regiBtn = document.getElementById('register');//注册按钮
	var loginBtn = document.getElementById('login');//注册按钮
	var userWel = document.getElementsByClassName('user-wel')[0];
	var conDisplay = document.getElementById('con-display');//展示区
	var exit = document.getElementsByClassName('exit')[0];
	var userSer,passwordSer,passSer,telSer,emailSer;
		//登录按钮
	function login(){
		if(popUpInput[5].value === ''){
			popUpSpan[5].innerHTML = '用户名不能为空';
		}else if(popUpInput[6].value === ''){
			popUpSpan[6].innerHTML = '密码不能为空';
		}else{
			var request = new XMLHttpRequest();
			request.open("GET","php/ajax.php?action=userService&username="+popUpInput[5].value+"&password="+popUpInput[6].value);
			request.send();
			request.onreadystatechange = function(){
				if(request.readyState === 4){
					if(request.status === 200){
						var data = request.responseText;
						if(data === '该用户不存在'){
							popUpSpan[5].innerHTML = data;
						}else if(data === '密码错误'){
							popUpSpan[6].innerHTML = data;
						}else{
							localStorage.setItem('name',popUpInput[5].value);
							localStorage.setItem('pwd',popUpInput[6].value);
							userWel.innerHTML = '你好，' + popUpInput[5].value;
							oI[1].style.display = 'none';
							oI[2].style.display = 'none';
							exit.innerHTML = '退出';
							regiNone();

						}
					}else{
						alert("发生错误：" + request.status);
					}
				}
			}
		}
	}


	
	//查询结果分页
	function goPage(){
		var pageNo;//页码
		var pageSize = 6;//每页数量
		var a=1;
		var conDisplayLi = document.getElementById('con-display').getElementsByTagName('li');
		var page = conDisplayLi.length/pageSize;
		var conPage = document.getElementsByClassName('con-page')[0];
		for(var i=0;i<conDisplayLi.length;i++){
			if(i<=6){
				conDisplayLi[i].style.display = 'block';
			}else{
				conDisplayLi[i].style.display = 'none';
			}
		} 
		for(var i=0;i<page;i++){
			var pageSpan = document.createElement('span');
			span.innerHTML = a;
			conPage.appendChild('pageSpan');
			a++;
		}

	}
	//注册按钮
	function register(){
		if(userSer && passwordSer && passSer && telSer && emailSer){
			var request = new XMLHttpRequest();
			request.open("GET","php/ajax.php?action=insertUser&username="+popUpInput[0].value+"&password="+popUpInput[1].value+"&tel="+popUpInput[3].value+"&email="+popUpInput[4].value);
			request.send();
			request.onreadystatechange = function(){
				if(request.readyState === 4){
					if(request.status === 200){
						regiBox.style.display = 'none';
						loginBox.style.display = 'block';
					}else{
						alert("发生错误：" + request.status);
					}
				}
			}
		}
		
	}

	for(let i=0;i<popUpInput.length;i++){
		//事件代理
		popUpInput[i].onblur = function(e){
			e = e || e.event;
			el = e.srcElement;
			popUpInput[i].style.borderColor = 'red';
			switch(el.getAttribute('id')){
				case 'regi-username':
					if(popUpInput[i].value === '' || popUpInput[i].value.indexOf(' ')>=0) {
						popUpSpan[i].innerHTML = '用户名不能为空且不能包含空格';
					}else if(popUpInput[i].value.length<4 || popUpInput[i].value.length>16){
						popUpSpan[i].innerHTML = '用户名为4-16个字符';
					}else if(/^[0-9]/.test(popUpInput[i].value)){
						popUpSpan[i].innerHTML = '用户名不能以数字开头';
					}else{
						var request = new XMLHttpRequest();
						request.open("GET","php/ajax.php?action=regiUser&keyword="+popUpInput[i].value);
						request.send();
						request.onreadystatechange = function(){
							if(request.readyState === 4){
								if(request.status === 200){
									var data = request.responseText;
									popUpSpan[i].innerHTML = data;
									if(popUpLi[i].innerHTML.indexOf('svg')>=0){
										popUpInput[i].style.borderColor = 'green';
										userSer = true;
									}
								}else{
									alert("发生错误：" + request.status);
								}
							}
						}
					}
					break;
				case 'regi-password':
					if(popUpInput[i].value === '' || popUpInput[i].value.indexOf(' ')>=0) {
						popUpSpan[i].innerHTML = '密码不能为空且不能包含空格';
					}else if(popUpInput[i].value.length<8 || popUpInput[i].value.length>16){
						popUpSpan[i].innerHTML = '密码为8-16个字符';
					}else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(popUpInput[i].value))) {
						popUpSpan[i].innerHTML = '密码必须为数字和字母的组合';
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						popUpInput[i].style.borderColor = 'green';
						passwordSer = true;
					}
					break;
				case 'regi-password2':
					if(popUpInput[i].value === ''){
						popUpSpan[i].innerHTML = '输入不能为空';
					}else if(popUpInput[i].value !== popUpInput[i-1].value){
						popUpSpan.innerHTML = '两次输入不一致';
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						popUpInput[i].style.borderColor = 'green';
						passSer = true;
					}
					break;
				case 'regi-tel':
					if(popUpInput[i].value === ''){
						popUpSpan[i].innerHTML = '手机号不能为空';
					}else if(!(/((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(popUpInput[i].value))){
						popUpSpan[i].innerHTML = '请输入正确的手机号';
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						popUpInput[i].style.borderColor = 'green';
						telSer = true;
					}
					break;
				case 'regi-email':
					if(popUpInput[i].value === ''){
						popUpSpan[i].innerHTML = '邮箱不能为空';
					}else if(!(/([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(popUpInput[i].value))){
						popUpSpan[i].innerHTML = '请输入正确的邮箱';
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						popUpInput[i].style.borderColor = 'green';
						emailSer = true;
					}
					break;
			}
		}
	}

	//登录界面弹出层
	function loginBlock() {
		if(localStorage.getItem('name')){
			popUpInput[5].value = localStorage.getItem('name');
			popUpInput[6].value = localStorage.getItem('pwd');
		}
		wrapBox.style.display = 'block';
		loginBox.style.display = 'block';
	}
	//隐藏弹出层及遮罩层
	function regiNone(){
		wrapBox.style.display = 'none';
		loginBox.style.display = 'none';
		regiBox.style.display = 'none';
	}
	//弹出注册框
	function regiBlock() {
		wrapBox.style.display = 'block';
		regiBox.style.display = 'block';
	}
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
	//收藏功能
	function conDisClick(){
		var conDisplayLiI = conDisplay.getElementsByTagName('i');
		for(let j=0;j<conDisplayLiI.length;j++){
			conDisplayLiI[j].onclick = function(){
				switch(j%3){
					case 2:
						var conDisplayLiP = conDisplayLiI[j].parentNode.getElementsByTagName('p');
						var conInfo = conDisplayLiP[0].innerHTML + '<br>' + conDisplayLiP[1].innerHTML;
				     	var name = localStorage.getItem('name');
				        var keyName = name + conInfo;
						if(conDisplayLiI[j].style.color == 'rgb(90, 20, 42)'){
							console.log('fff');
							conDisplayLiI[j].style.color = '';
							localStorage.removeItem(keyName);
						}else{
							conDisplayLiI[j].style.color = 'rgb(90,20,42)';
					        for (var i = 0; i < localStorage.length; i++) {
					            if (localStorage.key(i) == keyName) {
					                localStorage.removeItem(keyName);
					            }
					        }//判断本地存储是否有重复信息
					        localStorage.setItem(keyName, conInfo);
					        var collect = document.getElementsByClassName('collect')[0];
							var oLi = document.createElement('li');
							oLi.innerHTML += '<p>'+ localStorage.getItem(keyName) +'</p><i class="iconfont">&#xe6e5;</i>';
							collect.appendChild(oLi);
						}
						break;
				}
			}
		}
	}
	addEventHander(searchVerse,'focus',searchVerseFocus);
	addEventHander(searchVerse,'keyup',searchVerseKeyup);
	addEventHander(searchVerse,'blur',searchVerseBlur);
	addEventHander(searchVerse,'focus',searchVerseFocus);
	addEventHander(searchVerse,'focus',searchVerseFocus);
	addEventHander(searchVerse,'focus',searchVerseFocus);
	addEventHander(oI[1],'click',loginBlock);
	addEventHander(oI[2],'click',regiBlock);
	addEventHander(wrapBox,'click',regiNone);
	addEventHander(regiBtn,'click',register);
	addEventHander(loginBtn,'click',login);
	addEventHander(conDisplay,'click',conDisClick());//以父元素为对象，所以先调用一次
	addEventHander(exit,'click',function(){
		userWel.innerHTML = '';
		exit.innerHTML = '';
		oI[1].style.display = 'block';
		oI[2].style.display = 'block';
	});



	




	