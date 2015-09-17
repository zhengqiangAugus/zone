package com.zq.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zq.bean.User;

/**
 * @author 郑强
 * 处理用户数据的持久层
 */
public interface UserDao extends BaseDao<User> {
	
	@Query("select obj from User obj where (obj.name = :nem or obj.email = :nem or obj.mobile = :nem) and obj.password = :password")
	public User login(@Param("nem")String nem,@Param("password")String password);
	
	@Query("select count(obj) from User obj where obj.name = :username")
	public Long checkUnique(@Param("username")String username);
}
