package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.MemberMapper;
import com.example.demo.model.Member;

@Service
public class MemberService {

	@Autowired
	private MemberMapper memberMapper;
	
	public Member loginMember(Member member) {
		return memberMapper.loginMember(member);
	}
}
