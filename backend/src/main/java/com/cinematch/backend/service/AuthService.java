package com.cinematch.backend.service;

import com.cinematch.backend.dto.AuthResponse;
import com.cinematch.backend.dto.LoginRequest;
import com.cinematch.backend.dto.RegisterRequest;
import com.cinematch.backend.model.User;
import com.cinematch.backend.repository.UserRepository;
import org.springframework.stereotype.Service;



@Service
public class AuthService {


    private final UserRepository userRepository;

    //constructor
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //metodo para registrarse
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword()
        );

        //guardar usuario si no existe el mail
        User savedUser = userRepository.save(user);

        return new AuthResponse(
                "Usuario registrado correctamente",
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }

    //metodo login
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("El usuario no existe"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return new AuthResponse(
                "Login correcto",
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

}
