$(function(){
	$("form").each(function(){
		$(this).children("input").each(function(){
			if(this.getAttribute("field")){
				var type = this.getAttribute("type");
				var f = $("<input type='"+type+"' name='"+this.getAttribute("field")+"'/>");
				f.attr("class",$(this).attr("class")).attr("style",$(this).attr("style"));
				f.attr("placeholder",$(this).attr("placeholder"));
				$(this).after(f);
				$(this).hide();
			}
		});
	});
});
