package com.harish.aiemailwriter.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.harish.aiemailwriter.entity.EmailHistory;
import com.harish.aiemailwriter.repository.EmailHistoryRepository;

@Service
public class EmailService {

    private final EmailHistoryRepository emailHistoryRepository;

    public EmailService(EmailHistoryRepository emailHistoryRepository) {
        this.emailHistoryRepository = emailHistoryRepository;
    }

    public EmailHistory saveEmail(
            String emailType,
            String tone,
            String prompt,
            String generatedEmail) {

        EmailHistory emailHistory = EmailHistory.builder()
                .emailType(emailType)
                .tone(tone)
                .prompt(prompt)
                .generatedEmail(generatedEmail)
                .createdAt(LocalDateTime.now())
                .build();

        return emailHistoryRepository.save(emailHistory);
    }

    public List<EmailHistory> getAllEmails() {
        return emailHistoryRepository.findAll();
    }

    public void deleteEmail(Long id) {
    emailHistoryRepository.deleteById(id);

    }
    
public void deleteAllEmails() {
    emailHistoryRepository.deleteAll();
}
}