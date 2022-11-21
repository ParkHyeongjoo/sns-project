package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Member {

	private String mb_id; // 아이디 - unique key
	private String mb_pw; // 비밀번호
	private String mb_nick; // 닉네임 - primary key (다른테이블에서 참조)
	private String mb_email; // 이메일
	private String mb_joindate; // 가입날짜
	private String mb_pic; // 프로필사진
	private String mb_bg; // 프로필 배경사진
	
	
}
