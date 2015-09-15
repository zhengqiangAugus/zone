package com.zq.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.zq.bean.User;
import com.zq.dao.UserDao;
import com.zq.util.Encoder;

/**
 * @author 郑强
 * 处理用户数据的Service层
 */
@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	/**
	 * 登录
	 * @param nem
	 * @param password
	 * @return 用户
	 */
	public User login(String nem,String password){
		password = Encoder.encode(password);
		return userDao.login(nem, password);
	}
	
}
