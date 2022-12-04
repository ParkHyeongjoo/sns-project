package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.service.MailService;
import com.example.demo.mapper.MemberMapper;
import com.example.demo.model.Member;

@Service
public class MemberService {

	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private MailService emailService;
	

	public Member loginMember(Member member) {
		return memberMapper.loginMember(member);
	}

	public String idCheck(Member member) {
		String check = memberMapper.idCheck(member);

		if (check == null) {
			return "생성가능한 아이디 입니다.";
		} else {
			return "이미 사용중인 아이디 입니다.";
		}
	}

	public String nickCheck(Member member) {
		String check = memberMapper.nickCheck(member);

		if (check == null) {
			return "생성가능한 닉네임 입니다.";
		} else {
			return "이미 사용중인 닉네임 입니다.";
		}
	}

	public String signUp(Member member) {
		int cnt = memberMapper.signUp(member);

		if (cnt > 0) {
			return "회원가입이 완료되었습니다.";
		} else {
			return "가입에 실패하였습니다.";
		}
	}

	public String findId(Member member) {
		String id = memberMapper.findId(member);

		return "회원님의 아이디는 " + id + " 입니다.";
	}

	public String findPw(Member member) throws Exception {
		Member pw = memberMapper.findPw(member);
		
		if(pw != null) {
			String code = emailService.resetPw(pw.getMb_email());
			
			pw.setMb_pw(code);
			System.out.println("코드로 비번 변경 : " + pw);
			int cnt = memberMapper.resetPw(pw);
			
			if(cnt > 0) {
				return "해당 이메일로 비밀번호를 발송해 드렸습니다.";
			}else {
				return "비밀번호 찾기에 실패하였습니다.";
			}			
			
		}else {
			return "가입하신 아이디가 없습니다";
		}
	}
	
	public Member profile(Member mb_nick) {
		return memberMapper.profile(mb_nick);
	}
	
	public List<Member> getUser(Member user) {

		return memberMapper.getUser(user);
	}
}
