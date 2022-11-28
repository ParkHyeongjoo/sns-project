package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Board {
	
	private int board_seq;
	private String board_title;
	private String board_date;
	private String mb_nick;
	private String board_type;
	private String board_content;
	
	private String mb_pic; // 작성자 프로필 사진

}
