package com.zq.aop;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.zq.base.Ajax;
import com.zq.util.CommUtil;


public class ControllerAdvice{

	public Object proxy(ProceedingJoinPoint joinPoint) {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		try {
			Class<?> argTypes[] = new Class[joinPoint.getArgs().length];
			for(int i = 0;i<argTypes.length;i++){
				argTypes[i] = joinPoint.getArgs()[i].getClass();
			}
			Class<?> clas = joinPoint.getTarget().getClass();
			Method method = clas.getDeclaredMethod(joinPoint.getSignature().getName(),argTypes);
			Ajax ajax = method.getAnnotation(Ajax.class);
			Object obj = joinPoint.proceed();
			if(ajax!=null)return obj;
			String str = String.valueOf(obj+"").trim();
			if(!str.startsWith("forward:")&&!str.startsWith("redirect:")){
				if(CommUtil.JudgeIsMoblie(request)){
					obj = "mobile/"+obj;
				}
			}
			return obj;
		} catch (Throwable e) {
			e.printStackTrace();
		}
		if(CommUtil.JudgeIsMoblie(request)){
			return "mobile/login";
		}
		return "login";
	}

}
