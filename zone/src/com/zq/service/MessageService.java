package com.zq.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zq.bean.Message;
import com.zq.dao.MessageDao;

@Service
public class MessageService {
	@Autowired
	private MessageDao messageDao;
	
	public List<Message> findAll(){
		return messageDao.findAll();
	}
}
