package com.zq.bean;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
@SuppressWarnings("serial")
@Cache(usage=CacheConcurrencyStrategy.READ_WRITE)
@Entity
@Table(name="message")
public class Message extends IDBean{

	private String message;
	
	private Date time;
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
}
