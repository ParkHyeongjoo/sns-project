package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Board;
import com.example.demo.service.BoardService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class BoardController {

	@Autowired
	private BoardService boardService;
	
	@RequestMapping(value = "/boardWrite", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public int boardWrite(@RequestBody Board board) {
		System.out.println("controller : " + board);
		
		return boardService.boardWrite(board);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getposts", method = RequestMethod.GET, produces = "application/json; charset=utf8")
    public List<Board> getposts() {
		System.out.println("getposts 요청");
		System.out.println("반환값 : " + boardService.getposts());
		return boardService.getposts();
	}
}
