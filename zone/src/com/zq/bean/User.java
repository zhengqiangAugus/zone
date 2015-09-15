package com.zq.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author 郑强
 * 用户实体类
 */
@SuppressWarnings("serial")
@Entity
@Table(name="user")
public class User extends IDBean{
	/**
	 * 用户名
	 */
	@Column(nullable=false,unique=true)
	private String name;
	/**
	 * 真实姓名
	 */
	private String trueName;
	/**
	 * 手机号码
	 */
	private String mobile;
	/**
	 * 邮箱
	 */
	private String email;
	/**
	 * 密码
	 */
	@Column(nullable=false)
	private String password;
	/**
	 * 生日
	 */
	private Date birthDay;
	/**
	 * 生日类型（农历or公历）
	 */
	@Column(length=1)
	private int birthDayType;
	/**
	 * 年龄
	 */
	private int age;
	/**
	 * 性别
	 */
	private int sex;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTrueName() {
		return trueName;
	}
	public void setTrueName(String trueName) {
		this.trueName = trueName;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getBirthDay() {
		return birthDay;
	}
	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}
	public int getBirthDayType() {
		return birthDayType;
	}
	public void setBirthDayType(int birthDayType) {
		this.birthDayType = birthDayType;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	
}
