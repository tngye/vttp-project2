package com.nus.iss.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nus.iss.server.models.User;
import com.nus.iss.server.security.JwtRequest;
import com.nus.iss.server.security.JwtResponse;
import com.nus.iss.server.security.JwtTokenUtil;
import com.nus.iss.server.security.JwtUserDetailsService;
import com.nus.iss.server.services.UserService;

@RestController
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;

	@Autowired
	UserService uservice;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		try{
			System.out.println("test" + authenticationRequest.getUsername());
			authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
	
			final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
	
			final String token = jwtTokenUtil.generateToken(userDetails);
			System.out.println("test" + new JwtResponse(token));
			return ResponseEntity.ok(new JwtResponse(token));
		}catch(Exception e){
			return new ResponseEntity<String>("Login failed", HttpStatus.UNAUTHORIZED);
		}
		
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody User user) throws Exception {
		if (uservice.findByUsername(user.getUsername()) != null) {
			return new ResponseEntity<String>("Failure", HttpStatus.FORBIDDEN);
		} else {

			userDetailsService.save(user);
			return ResponseEntity.ok(HttpStatus.CREATED);
		}

	}

	private void authenticate(String username, String password) throws Exception {
		System.out.println("username" + username);
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
