(function(doc, win){
    var docE1 = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function(){
            var clientWidth = docE1.clientWidth;
            if(!clientWidth) return;
            docE1.style.fontSize = 20 * (clientWidth / 1500) + 'px';            
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
})(document,window);
	//页面加载调用本地存储信息，实现自动登录，个人收藏点赞评论等信息的更新
	window.onload = function(){
		//完成自动登录
		if(!localStorage.getItem('name') || localStorage.getItem('name') == '未登录'){
			localStorage.setItem("name","未登录");
		}else{
			popUpInput[5].value = localStorage.getItem('name');
			popUpInput[6].value = localStorage.getItem('pwd');
			login();
		}
		
		disUpdate();//展示区更新
		colUpdate();//收藏区更新

	}
	var storage = window.localStorage;	
	var searchVerse = document.getElementById('search-verse');//诗句搜索输入框
	var searchBox = document.getElementById('search-box');//搜索
	var searchBoxP = searchBox.getElementsByTagName('p');//搜索框下面文本
	var keyBox = document.getElementById('key-box');//搜索索引框
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
	var conDisplay = document.getElementById('con-display');//展示区
	var exit = document.getElementsByClassName('exit')[0];//退出登录
	var collect = document.getElementsByClassName('collect')[0];//收藏夹
	var conDisplay = document.getElementById('con-display');//展示区
	var conPage = document.getElementsByClassName('con-page')[0];//分页区
	//展示区随机字体图标
	var arrayIcon = ['shayu','qiatongrenwu','guochandonghuatuijian','dongwu','liangcaitu','qiatongqiamian','zemu','minilong','feijicaise','nv-caise'];
	//注册验证
	var userSer,passwordSer,passSer,telSer,emailSer,comm;
	//本地存储收藏、点赞、评论数组
	var loc = [],coll=[],zan=[];

	//页面滚动触发动画效果
	window.onscroll = function(){
		var circle = document.getElementById('circle');
		var oLi = circle.getElementsByTagName('li');
		sTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(sTop === 0){
			scroll = false;
			oLi[0].style.top = -9 + 'rem';
			for(var i=1;i<oLi.length;i++){
				oLi[i].style.transform = 'scale(1)';
			}
		}else{
			oLi[0].style.top = -11 + 'rem';
			for(var i=1;i<oLi.length;i++){
				oLi[i].style.transform = 'scale(0.8)';
				oLi[i].style.webkitTransform = 'scale(0.8)';
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
	//页码切换
	function pageSpanClick(e){
		e = e || window.event;
		el = e.srcElement || e.target;
		if(el.parentNode == conPage){
			var conDisplayLi = conDisplay.getElementsByTagName('li');
			var pageSpan = conPage.getElementsByTagName('span');
			for(var x=0;x<pageSpan.length;x++){
				pageSpan[x].style.backgroundColor = '';
			}
			el.style.backgroundColor = 'rgb(90,20,42)';
			for(var j=0;j<conDisplayLi.length;j++){
				if(j<6*(parseInt(el.innerHTML)-1) || j>6*(parseInt(el.innerHTML)-1)+5){
					conDisplayLi[j].style.display = 'none';
				}else{
					conDisplayLi[j].style.display = 'block';
				}
			}
		}	
	}
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
							var userWel = document.getElementsByClassName('user-wel')[0];
							localStorage.setItem('name',popUpInput[5].value);
							localStorage.setItem('pwd',popUpInput[6].value);
							userWel.innerHTML = '你好，' + popUpInput[5].value;
							oI[1].style.display = 'none';
							oI[2].style.display = 'none';
							exit.innerHTML = '退出';
							regiNone();
							disUpdate();//展示区更新
							colUpdate();//收藏区更新
						}
					}else{
						alert("发生错误：" + request.status);
					}
				}
			}
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
	//注册输入验证
	for(let i=0;i<5;i++){
		//事件代理
		popUpInput[i].onblur = function(e){
			e = e || e.event;
			el = e.srcElement;
			el.style.borderColor = 'red';
			switch(el.getAttribute('id')){
				case 'regi-username':
					if(el.value === '' || el.value.indexOf(' ')>=0) {
						popUpSpan[i].innerHTML = '用户名不能为空且不能包含空格';
						userSer = false;
					}else if(el.value.length<4 || el.value.length>16){
						popUpSpan[i].innerHTML = '用户名为4-16个字符';
						userSer = false;
					}else if(/^[0-9]/.test(el.value)){
						popUpSpan[i].innerHTML = '用户名不能以数字开头';
						userSer = false;
					}else{
						var request = new XMLHttpRequest();
						request.open("GET","php/ajax.php?action=regiUser&keyword="+el.value);
						request.send();
						request.onreadystatechange = function(){
							if(request.readyState === 4){
								if(request.status === 200){
									var data = request.responseText;
									popUpSpan[i].innerHTML = data;
									if(popUpLi[i].innerHTML.indexOf('svg')>=0){
										el.style.borderColor = 'green';
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
					if(el.value === '' || el.value.indexOf(' ')>=0) {
						popUpSpan[i].innerHTML = '密码不能为空且不能包含空格';
						passwordSer = false;
					}else if(el.value.length<8 || el.value.length>16){
						popUpSpan[i].innerHTML = '密码为8-16个字符';
						passwordSer = false;
					}else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(el.value))) {
						popUpSpan[i].innerHTML = '密码必须为数字和字母的组合';
						passwordSer = false;
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						el.style.borderColor = 'green';
						passwordSer = true;
					}
					break;
				case 'regi-password2':
					if(el.value === ''){
						popUpSpan[i].innerHTML = '输入不能为空';
						passSer = false;
					}else if(el.value !== popUpInput[i-1].value){
						popUpSpan[i].innerHTML = '两次输入不一致';
						passSer = false;
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						el.style.borderColor = 'green';
						passSer = true;
					}
					break;
				case 'regi-tel':
					if(el.value === ''){
						popUpSpan[i].innerHTML = '手机号不能为空';
						telSer = false;
					}else if(!(/((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(el.value))){
						popUpSpan[i].innerHTML = '请输入正确的手机号';
						telSer = false;
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						el.style.borderColor = 'green';
						telSer = true;
					}
					break;
				case 'regi-email':
					if(el.value === ''){
						popUpSpan[i].innerHTML = '邮箱不能为空';
						emailSer = false;
					}else if(!(/([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(el.value))){
						popUpSpan[i].innerHTML = '请输入正确的邮箱';
						emailSer = false;
					}else{
						popUpSpan[i].innerHTML = `<svg class="iconfont search-icon" aria-hidden="true">
													<use xlink:href="#icon-duihao"></use>
												</svg>`;
						el.style.borderColor = 'green';
						emailSer = true;
					}
					break;
			}
		}
	}
	//登录界面弹出层
	function loginBlock() {
		if(localStorage.getItem('name') && localStorage.getItem('name') != '未登录'){
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
	//退出登录
	function exitClick(){
		var userWel = document.getElementsByClassName('user-wel')[0];
		userWel.innerHTML = '';
		exit.innerHTML = '';
		localStorage.removeItem('pwd');
		localStorage.setItem('name','未登录');
		oI[1].style.display = 'block';
		oI[2].style.display = 'block';
		disUpdate();//展示区更新
		colUpdate();//收藏区更新
	}
	
	//搜索框获得焦点
	function searchVerseFocus(){
		searchVerse.placeholder = '';
	}
	//搜索框输入
	function searchVerseKeyup(){
		var keyBoxLi = keyBox.getElementsByTagName('li');
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
	//诗句、作者搜索
	function keyBoxClick(e){
		e = e || window.event;
		el = e.srcElement || e.target;
		if(el.className == "searLi" || el.parentNode.className == "searLi"){
			var j=el.getAttribute("total") || el.parentNode.getAttribute("total");
			var act;
				j=='0'?act='searchVerse':act='searchPoet';
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
	
	//收藏、点赞、评论
	function conDisClick(e){
		e = e || window.event;
		el = e.srcElement || e.target;
		var my = el.getAttribute('my');
		switch(my){
			case '0':
				var conInfo = el.parentNode.getElementsByTagName('p')[0].innerHTML+'<br>'+el.parentNode.getElementsByTagName('p')[1].innerHTML;
				var resultZan = JSON.parse(localStorage.getItem('zan'));
				if(el.style.color == 'rgb(90, 20, 42)'){
					for (var i = 0; i < resultZan.length; i++) {//删除本地存储
			            if (resultZan[i].conInfo == conInfo) {
			                zan.splice(i,1);
			            }
			        }
			        localStorage.setItem('zan', JSON.stringify(zan));
			        disUpdate();
				}else{
					el.style.color = 'rgb(90,20,42)';
					var name = localStorage.getItem('name');
					var za = {"conInfo":conInfo,"name":name};
					if(resultZan){
						for (var i = 0; i < resultZan.length; i++) {//判断本地存储是否有重复信息
				            if (resultZan[i].conInfo == za.conInfo && resultZan[i].name == za.name) {
				                zan.splice(i,1);
				            }
				        }
					}
			        zan.push(za);
			        localStorage.setItem('zan', JSON.stringify(zan));
				}

				break;
			case '1':
				el.parentNode.getElementsByClassName('display-wrap')[0].style.display = 'block';
				break;
			case '2':
				var conInfo = el.parentNode.getElementsByTagName('p')[0].innerHTML+'<br>'+el.parentNode.getElementsByTagName('p')[1].innerHTML;
				var resultColl = JSON.parse(localStorage.getItem('coll'));
				if(el.style.color == 'rgb(90, 20, 42)'){
					for (var i = 0; i < resultColl.length; i++) {//删除本地存储
			            if (resultColl[i].conInfo == conInfo) {
			                coll.splice(i,1);
			            }
			        }
			        localStorage.setItem('coll', JSON.stringify(coll));
				}else{
					el.style.color = 'rgb(90,20,42)';
					var name = localStorage.getItem('name');
					var col = {"conInfo":conInfo,"name":name};
					if(resultColl){
						for (var i = 0; i < resultColl.length; i++) {//判断本地存储是否有重复信息
				            if (resultColl[i].conInfo == col.conInfo && resultColl[i].name == col.name) {
				                coll.splice(i,1);
				            }
				        }
					}
			        coll.push(col);
			        localStorage.setItem('coll', JSON.stringify(coll));
				}
				
				colUpdate();

				break;
			case '3':
				var commentInfo = el.parentNode.getElementsByTagName('input')[0].value;
				if(commentInfo !=0){
					var name = localStorage.getItem('name');
					var p = el.parentNode.parentNode.parentNode.getElementsByTagName('p');
					var conInfo = p[0].innerHTML + '<br>' + p[1].innerHTML;
					var com = {"name":name,"conInfo":conInfo,"commentInfo":commentInfo,"src":"img/a.jpg"}
					loc.push(com);
					localStorage.setItem('loc',JSON.stringify(loc));
				}
				break;
			case '4':
				el.parentNode.parentNode.style.display = 'none';
				break;
		}
		disUpdate();
	}
	//更新收藏区
	function colUpdate(){
		collect.innerHTML = '';
		var resultColl =JSON.parse(localStorage.getItem('coll'));
		var name = localStorage.getItem('name');
		if(resultColl){
			for(let j=0;j<resultColl.length;j++){
				var conInfoColl = resultColl[j].conInfo;
				var nameColl = resultColl[j].name;
				var a=[];
				if(nameColl === name){
					a.push(conInfoColl);
					for(var c=0;c<a.length;c++){
						collect.innerHTML += `<li>
								<p>`+a[c]+`</p>
								<i class="iconfont">&#xe6e5;</i>
								</li>`;
					}
					
				}
			}
		}
	}
	//更新展示区
	function disUpdate(){
		var resultColl =JSON.parse(localStorage.getItem('coll'));
		var resultZan =JSON.parse(localStorage.getItem('zan'));
		var resultLoc =JSON.parse(localStorage.getItem('loc'));
		var name = localStorage.getItem('name');
		var conDisplayLi = conDisplay.getElementsByTagName('li');
		var wrapTop = document.getElementsByClassName('wrap-top');
		for(let i=0;i<conDisplayLi.length;i++){
			wrapTop[i].innerHTML = '';
			var conInfo = conDisplayLi[i].getElementsByTagName('p')[0].innerHTML + '<br>' + conDisplayLi[i].getElementsByTagName('p')[1].innerHTML;
			var conDisplayLiI = conDisplayLi[i].getElementsByTagName('i');
			for(let a=0;a<conDisplayLiI.length;a++){
				conDisplayLiI[a].style.color = '';
			}
			if(resultColl){
				for(let j=0;j<resultColl.length;j++){
					var conInfoColl = resultColl[j].conInfo;
					var nameColl = resultColl[j].name;
					if(conInfo === conInfoColl && name === nameColl){
						conDisplayLi[i].getElementsByTagName('i')[2].style.color = 'rgb(90,20,42)';
					}
				}
			}
			if(resultZan){
				for(let j=0;j<resultZan.length;j++){
					var conInfoZan = resultZan[j].conInfo;
					var nameZan = resultZan[j].name;
					if(conInfo === conInfoZan && name === nameZan){
						conDisplayLi[i].getElementsByTagName('i')[0].style.color = 'rgb(90,20,42)';
					}
				}
			}
			if(resultLoc){
				for(let j=0;j<resultLoc.length;j++){
					var commentInfo = resultLoc[j].commentInfo;
					var conInfoLoc = resultLoc[j].conInfo;
					var nameLoc = resultLoc[j].name;
					var a=[],b=[];
					if(conInfo === conInfoLoc){
						a.push(commentInfo);
						b.push(nameLoc);
						for(var c=0;c<a.length;c++){
							wrapTop[i].innerHTML += `<div>
								<img src="img/a.jpg" alt="">
								<span>`+b[c]+`</span>
								<p>`+a[c]+`</p>
								</div>`;
						}
					}
				}
			}
		}
	}
	//删除收藏
	function collectClick(e){
		e = e || window.event;
		el = e.srcElement || e.target;
		var resultColl = JSON.parse(localStorage.getItem('coll'));
		if(el.className == 'iconfont'){
			p=el.parentNode.getElementsByTagName('p')[0].innerHTML;
			for(let i=0;i<resultColl.length;i++){
				if(resultColl[i].conInfo == p){
					resultColl.splice(i,1);
				}
			}
			localStorage.setItem('coll',JSON.stringify(resultColl));
			colUpdate();
		}
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
	addEventHander(conPage,'click',pageSpanClick);
	addEventHander(keyBox,'click',keyBoxClick);
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
	addEventHander(conDisplay,'click',conDisClick);//以父元素为对象，所以先调用一次
	addEventHander(exit,'click',exitClick);
	addEventHander(collect,'click',collectClick);//删除收藏