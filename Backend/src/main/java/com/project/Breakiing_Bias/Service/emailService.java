package com.project.Breakiing_Bias.Service;

import com.project.Breakiing_Bias.Entity.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

// ✅ Correct Brevo imports
import sendinblue.ApiClient;
import sendinblue.ApiException;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailSender;
import sibModel.SendSmtpEmailTo;

import java.util.List;

@Service
public class emailService {

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${app.base-url}")
    private String baseUrl;

    public void linkSender(Users user, String token) {
        String link = baseUrl + "/api/auth/verify?token=" + token;
        sendEmail(
            user.getEmail(),
            "Email Verification - Breaking Bias",
            "Click the link below to verify your email:\n\n" + link
        );
    }

    public void forgotLinkSender(Users user, String token) {
        String link = baseUrl + "/api/auth/forgot/verify?token=" + token;
        sendEmail(
            user.getEmail(),
            "Password Reset - Breaking Bias",
            "Click the link below to reset your password:\n\n" + link
        );
    }

    private void sendEmail(String toEmail, String subject, String body) {
    try {
        System.out.println("=== STARTING EMAIL SEND ===");
        System.out.println("=== TO: " + toEmail);
        System.out.println("=== API KEY: " + brevoApiKey.substring(0, 10) + "...");

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKey.setApiKey(brevoApiKey);

        System.out.println("=== API CLIENT CONFIGURED ===");

        TransactionalEmailsApi api = new TransactionalEmailsApi();

        SendSmtpEmailSender sender = new SendSmtpEmailSender();
        sender.setEmail("javathompson92@gmail.com"); // ← verified sender
        sender.setName("Breaking Bias");

        SendSmtpEmailTo to = new SendSmtpEmailTo();
        to.setEmail(toEmail);

        SendSmtpEmail email = new SendSmtpEmail();
        email.setSender(sender);
        email.setTo(List.of(to));
        email.setSubject(subject);
        email.setTextContent(body);

        System.out.println("=== CALLING BREVO API ===");
        var result = api.sendTransacEmail(email);
        System.out.println("=== EMAIL SENT SUCCESSFULLY: " + result);

    } catch (ApiException e) {
        System.out.println("=== API EXCEPTION: " + e.getMessage());
        System.out.println("=== RESPONSE BODY: " + e.getResponseBody());
        System.out.println("=== RESPONSE CODE: " + e.getCode());
        throw new RuntimeException("Email sending failed: " + e.getMessage());
    } catch (Exception e) {
        System.out.println("=== GENERAL EXCEPTION: " + e.getMessage());
        e.printStackTrace();
        throw new RuntimeException("Email sending failed: " + e.getMessage());
    }
}
}
