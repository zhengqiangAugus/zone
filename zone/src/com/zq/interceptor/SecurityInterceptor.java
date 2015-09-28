package com.zq.interceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


public class SecurityInterceptor extends HandlerInterceptorAdapter {
	private String[] ignorePath = {"/","/login","/register","/doregister"};
	@Override  
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception{  
		if(handler instanceof HandlerMethod){
			String servlet = request.getServletPath();
			boolean boo = true;
			for (String path : ignorePath) {
				if(servlet.equals(path)){
					boo = false;
					break;
				}
			}
			if(boo&&request.getSession().getAttribute("user")==null){
				response.sendRedirect("/");
				return false;
			}
		}
		return true;
	}  
      
    @Override  
    public void postHandle(HttpServletRequest request,HttpServletResponse response,Object handler,ModelAndView modelAndView) throws Exception{  
    }  
      
    @Override  
    public void afterCompletion(HttpServletRequest request,HttpServletResponse response,Object handler,Exception ex) throws Exception{  
    }  
}
