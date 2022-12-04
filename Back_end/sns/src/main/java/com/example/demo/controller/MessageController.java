package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ChatRoom;
import com.example.demo.model.Member;
import com.example.demo.model.Message;
import com.example.demo.service.MemberService;
import com.example.demo.service.MessageService;
import com.google.gson.Gson;

@RestController
public class MessageController {

	Gson gson = new Gson();

	@Autowired
	private MessageService messageService;
	
	@Autowired
	private MemberService memberService;

	@RequestMapping(value = "/getChatRoom", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public List<ChatRoom> getChatRoom(@RequestBody Member nick) {

		String user = nick.getMb_nick();

		return messageService.getChatRoom(user);

	}

	@RequestMapping(value = "/getUser", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public List<Member> getUser(@RequestBody Member user) {

		return memberService.getUser(user);

	}
	
	@RequestMapping(value = "/newRoom", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public int newRoom(@RequestBody ChatRoom cr) {
		
		return messageService.checkRoom(cr);
	
	}
	
	@RequestMapping(value = "/getNick", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public Member getNick(@RequestBody ChatRoom cr) {

		return messageService.getNick(cr);	
	}
	
	@RequestMapping(value = "/sendMessage", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public int sendMessage(@RequestBody Message message) {
		
		System.out.println("보낸메세지 : " + message);
		
		return messageService.sendMessage(message);
		
	}
	
	@RequestMapping(value = "/getMessage", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public List<Message> getMessage(@RequestBody Message message) {
	
		return messageService.getMessage(message.getCr_seq());
								
	}

}
