package in.Rahul.authify.sevice;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    @Value("${MAIL_FROM:ragulpant411@gmail.com}")
    private String fromMail;

    public void sendWelcomeEmail(String toMail,String name){
        SimpleMailMessage message= new SimpleMailMessage();
        message.setFrom(fromMail);
        message.setTo(toMail);
        message.setSubject("Welcome to our Platform");
        message.setText("Hello "+name+",\n\nThanks for registering with us!\n\nRewards.\nAuthify Team");
        mailSender.send(message);

    }

    public void sendresetOtpEmail(String toEmail,String otp){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom(fromMail);
        message.setTo(toEmail);
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP for resetting your password is "+otp+".Use this OTP to proceed with resetting your password");
        mailSender.send(message);
    }
    public void sendOtpEmail(String toEmail,String otp){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom(fromMail);
        message.setTo(toEmail);
        message.setSubject("Account verification OTP");
        message.setText("Your OTP  is "+otp+".Verify your account using this OTP");
        mailSender.send(message);
    }


}
