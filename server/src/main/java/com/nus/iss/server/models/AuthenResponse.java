package com.nus.iss.server.models;

import com.nus.iss.server.security.JwtResponse;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class AuthenResponse {
    private User user;
    private String token;

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("username", user.getUsername())
            .add("password", user.getPassword())
            .add("token", token)
            .build();
    }
}
