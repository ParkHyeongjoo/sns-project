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
import com.google.gson.Gson;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MemberController {
	
	Gson gson = new Gson();
	
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
	
	@RequestMapping(value = "/findid", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public String findId(@RequestBody Member member) {
		
		System.out.println(member);
		return memberService.findId(member);	
	}
	
	@RequestMapping(value = "/findpw", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public String findPw(@RequestBody Member member) throws Exception {
		
		System.out.println(member);
		return memberService.findPw(member);
	}
	
	@RequestMapping(value = "/profile", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public Member profile(@RequestBody String param){

		System.out.println("profile param : " + param);

		Member mb_nick = gson.fromJson(param, Member.class);

		return memberService.profile(mb_nick);

	}
	
}
