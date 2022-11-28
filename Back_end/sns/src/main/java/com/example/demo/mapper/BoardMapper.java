package com.example.demo.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import com.example.demo.model.Board;

@Mapper
public interface BoardMapper {
	
	@Insert("INSERT INTO board VALUES (null, #{board_title}, now(), #{mb_nick}, #{board_type}, #{board_content})")
	public int boardWrite(Board board);

}
