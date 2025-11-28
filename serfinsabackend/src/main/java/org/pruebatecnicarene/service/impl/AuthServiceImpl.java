package org.pruebatecnicarene.service.impl;

import lombok.RequiredArgsConstructor;
import org.pruebatecnicarene.config.CustomUserDetailsService;
import org.pruebatecnicarene.config.JwtService;
import org.pruebatecnicarene.dto.LoginRequest;
import org.pruebatecnicarene.dto.LoginResponse;
import org.pruebatecnicarene.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest request) {

        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            System.out.println("AUTH SUCCESS: " + auth.getName());

        } catch (BadCredentialsException ex) {
            // Aquí verás 401 si la clave o el correo no coinciden
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Credenciales inválidas"
            );
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);

        return new LoginResponse(token);
    }
}
