
/**
 * 为一个对象绑定事件 参数：作用对象  事件名（去除‘on’） 具体执行的方法（执行对象） 
 */
function bindEvent(){
	var arg = arguments;
	if(arg.length == 3){
		var obj = arg[0];
		var eve = arg[1];
		var func = arg[2];
		if(window.addEventListener){
			obj.addEventListener(eve,func,false);//FF
			obj.addEventListener("on"+eve,func,false);//360
		}else{
			obj.attachEvent("on"+eve,func);//IE
		}
	}
}

function unUseKeys(){
	bindEvent(window,"keydown",function(e){
		e = window.event || e;
	    var keycode = e.keyCode || e.which;
        if(window.event){// ie
            try{e.keyCode = 0;}catch(ee){}
            e.returnValue = false;
        }else{// ff
            e.preventDefault();
        }
        e.cancelBubble = true;
        window.event.returnValue = false;
        return false;
	});
}

/**
 * 调用浏览器全屏的方法
 */
function fullScreen(){
	bindEvent(window,"click",function(){
		fullScreen0();
	});
}
function fullScreen0(){
	if(window.screen.height-window.document.body.clientHeight>90){
		var el = document.documentElement; 
		var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen; 
		if (typeof rfs != "undefined" && rfs) { 
			rfs.call(el);
		}else if(window.ActiveXObject.toString() != undefined){
			var wsh = new ActiveXObject("WScript.Shell"); 
			wsh.sendKeys("{F11}");
		}
	}
}