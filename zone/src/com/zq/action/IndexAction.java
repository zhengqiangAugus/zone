package com.zq.action;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zq.bean.User;
import com.zq.service.UserService;



@Controller
public class IndexAction extends BaseAction{
	@Autowired
	private UserService userService;
	@RequestMapping("/")
	public String index(){
		User user = (User) session.getAttribute("user");
		if(user!=null){
			return "index";
		}
		return "login";
	}
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(HttpServletRequest request,String nem,String password){
		User user = userService.login(nem, password);
		if(user!=null){
			session.setAttribute("user",user);
		}
		return "redirect:/";
	}
}
