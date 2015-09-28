$(function(){
	jQuery.validator.addMethod("unique", function(value, element) {
		var boo = !doDwr("userService.hasUser",value);
		if(boo){
			if($(element).next("span").length==0){
				$(element).next(".passed").remove();
				$(element).after("<span class='passed'>√</span>")
			}
		}else{
			$(element).next(".passed").remove();
		}
	    return boo;
	}, "用户名已存在");
	
	jQuery.validator.addMethod("require", function(value, element) {
		if(value != null&&value != ""){
			if($(element).next("span").length==0){
				$(element).next(".passed").remove();
				$(element).after("<span class='passed'>√</span>")
			}
			if($(element).is("input[name='emailCheck']")){
        		$("#checkerror").val("");
        	}
			return true;
		}else{
			$(element).next(".passed").remove();
		}
		return false;
	});  
	
	jQuery.validator.addMethod("birth", function(value, element) {
		if(!value)return true;
		return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(value);
	}); 
	jQuery.validator.addMethod("email", function(value, element) {
		var boo = /^[_a-z\d\-\./]+@[_a-z\d\-]+(\.[_a-z\d\-]+)*(\.(info|biz|com|edu|gov|net|am|bz|cn|cx|hk|jp|tw|vc|vn))$/.test(value);
		if(!boo){
			$(element).next(".passed").remove();
		}else{
			$("#checkerror").val("");
		}
		return boo;
	});
	jQuery.validator.addMethod("mobile", function(value, element) {
		var boo = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
		if(!boo){
			$(element).next(".passed").remove();
		}
		return boo;
	});
	jQuery.validator.addMethod("repass", function(value, element) {
		if(document.forms[0].password.value != value)$(element).next(".passed").remove();
		return document.forms[0].password.value == value;
	});
	$("#register_form").validate({
		debug: true,//只验证不提交表单
        submitHandler: function (form) {
        	return false;
        },
        errorPlacement:function(error,el){
        	if(el.is("input[name='emailCheck']")){
        		$("#checkerror").val(error.text());
        		return;
        	}
        	el.after(error);
        },
		rules:{
			name:{require:true,unique:true},
			email:{require:true,email:true},
			password:{require:true},
			repassword:{require:true,repass:true},
			mobile:{require:true,mobile:true},
			emailCheck:{require:true}
		},
		messages:{
			name:{require:"必须填入用户名"},
			email:{require:"请输入你的邮箱",email:"邮箱地址不合格"},
			password:{require:"请输入你的密码"},
			repassword:{require:"请再次输入密码",repass:"密码不一致"},
			mobile:{require:"请输入手机号",mobile:"手机号不合格"},
			emailCheck:{require:"请输入邮箱验证码"}
		}
	});
	$("#checkerror").val("");
	$("#getCode_bt").click(function(){
		var email = $("input[name='email']").val();
		if(email != null &&email != ""){
			var message = doDwr("emailService.sendEmailCode",email);
			$("#checkerror").val(message);
		}else{
			$("#checkerror").val("请先输入邮箱地址！");
		}
	});
	$("#register_form").submit(function(){
		var email = $("input[name='email']").val();
		var code = $("input[name='emailCheck']").val();
		if($(this).valid()&&(doDwr("emailService.checkCode",email,code) == true))
		$(this).ajaxSubmit({
			type:"POST",
			success:function(data){
				if(data != "success"){
					alert(data);
				}else{
					alert("注册成功！即将跳转到登录页面。")
					window.location = "/";
				}
			}
		});
	});
	/*$("input:password").focus(function(){
		$(".lefthand").removeClass("lefthand").addClass("lefthandon");
		$(".righthand").removeClass("righthand").addClass("righthandon");
	}).blur(function(){
		$(".lefthandon").removeClass("lefthandon").addClass("lefthand");
		$(".righthandon").removeClass("righthandon").addClass("righthand");
	});
	$("#register_bt").click(function(){
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
	});*/
});