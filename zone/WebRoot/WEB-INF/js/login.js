$(function(){
	jQuery.validator.addMethod("unique", function(value, element) {
		var boo = !doDwr("userService.hasUser",value);
		if(boo){
			if($(element).next("span").length==0){
				$(element).parent("li").find(".passed").remove()
				$(element).after("<span class='passed'>√</span>")
			}
		}else{
			$(element).parent("li").find(".passed").remove();
		}
	    return boo;
	}, "用户名已存在");
	
	jQuery.validator.addMethod("require", function(value, element) {
		if(value){
			if($(element).next("span").length==0){
				$(element).parent("li").find(".passed").remove()
				$(element).after("<span class='passed'>√</span>")
			}
			return true;
		}else{
			$(element).parent("li").find(".passed").remove();
		}
		return false;
	});  
	
	jQuery.validator.addMethod("birth", function(value, element) {
		if(!value)return true;
		return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(value);
	}); 
	jQuery.validator.addMethod("email", function(value, element) {
		return /^[_a-z\d\-\./]+@[_a-z\d\-]+(\.[_a-z\d\-]+)*(\.(info|biz|com|edu|gov|net|am|bz|cn|cx|hk|jp|tw|vc|vn))$/.test(value);
	});
	jQuery.validator.addMethod("mobile", function(value, element) {
		if(!value)return true;
		return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
	});
	jQuery.validator.addMethod("repass", function(value, element) {
		if(document.forms[1].password.value != value)$(element).parent("li").find(".passed").remove();
		return document.forms[1].password.value == value;
	});
	$("#register_form").validate({
		debug: true,//只验证不提交表单
        submitHandler: function (form) {
        	return false;
        },
		rules:{
			name:{require:true,unique:true},
			birthDay:{birth:true},
			email:{require:true,email:true},
			password:{require:true},
			repassword:{require:true,repass:true},
			mobile:{mobile:true}
		},
		messages:{
			name:{require:"必须填入用户名"},
			birthDay:{birth:"日期格式错误"},
			email:{require:"请输入你的邮箱",email:"邮箱地址不合格"},
			password:{require:"请输入你的密码"},
			repassword:{require:"请再次输入密码",repass:"密码不一致"},
			mobile:{mobile:"手机号不合格"}
		}
	});
	
	$("input:password").focus(function(){
		$(".lefthand").removeClass("lefthand").addClass("lefthandon");
		$(".righthand").removeClass("righthand").addClass("righthandon");
	}).blur(function(){
		$(".lefthandon").removeClass("lefthandon").addClass("lefthand");
		$(".righthandon").removeClass("righthandon").addClass("righthand");
	});
	$("#register_bt").click(function(){
		$(".login_content").hide();
		$(".register_main").show();
		window.location = "/register";
	});
	$("#step_bt").click(function(){
		var valid = $("#register_form").valid();
		//if(valid){
			$(".step_main .item.this").removeClass("this");
			$(".step_main .item:eq(1)").addClass("this");
			$(".r_s_0").hide();
			$(this).hide();
			$(".r_s_1").show();
		//}
	});
});