package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.BoardMapper;
import com.example.demo.model.Board;

@Service
public class BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	public int boardWrite(Board board) {
		return boardMapper.boardWrite(board);
	}
	
	public List<Board> getposts() {	
//		List<Board> count = boardMapper.getComCount();
		
//		List<Board> like = boardMapper.getlike();
		
		List<Board> result = boardMapper.getposts();

//		for(int i=0; i<result.size(); i++) {
//			result.get(i).setCmt_count(count.get(i).getCmt_count());
//			result.get(i).setLike_count(like.get(i).getLike_count());
//		}
		
		return result;
	}
}
