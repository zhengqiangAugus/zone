package com.zq.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zq.base.Ajax;
import com.zq.base.BaseAction;
import com.zq.bean.User;
import com.zq.service.EmailService;
import com.zq.service.UserService;



@Controller
public class IndexAction extends BaseAction{
	@Autowired
	private UserService userService;
	@Autowired
	private EmailService emailService;
	
	@RequestMapping("/")
	public String index(){
		User user = (User) session.getAttribute("user");
		if(user!=null){
			return "index";
		}
		return "login";
	}
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(String nem,String password){
		User user = userService.login(nem, password);
		if(user!=null){
			session.setAttribute("user",user);
		}
		return "redirect:/";
	}
	@RequestMapping("/logout")
	public String logout(){
		session.removeAttribute("user");
		return "redirect:/";
	}
	
	@RequestMapping("/register")
	public String register(){
		return "register";
	}
	
	@Ajax
	@RequestMapping(value="/doregister",produces="text/html; charset=UTF-8")
	public @ResponseBody String doregister(String name,String password,String mobile,String email,String emailCheck){
		if(userService.hasUser(name))
			return "注册失败，该用户名已被使用！";
		String code = session.getAttribute("code"+email)+"";
		if(!code.equals(emailCheck.toLowerCase())){
			return "验证码错误！";
		}
		if(userService.registerAnUser(name, password, mobile, email)){
			return "success";
		}
		return "注册失败！";
	}
	
	@Ajax
	@RequestMapping("/sendEmail")
	public @ResponseBody String sendEmail(String email){
		String code = emailService.sendCheckCode(email);
		if(code!=null){
			session.setAttribute("curcode",code);
			return "success";
		}
		return "faild";
	}
}
