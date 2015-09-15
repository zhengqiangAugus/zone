package com.zq.dao;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseDao<T> extends JpaRepository<T,Integer>{
}
