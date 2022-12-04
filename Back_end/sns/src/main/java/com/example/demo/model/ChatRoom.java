package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ChatRoom {
	
	private int cr_seq;
	private String from_nick;
	private String to_nick;
	private String content;
	private String send_time;
	private int RN;
	private String from_pic;
	private String to_pic;

}
