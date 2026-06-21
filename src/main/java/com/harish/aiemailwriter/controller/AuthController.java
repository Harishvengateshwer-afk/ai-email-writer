package com.harish.aiemailwriter.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harish.aiemailwriter.dto.LoginRequest;
import com.harish.aiemailwriter.dto.RegisterRequest;
import com.harish.aiemailwriter.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


private final AuthService authService;

public AuthController(AuthService authService) {
    this.authService = authService;
}

// Register API
@PostMapping("/register")
public String register(@RequestBody RegisterRequest request) {
    return authService.register(request);
}

// Login API
@PostMapping("/login")
public String login(@RequestBody LoginRequest request) {
    return authService.login(request);
}


}
