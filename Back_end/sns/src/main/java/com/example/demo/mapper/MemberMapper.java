package com.example.demo.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
}
