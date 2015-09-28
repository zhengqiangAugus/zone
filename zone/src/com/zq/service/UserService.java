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
	
	public boolean hasUser(String username){
		Long count = userDao.checkUnique(username);
		if(count>0){
			return true;
		}
		return false;
	}
	
	public boolean registerAnUser(String name,String password,String mobile,String email){
		try {
			User user = new User();
			user.setName(name);
			user.setPassword(password);
			user.setMobile(mobile);
			user.setEmail(email);
			userDao.save(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
