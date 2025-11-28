package org.pruebatecnicarene.controller;

import lombok.RequiredArgsConstructor;
import org.pruebatecnicarene.dto.LoginRequest;
import org.pruebatecnicarene.dto.LoginResponse;
import org.pruebatecnicarene.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        System.out.println("LOGIN REQUEST = " + request);
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}