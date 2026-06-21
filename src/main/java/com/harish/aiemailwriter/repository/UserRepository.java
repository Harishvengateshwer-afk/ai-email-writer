package com.harish.aiemailwriter.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.harish.aiemailwriter.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}