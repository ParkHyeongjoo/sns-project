package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.model.Member;

@Mapper
public interface MemberMapper {
	
	@Select("SELECT * FROM member WHERE mb_id=#{mb_id} AND mb_pw=#{mb_pw}")
	public Member loginMember(Member member);

}
