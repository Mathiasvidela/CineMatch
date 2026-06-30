package com.cinematch.backend.dto;

public class LoginRequest {

    //atributos
    private String email;
    private String password;

    //constructores
    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }


    //metodos getters y setters
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
