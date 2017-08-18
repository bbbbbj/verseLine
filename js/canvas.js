var oWidth = document.documentElement.clientWidth || document.body.clientWidth;
var oHeight = document.documentElement.clientHeight || document.body.clientHeight;
	oCanvas();
	oCanvas2();
function oCanvas2(){
	var lines = [];
	var canvas2 = document.getElementById('canvas2');
	canvas2.width = oWidth;
	canvas2.height = oHeight;
	var context2 = canvas2.getContext('2d');
	var aLine;
	addLines();
	//3秒增加一个流星
	setInterval(function(){
		addLines();
	},3000);
	setInterval(function(){
		render();
		update();
	},20);

	//增加流星
	function addLines(){
		var aLine = {
			x:Math.random()*400+oWidth-400,
			y:Math.random()*100,
			z:Math.round(Math.random()*10)/10,
			v:Math.random()*2+3,
			color:'rgba(62,61,91,'+(Math.random()*0.5+0.5)+')'
		}
		lines.push(aLine);
	}

	//绘制流星
	function render(){
		canvas2.width = oWidth;
		canvas2.height = oHeight;
		for(var i=0;i<lines.length;i++){
			context2.moveTo(lines[i].x,lines[i].y);
			context2.lineTo(lines[i].x-50,lines[i].y+50);
			context2.strokeStyle = lines[i].color;
			context2.lineWidth = lines[i].z;
			context2.stroke();
		
		}
	}

	//更新线条
	function update(){
		for(var i=0;i<lines.length;i++){
			lines[i].x -= lines[i].v;
			lines[i].y += lines[i].v;
		} 
		//删除画布外的线条，优化性能
		var cnt = 0;
		for(var i = 0;i<lines.length;i++){
			if(lines[i].x < 0 && lines[i].y > canvas2.height || lines.length > 5){
				lines.splice(0,1);
			}
		}
	}
}

function oCanvas(){
	var circles = [];
	var canvas = document.getElementById('canvas');//获取canvas元素	
	canvas.width = oWidth;
	canvas.height = oHeight;	
	var context = canvas.getContext('2d');

	//创建构造函数circle
	function Circle(){
		this.x = Math.random()*canvas.width;//在画布随机生成x值
		this.r = Math.random()*1.5;//随机半径
		//绘制圆形
		this.y = Math.random()*canvas.height;
		
		this.paint = function(){
			context.beginPath();
			context.fillStyle = '#706e7f';
			context.arc(this.x,this.y,this.r,0,Math.PI*2);//绘制圆形
			context.fill();
		}
	}

	//创建圆形对象
	function createCircles(){
		for(var i=0;i<100;i++){
			var circle = new Circle();//调用构造函数
			circles[circles.length] = circle;//将绘制的图形追加到数组
		}
	}
	//绘制所有圆形
	function paintCircles(){
		for(var i=0;i<circles.length;i++){
			circles[i].paint();//遍历数组，将数组内的图形绘制
		}
	}
	createCircles();
	paintCircles();
}
//窗口大小改变时，画布重绘
window.onresize = function(){
	oWidth = document.documentElement.clientWidth || document.body.clientWidth;
	oHeight = document.documentElement.clientHeight || document.body.clientHeight;
	oCanvas();
}

