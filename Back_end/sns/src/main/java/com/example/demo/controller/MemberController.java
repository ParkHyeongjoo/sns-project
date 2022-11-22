package com.example.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Member;
import com.example.demo.service.MemberService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MemberController {

	
	@Autowired
	private MemberService memberService;

	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public Member login(@RequestBody Member member, HttpSession session) {
		
		Member listM = memberService.loginMember(member);

		session.setAttribute("listM", listM);

		Member loginM = (Member)session.getAttribute("listM");

		return loginM;
	}
	
	@RequestMapping(value = "/idcheck", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public String idCheck(@RequestBody Member member) {
		
		return memberService.idCheck(member);
	}

	@RequestMapping(value = "/nickcheck", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public String nickCheck(@RequestBody Member member) {
		
		return memberService.nickCheck(member);	
	}
	
	@RequestMapping(value = "/signup", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public String signUp(@RequestBody Member member) {
		
		System.out.println(member);
		
		return memberService.signUp(member);
		
	}
	
	
}
