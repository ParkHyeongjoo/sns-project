package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.MemberMapper;
import com.example.demo.mapper.MessageMapper;
import com.example.demo.model.ChatRoom;
import com.example.demo.model.Member;
import com.example.demo.model.Message;
import com.google.gson.Gson;

@Service
public class MessageService {

	Gson gson = new Gson();
	
	@Autowired
	private MessageMapper messageMapper;

	@Autowired
	private MemberMapper memberMapper;

	public List<ChatRoom> getChatRoom(String nick) {

		List<ChatRoom> cr = messageMapper.getChatRoom(nick);

		for (int i = 0; i < cr.size(); i++) {

			Member from = (Member) memberMapper.getPic(cr.get(i).getFrom_nick());
			cr.get(i).setFrom_pic(from.getMb_pic());

			Member to = (Member) memberMapper.getPic(cr.get(i).getTo_nick());
			cr.get(i).setTo_pic(to.getMb_pic());

		}

		return cr;
	}
	
	public int checkRoom(ChatRoom cr) {
		
		ChatRoom crCk = messageMapper.checkRoom(cr.getTo_nick(), cr.getFrom_nick());
		
		if(crCk == null) {
			messageMapper.createRoom(cr);
			ChatRoom createR = messageMapper.checkRoom(cr.getTo_nick(), cr.getFrom_nick());
			
			return createR.getCr_seq();
			
		}else {
			return 	crCk.getCr_seq();			
		}	
	}
	
	public Member getNick(ChatRoom cr) {

		ChatRoom result = messageMapper.getNick(cr.getCr_seq());

		if(result.getFrom_nick().equals(cr.getTo_nick())) {

			return memberMapper.getFrnd(result.getTo_nick());
		}else {

			return memberMapper.getFrnd(result.getFrom_nick());
		}		
	}
	
	public int sendMessage(Message message) {
		
		int cnt;
		
		while(true){
			
			ChatRoom cr = messageMapper.checkRoom(message.getTo_nick(), message.getFrom_nick());
			System.out.println(cr);		
			
			if(cr != null) { // 방이 있으면
				message.setCr_seq(cr.getCr_seq());
				cnt = messageMapper.sendMessage(message);
				break;
				
			}else { // 방이 없으면
				String jsonStr = gson.toJson(message);	

				ChatRoom createR = gson.fromJson(jsonStr, ChatRoom.class);

				messageMapper.createRoom(createR);
			}
		}
		
		return cnt;
	}
	
	public List<Message> getMessage(int cr) {
		return messageMapper.getMessage(cr);
	}
}
