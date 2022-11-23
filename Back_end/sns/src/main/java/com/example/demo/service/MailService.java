package com.example.demo.service;

import java.io.UnsupportedEncodingException;
import java.util.Random;


import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

	@Autowired
	private JavaMailSender emailSender;

	private String ePw; // 인증코드

	public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
		// to : 보내는 대상

		MimeMessage message = emailSender.createMimeMessage();

		message.addRecipients(RecipientType.TO, to); // 보내는 대상
		message.setSubject("ITtime 이메일 인증"); // 제목

		String msgg = "";
		msgg += "<div style='margin:100px;'>";
		msgg += "<h1> 안녕하세요</h1>";
		msgg += "<h1> 예비개발자를 윈한 SNS ITtime 입니다</h1>";
		msgg += "<br>";
		msgg += "<p>아래 코드를 ITtime으로 돌아가 입력해주세요<p>";
		msgg += "<br>";
		msgg += "<p>항상 당신의 꿈을 응원합니다. 감사합니다!<p>";
		msgg += "<br>";
		msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
		msgg += "<h3 style='color:blue;'>인증 코드입니다.</h3>";
		msgg += "<div style='font-size:130%'>";
		msgg += "CODE : <strong>";
		msgg += ePw + "</strong><div><br/> "; // 메일에 인증코드 넣기
		msgg += "</div>";
		message.setText(msgg, "utf-8", "html"); // 내용, charset 타입, subtype
		// 보내는 사람의 이메일 주소, 보내는 사람 이름
		message.setFrom(new InternetAddress("hyeongjoo0324@naver.com", "박형주")); // 보내는 사람

		return message;
	}

	public String createKey() {

		StringBuffer key = new StringBuffer();
		Random rd = new Random();

		for (int i = 0; i < 8; i++) { // 인증코드 8자리
			int index = rd.nextInt(3); // 0~2까지 랜덤, rd값에 따라 아래 switch 문이 실행됨

			switch (index) {
			case 0:
				key.append((char) ((int) (rd.nextInt(26)) + 97)); // 영어 소문자
				// a~z ( ASCII 코드 : ex. (char)98='b' )
				break;
			case 1:
				key.append((char) ((int) (rd.nextInt(26)) + 65)); // 영어 대문자
				break;
			case 2:
				key.append((rd.nextInt(10))); // 숫자
				break;
			}
		}
		return key.toString();
	}

	// 메일 발송
	// sendSimpleMessage 의 매개변수로 들어온 to 는 곧 이메일 주소가 되고,
	// MimeMessage 객체 안에 내가 전송할 메일의 내용을 담는다.
	// 그리고 bean 으로 등록해둔 javaMail 객체를 사용해서 이메일 send!!
	public String sendSimpleMessage(String to) throws Exception {

		ePw = createKey(); // 랜덤 인증코드 생성

		MimeMessage message = createMessage(to); // 메일 발송
		try {// 예외처리
			emailSender.send(message);
		} catch (MailException es) {
			es.printStackTrace();
			throw new IllegalArgumentException();
		}
		return ePw; // 메일로 보냈던 인증 코드를 서버로 반환
	}
	
	
	// 비밀번호 변경 메일 발송
	public String resetPw(String to) throws Exception {
		
		ePw = createKey();
		
		MimeMessage message = pwCreateMessage(to);
		try {
			emailSender.send(message);
		} catch (MailException es) {
			es.printStackTrace();
			throw new IllegalArgumentException();
		}
		return ePw;
	}

	public MimeMessage pwCreateMessage(String to) throws MessagingException, UnsupportedEncodingException {

		MimeMessage message = emailSender.createMimeMessage();

		message.addRecipients(RecipientType.TO, to);
		message.setSubject("ITtime 이메일 인증");

		String msgg = "";
		msgg += "<div style='margin:100px;'>";
		msgg += "<h1> 안녕하세요</h1>";
		msgg += "<h1> 예비개발자를 윈한 SNS ITtime 입니다</h1>";
		msgg += "<br>";
		msgg += "<p>항상 당신의 꿈을 응원합니다. 감사합니다!<p>";
		msgg += "<br>";
		msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
		msgg += "<h3 style='color:blue;'>새 비밀번호 입니다.</h3>";
		msgg += "<div style='font-size:130%'>";
		msgg += "CODE : <strong>";
		msgg += ePw + "</strong><div><br/> "; // 메일에 인증코드 넣기
		msgg += "</div>";
		message.setText(msgg, "utf-8", "html"); // 내용, charset 타입, subtype
		// 보내는 사람의 이메일 주소, 보내는 사람 이름
		message.setFrom(new InternetAddress("hyeongjoo0324@naver.com", "박형주")); // 보내는 사람

		return message;
	}
}
