package com.zq.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
	@Value("${EMAIL.ADDRESS}")
	private String from;
	@Value("${EMAIL.PASSWORD}")
	private String password;
	private static final String[] arr = "AB0CDE1FG2HIJ3KL7MN4OPQ5RS6TU7VW8XY9Z".split("");
	private static final int length = 6;
	
	private String getRandomCode(){
		String str = "";
		for(int i=0;i<length;i++){
			int index = BigDecimal.valueOf(Math.round(Math.random()*arr.length-1)).intValue();
			str += arr[index];
		}
		return str;
	}
	
	public String sendCheckCode(String email){
		String code = getRandomCode();
		boolean boo = sendEmail(email,"新用户注册","你好！你的验证码为："+code+"，有效时间为30分钟。");
		if(boo){
			return code;
		}else{
			return null;
		}
	}
	
	public String sendEmailCode(String email, HttpSession session){
		try {
			Object code = session.getAttribute("code"+email);
			if(code!=null){
				return "验证码已发送，无需重复发送！";
			}else{
				String str = getRandomCode();
				boolean boo = sendEmail(email,"新用户注册","你好！你的验证码为："+str+"，有效时间为30分钟。");
				if(boo){
					session.setAttribute("code"+email,str.toLowerCase());
					return "验证码已发送，请注意查收！";
				}else{
					return "验证码发送失败，请检查邮箱是否正确！";
				}
			}
		} catch (Exception e) {
		}
		return "验证码发送失败，请检查邮箱是否正确！";
	}
	
	public boolean checkCode(String email,String code,HttpSession session){
		return (session.getAttribute("code"+email)+"").equals(code.toLowerCase());
	}
	
	public boolean sendEmail(String email,String subject,String content){
		try {
			Properties pro = new Properties();
			pro.put("mail.smtp.host","smtp.qq.com");
			pro.put("mail.smtp.port","25");
			pro.put("mail.smtp.auth", "true");
			Authenticator ac = new MyAuthenticator(from,password);
			Session sess = Session.getDefaultInstance(pro,ac);
			MimeMessage mess = new MimeMessage(sess);
			mess.setFrom(new InternetAddress(from));
			mess.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
			mess.setSubject(subject, "UTF-8");
			mess.setSentDate(new Date());
		 	Multipart mainPart = new MimeMultipart();
	        // 创建一个包含HTML内容的MimeBodyPart
	        BodyPart html = new MimeBodyPart();
	        html.setContent(content.trim(), "text/html; charset=utf-8");
	        mainPart.addBodyPart(html);
	        mess.setContent(mainPart);
	        Transport.send(mess);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public static void main(String[] args) {
		System.out.println(new EmailService().getRandomCode());
	}
	
}
class MyAuthenticator extends Authenticator{
	private String addr;
	private String pass;
	MyAuthenticator(String addr,String pass){
		this.addr = addr;
		this.pass = pass;
	}
	@Override
	protected PasswordAuthentication getPasswordAuthentication() {
		return new PasswordAuthentication(addr,pass);
	}
}