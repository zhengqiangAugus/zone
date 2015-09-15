/**
 * Created by y on 2015/1/4.
 */
(function($){
    $.fn.imageSelect = function(){
    	var imgData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJ0lEQVQImWN8+fbb//8MjIwM//8zMDAwMCFzGBgYmCAcRkYYn4A8AMdXEtTe90FMAAAAAElFTkSuQmCC";
        var args = arguments;
        var config = {
            style:{display:"inline-block"},
            picker:$('<div onSelect="document.selection.empty();" onDragStart="return false;" onSelectStart="return false" onContextMenu="return false" style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;cursor:default;"></div>'),
            listener:function(){}
        }
        if(args.length>1){
            return;
        }
        if(args.length>0){
            if(typeof  args[0] == "object"&&args[0].width){
                config.picker = args[0];
            }else{
                var t = args[0];
                if(t.picker){
                    config.picker = t.picker;
                }
                if(t.style){
                    config.style = t.style;
                }
                if(t.listener){
                    config.listener = t.listener;
                }
            }
        }
        $(this).css({
        	"z-index":"0",
        	"position":"absolute",
        	"top":"0px",
        	"left":"0px",
        	"border":"none"
        }).attr("class","foreg");
        
        var pppane = $(this).parent(".pane");
        pppane.before(this);
        pppane.remove();
        $(this).each(function(){
            var pane = $('<div onSelect="document.selection.empty();" onDragStart="return false;" onSelectStart="return false" onContextMenu="return false" style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;"></div>').attr({
                "class":"pane",
                "draggable":false
            }).css({
                "position":"relative",
                "width":$(this).width(),
                "height":$(this).height(),
                "border":"none",
                "z-index":"4"
            });
            pane.css(config.style);
            var foreg = $("<div></div>").attr({
                "class":"foreg",
                "draggable":false
            }).css({
                "position":"absolute",
                "width":$(this).width(),
                "height":$(this).height(),
                "top":"0px",
                "left":"0px",
                "z-index":"4"
            });
            var selector = $('<div style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;user-select: none;"></div>').attr({
                "class":"select_area",
                "draggable":false
            }).css({
                "position":"absolute",
                "width":0,
                "height":0,
                "top":"0px",
                "left":"0px",
                "cursor":"move",
                "display":"none",
                "z-index":"5"
            });
            $('<div class="select_area" style="width:100%;height:100%;position:absolute;left:0px;top:0px;background-color:white;opacity:0;filter:alpha(opacity=0);cursor:move;"></div>').appendTo(selector);
            var left_top_point = $('<img src="'+imgData+'" class="left_top" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;left:0px;top: 0px;cursor:nwse-resize;" draggable="false"/>').appendTo(selector);
            var left_middle_point = $('<img src="'+imgData+'" class="left_middle" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;left:0px;top: 0px;cursor:e-resize;" draggable="false"/>').appendTo(selector);
            var left_bottom_point = $('<img src="'+imgData+'" class="left_bottom" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;left:0px;bottom: 0px;cursor:nesw-resize;" draggable="false"/>').appendTo(selector);
            var bottom_middle_point = $('<img src="'+imgData+'" class="bottom_middle" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;left:0px;bottom: 0px;cursor:s-resize;" draggable="false"/>').appendTo(selector);
            var bottom_right_point = $('<img src="'+imgData+'" class="bottom_right" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;right:0px;bottom: 0px;cursor:nwse-resize;" draggable="false"/>').appendTo(selector);
            var right_middle_point = $('<img src="'+imgData+'" class="right_middle" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;right:0px;top: 0px;cursor:e-resize;" draggable="false"/>').appendTo(selector);
            var right_top_point = $('<img src="'+imgData+'" class="right_top" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;right:0px;top: 0px;cursor:nesw-resize;" draggable="false"/>').appendTo(selector);
            var top_middle_point = $('<img src="'+imgData+'" class="top_middle" style="width:5px;height:5px;background-color:white;z-index:5;position:absolute;left:0px;top: 0px;cursor:s-resize;" draggable="false"/>').appendTo(selector);
            
            var topf = $('<div class="topf" style="position:absolute;width:100%;height:0px;background-color:#000000;opacity:0.5;top:0px;left:0px;width:inherit;filter:alpha(opacity=50);zoom:1;font-size:0px;"><div></div></div>').appendTo(foreg);
            var leftf = $('<div class="leftf" style="position:absolute;width:0px;height:0px;background-color:#000000;opacity:0.5;top:0px;left:0px;filter:alpha(opacity=50);clear:both;zoom:1;font-size:0;"></div>').appendTo(foreg);
            var rightf = $('<div class="rightf" style="position:absolute;width:0px;height:0px;background-color:#000000;opacity:0.5;top:0px;right:0px;filter:alpha(opacity=50);clear:both;zoom:1;font-size:0;"></div>').appendTo(foreg);
            var bottomf = $('<div class="bottomf" style="position:absolute;width:100%;height:0px;background-color:#000000;opacity:0.5;bottom:0px;left:0px;width:100%;filter:alpha(opacity=50);font-size:0;"><div></div></div>').appendTo(foreg);
            $(this).before(pane);
            $(this).appendTo(pane);
            foreg.appendTo(pane);
            selector.appendTo(pane);
            var comp = "none",event;
            var ox,oy;
            function w_keyup(){
                if(comp != "none"){
                    comp = "none";
                }
            }
            if(window.addEventListener){
                window.addEventListener("keyup",w_keyup,false);
                window.addEventListener("onkeyup",w_keyup,false);
            }else{
                window.attachEvent("onkeyup",w_keyup);
            }
            $(window).mouseup(function(){
                comp = "none";
            });
            $(pane).bind({
                mousedown:function(e){
                    var target = e.srcElement ? e.srcElement : e.target;
                    comp = target.className;
                    switch (comp){
                        case "foreg":
                            ox = event.clientX - $(pane).offset().left;
                            oy = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                            selector.css({"display":"block","left":ox,"top":oy});
                            break;
                        case "select_area":
                            var x = event.clientX - $(pane).offset().left;
                            var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                            ox = x - selector.position().left;
                            oy = y - selector.position().top;
                            break;
                        case "left_top":
                            ox = event.clientX - $(pane).offset().left;
                            oy = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                            break;
                        default:return;
                    }
                },
                mousemove:function(e){
                    event = e;
                },
                mouseup:function(e){
                    comp = "none";
                }
            });
            var rawImg = document.createElement("img");
            rawImg.src = this.src;
            config.picker.css({"background-image":"url('"+rawImg.src+"')"});
            var timer = setInterval(function(){
                switch (comp){
                    case "foreg":
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        if(x > ox){
                            selector.width(x - ox);
                        }
                        if(y > oy){
                            selector.height(y - oy);
                        }
                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(y-selector.height());
                        leftf.css("top",y-selector.height());
                        leftf.width(x-selector.width());
                        leftf.height(y-topf.height());
                        bottomf.height(pane.height()-y);
                        rightf.width(pane.width()-x);
                        rightf.css("top",y-selector.height());
                        rightf.height(y-topf.height());
                        break;
                    case "select_area":
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());

                        x = x -ox,y = y - oy;
                        selector.css({left:x,top:y});
                        if(x < 0){
                            selector.css({left:0});
                        }
                        if(x > $(pane).width() - selector.width()){
                            selector.css({left:$(pane).width() - selector.width()});
                        }
                        if(y < 0){
                            selector.css({top:0});
                        }
                        if(y > $(pane).height() - selector.height()){
                            selector.css({top:$(pane).height() - selector.height()});
                        }
                        break;
                    case "left_top":
                        var mx = selector.position().left + selector.width(),my  = selector.position().top + selector.height();
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        if(x > 0 && x < mx){
                            selector.css({left:x});
                        }
                        if(y > 0 && y < my){
                            selector.css({top:y});
                        }
                        if(x > 0)selector.width(mx - x);
                        if(y > 0)selector.height(my - y);

                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    case "left_middle":
                        var mx = selector.position().left + selector.width();
                        var x = event.clientX - $(pane).offset().left;
                        if(x > 0 && x < mx){
                            selector.css({left:x});
                        }
                        if(x > 0)selector.width(mx - x);
                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    case "left_bottom":
                        var mx = selector.position().left + selector.width(),my  = selector.position().top;
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        if(x > 0 && x < mx){
                            selector.css({left:x});
                        }
                        if(x > 0)selector.width(mx - x);
                        if(y > 0)selector.height(y - my);

                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    case "bottom_middle":
                        var mx = selector.position().left + selector.width(),my  = selector.position().top;
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        if(y > 0)selector.height(y - my);
                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    case "bottom_right":
                        var mx = selector.position().left,my  = selector.position().top;
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        if(x > 0)selector.width(x - mx);
                        if(y > 0)selector.height(y - my);

                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    case "right_middle":
                        var mx = selector.position().left;
                        var x = event.clientX - $(pane).offset().left;
                        if(x > 0)selector.width(x - mx);
                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    case "right_top":
                        var mx = selector.position().left,my  = selector.position().top + selector.height();
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        if(y > 0 && y < my){
                            selector.css({top:y});
                        }
                        if(x > 0)selector.width(x - mx);
                        if(y > 0)selector.height(my - y);

                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    case "top_middle":
                        var my  = selector.position().top + selector.height();
                        var x = event.clientX - $(pane).offset().left;
                        var y = event.clientY + $(window).scrollTop() - $(pane).offset().top;
                        if(y > 0 && y < my){
                            selector.css({top:y});
                        }
                        if(y > 0)selector.height(my - y);

                        left_middle_point.css({top:(selector.height()/2)-(left_middle_point.height()/2)});
                        right_middle_point.css({top:(selector.height()/2)-(right_middle_point.height()/2)});
                        bottom_middle_point.css({left:(selector.width()/2)-(bottom_middle_point.width()/2)});
                        top_middle_point.css({left:(selector.width()/2)-(top_middle_point.width()/2)});
                        topf.height(selector.position().top);
                        leftf.css("top",selector.position().top);
                        leftf.width(selector.position().left);
                        leftf.height(selector.height());
                        bottomf.height(pane.height()-selector.height()-selector.position().top);
                        rightf.width(pane.width()-selector.width()-selector.position().left);
                        rightf.css("top",topf.height());
                        rightf.height(leftf.height());
                        break;
                    default:return;
                }
                var bx = selector.position().left,by = selector.position().top;
                config.listener(bx / pane.width() * rawImg.width,by / pane.height() * rawImg.height,selector.width() / pane.width() * rawImg.width,selector.height()/ pane.height() * rawImg.height);
                if(selector.width()>0)config.picker.css({
                    "background-size":config.picker.width() * (pane.width() / selector.width())+"px",
                    "background-position":"-" + selector.position().left *(config.picker.width() / selector.width())+"px "+"-" + selector.position().top *(config.picker.height() / selector.width())+"px"
                });
            },20);
        });
        return $(".pane");
    }
})(jQuery)