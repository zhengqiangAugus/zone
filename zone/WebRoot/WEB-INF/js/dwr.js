/**
 * <p>用于加载dwr及处理dwr相关操作</p>
 */


function loadScript(src){
	var req;
	try {
	    req = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
	} catch (e) {
	    try {
	        req = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
	    } catch (e) {
	        req = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
	    }
	}
	req.open("get",src, false);
	req.onreadystatechange = function () {
	    if (req.readyState == 4 && req.status == 200) {
	    	var script = document.createElement("script");
	    	script.text = req.responseText;
	    	document.head.appendChild(script);
	    }
	};
	req.send(null);
}

loadScript("../dwr/engine.js");
//loadScript("../dwr/util.js");

var _pageStatus = false;
function _dwr__init(){
	_pageStatus = true;
}
if(window.addEventListener){
	window.addEventListener("load",_dwr__init,false);
	window.addEventListener("onload",_dwr__init,false);
}else{
	window.attachEvent("onload",_dwr__init);
}

function doDwr(wh,args,callback){
	if(!wh)return null;
	if(arguments.length == 2){
		if(typeof args == "function"){
			callback = args;
			args = null;
		}
	}
	var rawstate = dwr.engine._async;
	var source = wh.split(".");
	var result = "";
	var req;
	try {
	    req = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP
	} catch (e) {
	    try {
	        req = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP
	    } catch (e) {
	        req = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象
	    }
	}
	req.open("get","../dwr/interface/"+source[0]+".js", false);
	req.onreadystatechange = function () {
	    if (req.readyState == 4 && req.status == 200) {
	    	var script = document.createElement("script");
	    	script.text = req.responseText;
	    	document.head.appendChild(script);
	    	if(!callback){
				dwr.engine._async = false;
				callback = function(data){result = data;};
			}else{
				dwr.engine._async = true;
			}
			if(args){
				eval(wh+"(args,callback)");
			}else{
				eval(wh+"(callback)");
			}
	    }
	};
	req.send(null);
	dwr.engine._async = rawstate;
	return result;
}