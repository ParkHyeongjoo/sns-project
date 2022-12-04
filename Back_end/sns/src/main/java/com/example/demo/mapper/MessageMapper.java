package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.model.ChatRoom;
import com.example.demo.model.Message;

@Mapper
public interface MessageMapper {
	
	@Select("SELECT * FROM (SELECT c.cr_seq, c.from_nick, c.to_nick, m.content, m.send_time, ROW_NUMBER() OVER(PARTITION by c.cr_seq order by m.send_time DESC) RN FROM message m JOIN chat_room c ON(m.cr_seq = c.cr_seq) ORDER BY m.send_time DESC ) TB WHERE RN = 1 AND (from_nick = #{nick} OR to_nick = #{nick})")
	public List<ChatRoom> getChatRoom(String nick);
	
	@Select("SELECT cr_seq FROM chat_room WHERE (from_nick = #{from_nick} AND to_nick = #{to_nick}) OR (from_nick = #{to_nick} AND to_nick = #{from_nick}) ")
	public ChatRoom checkRoom(String to_nick, String from_nick);
	
	@Insert("INSERT INTO chat_room VALUES (null, #{from_nick}, #{to_nick})")
	public int createRoom(ChatRoom cr);
	
	@Select("SELECT * FROM chat_room WHERE cr_seq=#{cr}")
	public ChatRoom getNick(int cr);
	
	@Insert("INSERT INTO message VALUES (null, #{cr_seq}, #{from_nick}, #{to_nick}, #{content}, now())")
	public int sendMessage(Message message);
	
	@Select("SELECT * FROM message WHERE cr_seq=#{cr}")
	public List<Message> getMessage(int cr);
}
