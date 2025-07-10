package com.EventManagement.Backend.Services;
import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Repository.UserRepository;
//import com.EventManagement.Backend.Entity.User;
//import com.EventManagement.Backend.repository.UserRepository;
import com.EventManagement.Backend.config.CustomAuthEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomAuthEntryPoint customAuthEntryPoint;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) throw new UsernameNotFoundException("User not found");
        if (!user.isActive()) {

            throw new DisabledException("User is inactive");


        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }
}