package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.model.Board;

@Mapper
public interface BoardMapper {
	
	@Insert("INSERT INTO board VALUES (null, #{board_title}, now(), #{mb_nick}, #{board_type}, #{board_content})")
	public int boardWrite(Board board);
	
	@Select("SELECT b.board_seq, b.board_title, b.board_date, b.mb_nick, b.board_type, b.board_content, m.mb_pic FROM board b LEFT JOIN member m ON m.mb_nick = b.mb_nick ORDER BY b.board_seq DESC")
	public List<Board> getposts();

}
