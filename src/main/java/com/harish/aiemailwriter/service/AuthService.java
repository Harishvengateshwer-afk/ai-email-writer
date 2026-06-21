package com.harish.aiemailwriter.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.harish.aiemailwriter.dto.LoginRequest;
import com.harish.aiemailwriter.dto.RegisterRequest;
import com.harish.aiemailwriter.entity.User;
import com.harish.aiemailwriter.repository.UserRepository;

@Service
public class AuthService {


private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;

public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}

// Register User
public String register(RegisterRequest request) {

    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        return "Email already exists";
    }

    User user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .createdAt(LocalDateTime.now())
            .build();

    userRepository.save(user);

    return "User Registered Successfully";
}

// Login User
public String login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElse(null);

    if (user == null) {
        return "User Not Found";
    }

    boolean isPasswordMatch = passwordEncoder.matches(
            request.getPassword(),
            user.getPassword());

    if (!isPasswordMatch) {
        return "Invalid Password";
    }

    return "Login Successful";
}


}
