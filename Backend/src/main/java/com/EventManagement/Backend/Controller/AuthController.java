package com.EventManagement.Backend.Controller;

import com.EventManagement.Backend.Entity.User;
import com.EventManagement.Backend.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
public class AuthController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public String register(@RequestBody User user){
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        userService.register(user);
        return "Registration sucessfull";
    }
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
    try {
        String email = body.get("email");
        String password = body.get("password");

        User user = userService.login(email, password);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok(user);
    } catch (Exception e) {
        e.printStackTrace(); // 👈 Check this in backend console
        return ResponseEntity.status(500).body("Server error: " + e.getMessage());
    }
}

    @GetMapping("/logout")
    public String logOut(HttpSession httpSession){
        httpSession.invalidate();
        return "logout sucess";
    }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User user = (User) session.getAttribute("currentUser");
        System.out.println(" my session"+user);
        if (user == null) return ResponseEntity.status(401).body("Not logged in");
        return ResponseEntity.ok(user);
    }
}
