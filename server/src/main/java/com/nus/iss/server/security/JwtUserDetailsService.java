package com.nus.iss.server.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nus.iss.server.Repository.UserRepository;
import com.nus.iss.server.models.User;



@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(email);
		System.out.println("uiser: ");

		if (user == null) {
			throw new UsernameNotFoundException("Could not find user");
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());

		// return new User("foo", "$2a$12$1poPkL.tVmpNsSRHrNsc2u5IducB/geb549Y6lxmdMrP1e8OK47r2", new ArrayList<>());
	}
	
	public Boolean save(User user) {
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		// System.out.println("uiser: " + newUser.getPassword());
		return userRepo.save(newUser);
	}
	

}
