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

function doDwr(){
	var args = "";
	var executor = arguments[0];
	var hascallback = false;
	var arrs = arguments;
	if(arguments.length >= 2){
		for(var i = 1;i<arguments.length;i++){
			args += "arrs["+i+"],";
		}
		if(args.length>0)args = args.substring(0,args.length-1);
		if(typeof arguments[arguments.length-1] == "function"){
			hascallback = true;
		}
	}
	var rawstate = dwr.engine._async;
	var source = executor.split(".");
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
	    	var callback;
	    	if(!hascallback){
				dwr.engine._async = false;
				callback = function(data){result = data;};
			}else{
				dwr.engine._async = true;
			}
			if(!hascallback){
				eval(executor+"("+args+",callback)");
			}else{
				eval(executor+"("+args+")");
			}
	    }
	};
	req.send(null);
	dwr.engine._async = rawstate;
	return result;
}