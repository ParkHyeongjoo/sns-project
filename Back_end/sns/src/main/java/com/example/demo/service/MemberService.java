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
	
	public String idCheck(Member member) {
		String check = memberMapper.idCheck(member);
		
		if(check == null) {
			return "생성가능한 아이디 입니다.";
		}else {
			return "이미 사용중인 아이디 입니다.";
		}
	}
	
	public String nickCheck(Member member) {
		String check = memberMapper.nickCheck(member);
		
		if(check == null) {
			return "생성가능한 닉네임 입니다.";
		}else {
			return "이미 사용중인 닉네임 입니다.";
		}
	}
	
	public String signUp(Member member) {
		int cnt = memberMapper.signUp(member);
		
		if(cnt>0) {
			return "회원가입이 완료되었습니다.";
		}else {
			return "가입에 실패하였습니다.";
		}
	}
}
