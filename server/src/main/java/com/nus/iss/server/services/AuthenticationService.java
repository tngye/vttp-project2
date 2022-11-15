package com.nus.iss.server.services;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nus.iss.server.security.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;

@Service
public class AuthenticationService {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public String getUsername(HttpServletRequest request) {

        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        jwtToken = requestTokenHeader.substring(7);
        username = jwtTokenUtil.extractUsername(jwtToken);

        return username;
    }

}
