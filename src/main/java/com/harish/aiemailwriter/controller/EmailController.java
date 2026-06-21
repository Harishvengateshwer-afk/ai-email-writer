package com.harish.aiemailwriter.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.harish.aiemailwriter.ai.OpenRouterService;
import com.harish.aiemailwriter.dto.EmailRequest;
import com.harish.aiemailwriter.entity.EmailHistory;
import com.harish.aiemailwriter.service.EmailService;

@RestController
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177"
})
@RequestMapping("/api/email")
public class EmailController {

    private final OpenRouterService openRouterService;
    private final EmailService emailService;

    public EmailController(
            OpenRouterService openRouterService,
            EmailService emailService) {

        this.openRouterService = openRouterService;
        this.emailService = emailService;
    }

    @PostMapping("/generate")
    public String generateEmail(@RequestBody EmailRequest request) {

        String prompt = """
                Write a %s email in a %s tone.

                Details:
                %s
                """
                .formatted(
                        request.getEmailType(),
                        request.getTone(),
                        request.getDetails());

        String generatedEmail = openRouterService.generateEmail(prompt);

        if (generatedEmail.startsWith("ERROR")) {
            return generatedEmail;
        }

        emailService.saveEmail(
                request.getEmailType(),
                request.getTone(),
                prompt,
                generatedEmail);

        return generatedEmail;
    }

    @GetMapping("/history")
    public List<EmailHistory> getHistory() {
        return emailService.getAllEmails();
    }

    @DeleteMapping("/{id}")
    public String deleteEmail(@PathVariable Long id) {

        emailService.deleteEmail(id);

        return "Email deleted successfully";
    }

    @DeleteMapping("/delete-all")
    public String deleteAllEmails() {

        emailService.deleteAllEmails();

        return "All emails deleted successfully";
    }
}