package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.demo.model.Follow;
import com.example.demo.model.Member;

@Mapper
public interface MemberMapper {
	
	@Select("SELECT * FROM member WHERE mb_id=#{mb_id} AND mb_pw=#{mb_pw}")
	public Member loginMember(Member member);

	@Select("SELECT mb_id FROM member WHERE mb_id=#{mb_id}")
	public String idCheck(Member member);

	@Select("SELECT mb_nick FROM member WHERE mb_nick=#{mb_nick}")
	public String nickCheck(Member member);
	
	@Insert("INSERT INTO member(mb_id, mb_pw, mb_nick, mb_email, mb_joindate) VALUES (#{mb_id}, #{mb_pw}, #{mb_nick}, #{mb_email}, now())")
	public int signUp(Member member);
	
	@Select("SELECT mb_id FROM member WHERE mb_email=#{mb_email}")
	public String findId(Member member);
	
	@Select("SELECT * FROM member WHERE mb_id=#{mb_id} AND mb_email=#{mb_email}")
	public Member findPw(Member member);
	
	@Update("UPDATE member SET mb_pw=#{mb_pw} WHERE mb_id=#{mb_id} AND mb_email=#{mb_email}")
	public int resetPw(Member member);
	
	@Select("SELECT * FROM member WHERE mb_nick=#{mb_nick}")
	public Member profile(Member mb_nick);
	
//	채팅방 프로필 사진 가져오기
	@Select("SELECT * FROM member WHERE mb_nick=#{nick}")
	public Member getPic(String nick);
	
	@Select("SELECT * FROM member WHERE mb_nick NOT IN(#{mb_nick}) ORDER BY mb_nick")
	public List<Member> getUser(Member user);
	
	@Select("SELECT * FROM member WHERE mb_nick=#{mb_nick}")
	public Member getFrnd(String mb_nick);
	
//	프로필 팔로우
	@Select("SELECT count(*) FROM follow WHERE to_nick= #{to_nick} AND from_nick= #{from_nick}")
	public int checkFollow(Follow params);
	
	@Insert("INSERT INTO follow VALUES (null, #{to_nick}, #{from_nick})")
	public void follow(Follow params);
	
	@Delete("DELETE FROM follow WHERE to_nick=#{to_nick} AND from_nick=#{from_nick}")
	public void unFollow(Follow params);
}
