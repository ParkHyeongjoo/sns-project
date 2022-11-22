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
		
		System.out.println(member);

		Member listM = memberService.loginMember(member);

		System.out.println(listM);

		session.setAttribute("listM", listM);

		Member loginM = (Member)session.getAttribute("listM");

		System.out.println(loginM);

		return loginM;
	}
	
}
