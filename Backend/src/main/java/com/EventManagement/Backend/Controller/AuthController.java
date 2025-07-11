package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Dto.Login;
import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.UserService;
import com.EventManagement.Backend.config.JwtUtil;
// import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController

public class AuthController {
    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserService userService;
    

  @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Login creds) {
    try {
        User user = userService.findByEmail(creds.getEmail());
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        // ✅ 
        if (!user.isActive()) {
            return ResponseEntity.status(403).body(Map.of("message", "Account is deactivated. Please contact admin."));
        }

        
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPasswords())
        );

        org.springframework.security.core.userdetails.UserDetails userDetails =
                (org.springframework.security.core.userdetails.UserDetails) auth.getPrincipal();

        String token = jwtUtil.generateToken(userDetails, user.getRole());

        return ResponseEntity.ok(Map.of(
            "token", token,
            "role", user.getRole(),
            "userId", user.getId()
        ));

    } catch (Exception e) {
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setRole(user.getRole() == null || user.getRole().isBlank() ? "USER" : user.getRole());
        userService.register(user);
        return ResponseEntity.ok("Registered");
    }
}