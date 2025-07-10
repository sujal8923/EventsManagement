package com.EventManagement.Backend.Controller;

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
// @CrossOrigin(origins = "http://localhost:5173 ", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AuthController {
    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserService userService;
    

  @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String,String> creds) {
    // Authenticate
    Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(creds.get("email"), creds.get("password"))
    );

    // Get user entity from DB
    User user = userService.findByEmail(creds.get("email"));

    // Get authenticated UserDetails object
    org.springframework.security.core.userdetails.UserDetails userDetails =
            (org.springframework.security.core.userdetails.UserDetails) auth.getPrincipal();

    // Generate JWT with authorities
    String token = jwtUtil.generateToken(userDetails, user.getRole());

    // Return token + role + userId
    return ResponseEntity.ok(Map.of(
            "token", token,
            "role", user.getRole(),
            "userId", user.getId()
    ));
}
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.setRole(user.getRole() == null || user.getRole().isBlank() ? "USER" : user.getRole());
        userService.register(user);
        return ResponseEntity.ok("Registered");
    }
}