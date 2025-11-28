package org.pruebatecnicarene.service;

import org.pruebatecnicarene.dto.LoginRequest;
import org.pruebatecnicarene.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}