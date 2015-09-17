package com.zq.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zq.bean.User;
import com.zq.service.EmailService;
import com.zq.service.UserService;
import com.zq.util.CommUtil;



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
		if(CommUtil.JudgeIsMoblie(request)){
			return "mobile/register";
		}
		return "register";
	}
	
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
