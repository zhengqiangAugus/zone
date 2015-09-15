package com.zq.dao;


import com.zq.bean.Message;

public interface MessageDao extends BaseDao<Message>{
	public Message getById(int id);
}
