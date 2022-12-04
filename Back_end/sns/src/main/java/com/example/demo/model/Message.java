package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Message {
	
	private int ms_seq;
	private int cr_seq;
	private String from_nick;
	private String to_nick;
	private String content;
	private String send_time;

}
