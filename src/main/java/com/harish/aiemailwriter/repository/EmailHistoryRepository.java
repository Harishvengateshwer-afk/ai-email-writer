package com.harish.aiemailwriter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harish.aiemailwriter.entity.EmailHistory;

public interface EmailHistoryRepository
        extends JpaRepository<EmailHistory, Long> {

}