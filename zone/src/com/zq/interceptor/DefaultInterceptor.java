package com.zq.interceptor;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.zq.base.BaseAction;

public class DefaultInterceptor extends HandlerInterceptorAdapter{
	@Override  
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception{  
		if(handler instanceof HandlerMethod){
			HandlerMethod h = (HandlerMethod) handler;
			if(h.getBean() instanceof BaseAction){
				BaseAction action = (BaseAction) h.getBean();
				action.setRequest(request);
				action.setResponse(response);
				action.setSession(request.getSession());
				ModelAndView mv = action.mv = new ModelAndView();
				action.model = mv.getModelMap();
			}
		}
		return true;
	}  
      
	@Override  
    public void postHandle(HttpServletRequest request,HttpServletResponse response,Object handler,ModelAndView modelAndView) throws Exception{  
    	if(modelAndView==null){
    		return;
    	}
    	if(handler instanceof HandlerMethod && modelAndView.getViewName() !=null && !modelAndView.getViewName().trim().startsWith("redirect")){
			HandlerMethod h = (HandlerMethod) handler;
			if(h.getBean() instanceof BaseAction){
				BaseAction action = (BaseAction) h.getBean();
				ModelAndView mv = action.mv;
				modelAndView.addAllObjects(mv.getModelMap());
				String path = request.getContextPath();
				String basePath = request.getScheme()+"://"+request.getServerName()+(request.getServerPort() == 80?"":":"+request.getServerPort())+path;
				modelAndView.addObject("path",basePath);
				Map<String,Object> map = new HashMap<String, Object>();
				Enumeration<String> em = request.getSession().getAttributeNames();
				while(em.hasMoreElements()){
					String key = em.nextElement();
					map.put(key, request.getSession().getAttribute(key));
				}
				modelAndView.addObject("session",map);
			}
		}
    }  
      
    @Override  
    public void afterCompletion(HttpServletRequest request,HttpServletResponse response,Object handler,Exception ex) throws Exception{  
    }  
}
